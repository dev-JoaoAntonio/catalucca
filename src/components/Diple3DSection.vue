<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const sectionRef = ref(null);
const canvasRef = ref(null);
const phoneCanvasRef = ref(null);
const progress = ref(0);
const webglAvailable = ref(true);

let dipleViewer = null;
let phoneViewer = null;
let raf, scrollHandler, intersectionObserver;
let isVisible = false;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

const leftStyle = computed(() => {
  const reveal = smoothstep(0.00, 0.16, progress.value);
  const exit = smoothstep(0.36, 0.52, progress.value);
  const visible = reveal * (1 - exit);
  const x = (1 - reveal) * -48 + exit * -120;
  return {
    opacity: visible,
    transform: `translate(${x}px, -50%)`,
    filter: `blur(${(1 - visible) * 10}px)`,
  };
});

const rightStyle = computed(() => {
  const reveal = smoothstep(0.04, 0.20, progress.value);
  const exit = smoothstep(0.36, 0.52, progress.value);
  const visible = reveal * (1 - exit);
  const x = (1 - reveal) * 48 + exit * 120;
  return {
    opacity: visible,
    transform: `translate(${x}px, -50%)`,
    filter: `blur(${(1 - visible) * 10}px)`,
  };
});

const canvasStyle = computed(() => {
  const reveal = smoothstep(0.04, 0.18, progress.value);
  const slide2 = smoothstep(0.38, 0.54, progress.value);
  const slide3 = smoothstep(0.68, 0.90, progress.value);
  const fade3 = smoothstep(0.73, 0.92, progress.value);
  const opacity = reveal * (1 - fade3);
  const shiftPct = -50 + slide2 * 50 + slide3 * 100;
  return {
    opacity,
    transform: `translate(${shiftPct}%, -50%)`,
    filter: `blur(${(1 - reveal) * 12}px)`,
  };
});

const manifestoStyle = computed(() => {
  const enter = smoothstep(0.46, 0.62, progress.value);
  const exit = smoothstep(0.62, 0.78, progress.value);
  const visible = enter * (1 - exit);
  const enterX = (1 - enter) * -80;
  const exitX = exit * -120;
  return {
    opacity: visible,
    transform: `translate(${enterX + exitX}px, -50%)`,
    filter: `blur(${(1 - visible) * 10}px)`,
  };
});

const phoneCanvasStyle = computed(() => {
  const enter = smoothstep(0.58, 0.80, progress.value);
  const shiftPct = -80 - (1 - enter) * 80;
  return {
    opacity: enter,
    transform: `translate(${shiftPct}%, -50%)`,
    filter: `blur(${(1 - enter) * 12}px)`,
  };
});

const tecCardStyle = computed(() => {
  const p = smoothstep(0.72, 0.96, progress.value);
  return {
    opacity: p,
    transform: `translate(${(1 - p) * 80}px, -50%)`,
    filter: `blur(${(1 - p) * 10}px)`,
  };
});


function setupViewer(canvas, modelUrl, baseRotationY, layDown = false, lightIntensity = 1.0, smoothFinish = false) {
  if (!canvas) return null;

  const initialW = canvas.clientWidth || 600;
  const initialH = canvas.clientHeight || 600;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, initialW / initialH, 0.1, 100);
  camera.position.set(0, 0.4, 7);
  camera.lookAt(0, 0, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (err) {
    console.warn(`[Diple3D] WebGL indisponível para ${modelUrl}`, err);
    return null;
  }
  renderer.setSize(initialW, initialH, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.85 * lightIntensity;

  if (smoothFinish) {
    scene.add(new THREE.AmbientLight(0xffffff, 3.0 * lightIntensity));
  } else {
    scene.add(new THREE.AmbientLight(0xffffff, 1.5 * lightIntensity));
    const hemi = new THREE.HemisphereLight(0xffffff, 0xd4dde5, 1.6 * lightIntensity);
    hemi.position.set(0, 5, 0);
    scene.add(hemi);
    const keyL = new THREE.DirectionalLight(0xffffff, 3.6 * lightIntensity);
    keyL.position.set(4, 5, 4);
    scene.add(keyL);
    const fillL = new THREE.DirectionalLight(0xe8f4fb, 2.2 * lightIntensity);
    fillL.position.set(-4, 1.5, 3);
    scene.add(fillL);
    const frontL = new THREE.DirectionalLight(0xffffff, 2.0 * lightIntensity);
    frontL.position.set(0, 1, 6);
    scene.add(frontL);
    const bottomL = new THREE.DirectionalLight(0xffffff, 1.0 * lightIntensity);
    bottomL.position.set(0, -3, 2);
    scene.add(bottomL);
    const rim = new THREE.PointLight(0x4FC3F7, 2.2 * lightIntensity, 12, 1.6);
    rim.position.set(-2.5, 1.5, -2);
    scene.add(rim);
  }

  const viewer = { canvas, scene, camera, renderer, model: null, resizeObserver: null };

  const updateSize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0 || !viewer.renderer) return;
    viewer.camera.aspect = w / h;
    viewer.camera.updateProjectionMatrix();
    viewer.renderer.setSize(w, h, false);
  };
  viewer.resizeObserver = new ResizeObserver(updateSize);
  viewer.resizeObserver.observe(canvas);

  const loader = new GLTFLoader();
  loader.load(
    modelUrl,
    (gltf) => {
      if (!viewer.renderer) return;
      const inner = gltf.scene;

      if (layDown) {
        inner.rotation.x = (-3 * Math.PI) / 4;
        inner.rotation.z = Math.PI - 25;
      } else {
        const probe = new THREE.Box3().setFromObject(inner);
        const probeSize = probe.getSize(new THREE.Vector3());
        if (probeSize.z >= probeSize.y && probeSize.z >= probeSize.x) {
          inner.rotation.x = Math.PI / 2;
        } else if (probeSize.x > probeSize.y) {
          inner.rotation.z = -Math.PI / 2;
        }
      }
      inner.rotation.y = baseRotationY;
      inner.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(inner);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const targetHeight = 3.2;
      const maxDim = Math.max(size.x, size.y, size.z);
      const baseScale = targetHeight / maxDim;

      inner.position.sub(center);

      inner.traverse((child) => {
        if (!child.isMesh || !child.material) return;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => {
          if (m.map) {
            m.map.colorSpace = THREE.SRGBColorSpace;
            m.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
          }
          if (smoothFinish) {
            m.roughnessMap = null;
            m.normalMap = null;
            m.aoMap = null;
            m.bumpMap = null;
            m.roughness = 0.25;
          } else if (typeof m.roughness === 'number') {
            m.roughness = Math.min(m.roughness, 0.55);
          }
          m.envMapIntensity = 1.6;
          if (m.emissive) {
            m.emissive.setHex(0x222222);
            m.emissiveIntensity = 0.2;
          }
          m.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <roughnessmap_fragment>',
              `#include <roughnessmap_fragment>
               float _paintLum = dot( diffuseColor.rgb, vec3( 0.299, 0.587, 0.114 ) );
               float _paintMix = smoothstep( 0.55, 0.9, _paintLum );
               roughnessFactor = mix( roughnessFactor, 0.95, _paintMix );`
            );
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <metalnessmap_fragment>',
              `#include <metalnessmap_fragment>
               metalnessFactor = mix( metalnessFactor, 0.0, _paintMix );`
            );
          };
          m.needsUpdate = true;
        });
      });

      const modelGroup = new THREE.Group();
      modelGroup.add(inner);
      modelGroup.userData.baseScale = baseScale;
      modelGroup.scale.setScalar(baseScale);
      scene.add(modelGroup);
      viewer.model = modelGroup;
    },
    undefined,
    (err) => {
      console.error(`[Diple3D] erro carregando ${modelUrl}`, err);
    }
  );

  return viewer;
}

function disposeViewer(viewer) {
  if (!viewer) return;
  viewer.resizeObserver?.disconnect();
  if (viewer.model) {
    viewer.model.traverse((child) => {
      if (!child.isMesh) return;
      child.geometry?.dispose();
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m) => {
        m?.map?.dispose();
        m?.dispose?.();
      });
    });
  }
  viewer.renderer?.dispose();
  viewer.renderer = null;
  viewer.model = null;
}


onMounted(() => {
  const sectionEl = sectionRef.value;
  if (!sectionEl) return;

  const updateScroll = () => {
    const rect = sectionEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const earlyOffset = vh * 0.7;
    const scrolled = earlyOffset - rect.top;
    const total = rect.height - vh + earlyOffset;
    progress.value = clamp(scrolled / total, 0, 1);
  };
  scrollHandler = updateScroll;
  window.addEventListener('scroll', scrollHandler, { passive: true });
  updateScroll();

  const dipleCanvas = canvasRef.value;
  const phoneCanvas = phoneCanvasRef.value;
  if (!dipleCanvas) return;

  dipleViewer = setupViewer(dipleCanvas, '/models/diple.glb', THREE.MathUtils.degToRad(-120), false, 0.55, true);
  if (!dipleViewer) {
    webglAvailable.value = false;
    return;
  }

  phoneViewer = setupViewer(phoneCanvas, '/models/diple_phone.glb', -Math.PI / 4, true);
  if (phoneViewer) {
    phoneViewer.camera.position.set(0, 0.4, 9);
    phoneViewer.camera.lookAt(0, 0, 0);
  }

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        isVisible = e.isIntersecting;
        if (isVisible && !raf) renderAll();
      });
    },
    { rootMargin: '200px 0px' }
  );
  intersectionObserver.observe(sectionEl);
  isVisible = true;
  renderAll();

  function renderAll() {
    if (!isVisible) {
      raf = null;
      return;
    }
    raf = requestAnimationFrame(renderAll);

    const p = progress.value;

    if (dipleViewer?.model) {
      const m = dipleViewer.model;
      const rise = smoothstep(0.04, 0.20, p);
      m.position.y = lerp(-3.4, 0.05, rise);
      m.position.x = 0;
      const swingPhase = p * Math.PI * 3;
      const swing01 = (1 - Math.cos(swingPhase)) / 2;
      m.rotation.y = swing01 * 1.0;
      const scale = lerp(0.5, 1.0, rise);
      const baseScale = m.userData.baseScale;
      m.scale.setScalar(baseScale * scale);
    }

    if (phoneViewer?.model) {
      const m = phoneViewer.model;
      m.position.set(0, 0.05, 0);
      const localP = clamp((p - 0.56) / 0.42, 0, 1);
      m.rotation.y = lerp(-0.4, 0.4, localP);
      m.scale.setScalar(m.userData.baseScale * 1.4);
    }

    if (dipleViewer?.renderer) dipleViewer.renderer.render(dipleViewer.scene, dipleViewer.camera);
    if (phoneViewer?.renderer) phoneViewer.renderer.render(phoneViewer.scene, phoneViewer.camera);
  }
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
  intersectionObserver?.disconnect();
  disposeViewer(dipleViewer);
  disposeViewer(phoneViewer);
  dipleViewer = null;
  phoneViewer = null;
});
</script>

<template>
  <section ref="sectionRef" class="diple3d-section" aria-label="Tecnologia DIPLE em 3D">
    <div class="diple3d-pin">
      <aside class="diple3d-info diple3d-info-left" :style="leftStyle">
        <span class="diple3d-info-eyebrow">Hardware</span>
        <h3 class="diple3d-info-title">DIPLE&trade;</h3>
        <p class="diple3d-info-subtitle">Lente de borda</p>

        <p class="diple3d-info-body">
          Óptica laboratorial em formato slim. <strong>1500&times; nativos</strong> sobre o sensor
          do smartphone &mdash; sem peças móveis, sem energia externa.
        </p>

        <dl class="diple3d-info-specs">
          <div class="diple3d-info-spec">
            <dt>Resolução</dt>
            <dd>0,7<small>&nbsp;µm</small></dd>
          </div>
          <div class="diple3d-info-spec">
            <dt>Formato</dt>
            <dd>75&times;25&times;4<small>&nbsp;mm</small></dd>
          </div>
          <div class="diple3d-info-spec">
            <dt>Origem</dt>
            <dd>SMO &amp; IIT</dd>
          </div>
        </dl>
      </aside>

      <div class="diple3d-canvas-wrap diple3d-canvas-wrap-diple" :style="canvasStyle">
        <canvas v-if="webglAvailable" ref="canvasRef" class="diple3d-canvas"></canvas>
        <div v-else class="diple3d-fallback" aria-label="Ilustração estilizada da lente DIPLE">
          <svg class="diple3d-fallback-svg" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" role="img">
            <defs>
              <linearGradient id="diple-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3a3a3a" />
                <stop offset="55%" stop-color="#1a1a1a" />
                <stop offset="100%" stop-color="#050505" />
              </linearGradient>
              <linearGradient id="diple-edge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(255,255,255,0.35)" />
                <stop offset="100%" stop-color="rgba(255,255,255,0)" />
              </linearGradient>
              <radialGradient id="diple-lens" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stop-color="#9bdcff" />
                <stop offset="45%" stop-color="#4FC3F7" />
                <stop offset="80%" stop-color="#0277BD" />
                <stop offset="100%" stop-color="#01579B" />
              </radialGradient>
              <radialGradient id="diple-halo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stop-color="rgba(79, 195, 247, 0.45)" />
                <stop offset="100%" stop-color="rgba(79, 195, 247, 0)" />
              </radialGradient>
            </defs>

            <ellipse cx="160" cy="135" rx="120" ry="10" fill="rgba(15, 62, 109, 0.18)" />
            <circle cx="70" cy="80" r="55" fill="url(#diple-halo)" />

            <rect x="20" y="62" width="280" height="36" rx="6" fill="url(#diple-body)" />
            <rect x="20" y="62" width="280" height="3" rx="1.5" fill="url(#diple-edge)" />

            <text
              x="180"
              y="85"
              text-anchor="middle"
              fill="#eef4f8"
              font-family="Inter, system-ui, sans-serif"
              font-weight="700"
              font-size="11"
              letter-spacing="6"
            >DIPLE</text>

            <circle cx="70" cy="80" r="13" fill="#0a0a0a" />
            <circle cx="70" cy="80" r="11" fill="url(#diple-lens)" />
            <circle cx="66" cy="76" r="3" fill="rgba(255,255,255,0.55)" />
          </svg>
          <span class="diple3d-fallback-caption">75 &times; 25 &times; 4&nbsp;mm &middot; Lente óptica</span>
        </div>
      </div>

      <aside class="diple3d-info diple3d-info-right" :style="rightStyle">
        <span class="diple3d-info-eyebrow">Cadeia de Custódia</span>
        <h3 class="diple3d-info-title">Captura travada</h3>
        <p class="diple3d-info-subtitle">por código</p>

        <p class="diple3d-info-body">
          Foco, exposição e balanço bloqueados via CameraX. Hash da derivada vinculado aos frames
          originais &mdash; <strong>evidência matematicamente verificável</strong>.
        </p>

        <dl class="diple3d-info-specs">
          <div class="diple3d-info-spec">
            <dt>Validação</dt>
            <dd>Variância</dd>
          </div>
          <div class="diple3d-info-spec">
            <dt>Stacking</dt>
            <dd>Não-destrutivo</dd>
          </div>
          <div class="diple3d-info-spec">
            <dt>Operação</dt>
            <dd>100% offline</dd>
          </div>
        </dl>
      </aside>

      <aside class="diple3d-manifesto" :style="manifestoStyle">
        <span class="section-label">Nossa Essência</span>
        <h2>A Borda é o nosso Território.</h2>
        <p>
          A CATALUCCA Tecnologias&trade; é uma integradora nacional de infraestrutura científica
          aplicada. Nascemos de um princípio fundamental:
          <strong>a ciência perde valor quando está distante do problema</strong>.
        </p>
        <p>
          Não atuamos como fornecedores de equipamentos isolados. Atuamos como estruturadores de
          sistemas científicos operacionais, eliminando o hiato histórico entre campo e gabinete.
          Utilidade gera legitimidade.
        </p>
        <div class="about-highlight">
          <p>
            &ldquo;Não substituímos o laboratório central. Levamos a capacidade de triagem técnica
            para onde a decisão precisa ser tomada.&rdquo;
          </p>
        </div>
      </aside>

      <div class="diple3d-canvas-wrap diple3d-canvas-wrap-phone" :style="phoneCanvasStyle">
        <canvas v-if="webglAvailable" ref="phoneCanvasRef" class="diple3d-canvas"></canvas>
      </div>

      <aside class="diple3d-tec" :style="tecCardStyle">
        <span class="diple3d-tec-eyebrow">Tecnologia Italiana</span>

        <h3 class="diple3d-tec-title">
          SMO<span class="diple3d-tec-title-mark">+</span>IIT
        </h3>

        <p class="diple3d-tec-subtitle">
          Smart Micro Optics &middot; Istituto Italiano di Tecnologia
        </p>

        <p class="diple3d-tec-body">
          DIPLE&trade; e BLIPS&trade; desenvolvidas em parceria com institutos italianos.
          Marca Notoriamente Conhecida &mdash; Lei 9.279/96.
        </p>

        <dl class="diple3d-tec-specs">
          <div class="diple3d-tec-spec">
            <dt>Resolução</dt>
            <dd>0,7<small>&nbsp;µm</small></dd>
          </div>
          <div class="diple3d-tec-spec">
            <dt>Distribuição</dt>
            <dd>América do Sul</dd>
          </div>
          <div class="diple3d-tec-spec">
            <dt>Conformidade</dt>
            <dd>Lei 9.610/98</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
</template>
