// Visualizador three.js de um modelo GLB. three e o GLTFLoader são importados
// sob demanda, só quando a seção se aproxima, para não pesar no carregamento
// inicial da página.
export async function createModelViewer(canvas, { baseRotationY = 0, exposure = 1 } = {}) {
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (err) {
    console.warn('[ModelViewer] WebGL indisponível', err);
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.85 * exposure;

  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 3.0 * exposure));

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.4, 7);
  camera.lookAt(0, 0, 0);

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  const viewer = {
    model: null,

    load(url, onProgress) {
      return new Promise((resolve, reject) => {
        new GLTFLoader().load(
          url,
          (gltf) => {
            viewer.model = prepareModel(THREE, gltf.scene, renderer, baseRotationY);
            scene.add(viewer.model);
            resolve(viewer.model);
          },
          (event) => {
            if (event.total) onProgress?.(event.loaded / event.total);
          },
          reject
        );
      });
    },

    render() {
      renderer.render(scene, camera);
    },

    dispose() {
      resizeObserver.disconnect();
      viewer.model?.traverse((child) => {
        if (!child.isMesh) return;
        child.geometry?.dispose();
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => {
          m?.map?.dispose();
          m?.dispose?.();
        });
      });
      renderer.dispose();
      viewer.model = null;
    },
  };

  return viewer;
}

function prepareModel(THREE, inner, renderer, baseRotationY) {
  // Deixa o maior eixo do modelo na vertical.
  const probe = new THREE.Box3().setFromObject(inner).getSize(new THREE.Vector3());
  if (probe.z >= probe.y && probe.z >= probe.x) {
    inner.rotation.x = Math.PI / 2;
  } else if (probe.x > probe.y) {
    inner.rotation.z = -Math.PI / 2;
  }
  inner.rotation.y = baseRotationY;
  inner.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(inner);
  const size = box.getSize(new THREE.Vector3());
  inner.position.sub(box.getCenter(new THREE.Vector3()));

  // Acabamento liso: sem mapas de rugosidade/normal e com a tinta clara fosca.
  inner.traverse((child) => {
    if (!child.isMesh || !child.material) return;
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    mats.forEach((m) => {
      if (m.map) {
        m.map.colorSpace = THREE.SRGBColorSpace;
        m.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }
      m.roughnessMap = null;
      m.normalMap = null;
      m.aoMap = null;
      m.bumpMap = null;
      m.roughness = 0.25;
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

  const group = new THREE.Group();
  group.add(inner);
  group.scale.setScalar(3.2 / Math.max(size.x, size.y, size.z));
  return group;
}
