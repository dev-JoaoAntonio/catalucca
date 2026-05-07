<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const sectionRef = ref(null);
const canvasRef = ref(null);
const progress = ref(0);

let renderer, scene, camera, model, raf, scrollHandler, resizeObserver, intersectionObserver;
let isVisible = false;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};


onMounted(() => {
  const canvas = canvasRef.value;
  const sectionEl = sectionRef.value;
  if (!canvas || !sectionEl) return;

  const initialW = canvas.clientWidth || 600;
  const initialH = canvas.clientHeight || 600;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(32, initialW / initialH, 0.1, 100);
  camera.position.set(0, 0.4, 7);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(initialW, initialH, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.85;

  // Lighting — high-key uniforme com fills em todas as direções
  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const hemi = new THREE.HemisphereLight(0xffffff, 0xd4dde5, 1.6);
  hemi.position.set(0, 5, 0);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xffffff, 3.6);
  key.position.set(4, 5, 4);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xe8f4fb, 2.2);
  fill.position.set(-4, 1.5, 3);
  scene.add(fill);

  const front = new THREE.DirectionalLight(0xffffff, 2.0);
  front.position.set(0, 1, 6);
  scene.add(front);

  const bottom = new THREE.DirectionalLight(0xffffff, 1.0);
  bottom.position.set(0, -3, 2);
  scene.add(bottom);

  const rim = new THREE.PointLight(0x4FC3F7, 2.2, 12, 1.6);
  rim.position.set(-2.5, 1.5, -2);
  scene.add(rim);

  const loader = new GLTFLoader();
  loader.load(
    '/models/diple.glb',
    (gltf) => {
      if (!renderer) return;
      const inner = gltf.scene;

      // Detecta o eixo mais longo e roda para alinhá-lo com Y (em pé)
      const probe = new THREE.Box3().setFromObject(inner);
      const probeSize = probe.getSize(new THREE.Vector3());
      if (probeSize.z >= probeSize.y && probeSize.z >= probeSize.x) {
        inner.rotation.x = Math.PI / 2;
        inner.rotation.y = THREE.MathUtils.degToRad(-70);
      } else if (probeSize.x > probeSize.y) {
        inner.rotation.z = -Math.PI / 2;
        inner.rotation.y = THREE.MathUtils.degToRad(-70);
      }
      inner.updateMatrixWorld(true);

      // Centra após a rotação corretiva
      const box = new THREE.Box3().setFromObject(inner);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const targetHeight = 3.2;
      const maxDim = Math.max(size.x, size.y, size.z);
      const baseScale = targetHeight / maxDim;

      inner.position.sub(center);

      inner.traverse((child) => {
        if (child.isMesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((m) => {
            if (m.map) {
              m.map.colorSpace = THREE.SRGBColorSpace;
              m.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
            }

            // Tratamento base: corpo plástico preto com gloss
            if (typeof m.roughness === 'number') {
              m.roughness = Math.min(m.roughness, 0.55);
            }
            m.envMapIntensity = 1.6;
            if (m.emissive) {
              m.emissive.setHex(0x222222);
              m.emissiveIntensity = 0.2;
            }

            // Shader injection: pixels claros da textura (escrita DIPLE)
            // recebem roughness alto e metalness 0 → look de pintura matte,
            // mantendo o corpo escuro com gloss original.
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
        }
      });

      // Wrapper Group: render() manipula este, preservando a correção interna
      model = new THREE.Group();
      model.add(inner);
      model.userData.baseScale = baseScale;
      model.scale.setScalar(baseScale);

      scene.add(model);
      render();
    },
    undefined,
    (err) => {
      console.error('[Diple3D] erro carregando .glb', err);
    }
  );

  const updateSize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(canvas);

  const updateScroll = () => {
    const rect = sectionEl.getBoundingClientRect();
    const vh = window.innerHeight;
    // Trigger antecipado: começa a contar progresso quando a seção ainda está
    // ~70% de viewport abaixo do pin (0 → entra; 1 → termina).
    const earlyOffset = vh * 0.7;
    const scrolled = earlyOffset - rect.top;
    const total = rect.height - vh + earlyOffset;
    progress.value = clamp(scrolled / total, 0, 1);
  };
  scrollHandler = updateScroll;
  window.addEventListener('scroll', scrollHandler, { passive: true });
  updateScroll();

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        isVisible = e.isIntersecting;
        if (isVisible && !raf) render();
      });
    },
    { rootMargin: '200px 0px' }
  );
  intersectionObserver.observe(sectionEl);
  isVisible = true;

  function render() {
    if (!renderer || !isVisible) {
      raf = null;
      return;
    }
    raf = requestAnimationFrame(render);

    if (model) {
      const p = progress.value;
      const t = performance.now() * 0.001;

      // Phase 1 (p 0→0.35): rises from below + flat-to-upright (becomes 3D)
      // Phase 2 (p 0.35→0.7): centered, gentle Y-rotation showcase
      // Phase 3 (p 0.7→1): hold, prepares to leave
      const rise = smoothstep(0, 0.18, p);
      const showcase = smoothstep(0.16, 0.55, p);

      model.position.y = lerp(-3.2, 0.05, rise) + Math.sin(t * 0.8) * 0.06 * showcase;
      model.position.x = Math.cos(t * 0.6) * 0.05 * showcase;

      const scale = lerp(0.55, 1.0, rise);
      model.scale.setScalar((model.userData.baseScale || (model.userData.baseScale = model.scale.x)) * scale);
    }

    renderer.render(scene, camera);
  }
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  if (model) {
    model.traverse((child) => {
      if (child.isMesh) {
        child.geometry?.dispose();
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => {
          m?.map?.dispose();
          m?.dispose?.();
        });
      }
    });
  }
  renderer?.dispose();
  renderer = null;
});
</script>

<template>
  <section ref="sectionRef" class="diple3d-section" aria-label="Tecnologia DIPLE em 3D">
    <div class="diple3d-pin">
      <aside class="diple3d-info diple3d-info-left" v-reveal:left="{ delay: 200 }">
        <span class="diple3d-info-label">Hardware</span>
        <h3>DIPLE&trade; &mdash; Lente de Borda</h3>
        <p>
          Óptica de qualidade laboratorial em formato slim. <strong>1500&times; nativos</strong> sobre
          o sensor do smartphone, sem peças móveis nem energia externa.
        </p>
        <ul class="diple3d-info-list">
          <li><strong>Resolução:</strong> 0,7&nbsp;µm</li>
          <li><strong>Formato:</strong> 75 &times; 25 &times; 4&nbsp;mm</li>
          <li><strong>Origem:</strong> SMO &amp; IIT (Itália)</li>
        </ul>
      </aside>

      <div class="diple3d-canvas-wrap" v-reveal:fade="{ delay: 100 }">
        <canvas ref="canvasRef" class="diple3d-canvas"></canvas>
      </div>

      <aside class="diple3d-info diple3d-info-right" v-reveal:right="{ delay: 350 }">
        <span class="diple3d-info-label">Cadeia de Custódia</span>
        <h3>Captura travada por código</h3>
        <p>
          Foco, exposição e balanço de branco bloqueados via CameraX. Hash da derivada vinculado aos
          frames originais &mdash; <strong>evidência matematicamente verificável</strong>.
        </p>
        <ul class="diple3d-info-list">
          <li><strong>Validação:</strong> Variância &amp; contraste</li>
          <li><strong>Stacking:</strong> Não-destrutivo</li>
          <li><strong>Operação:</strong> 100% offline</li>
        </ul>
      </aside>
    </div>
  </section>
</template>
