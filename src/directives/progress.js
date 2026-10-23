// Publica em --p (0 → 1) o progresso de rolagem do elemento, para que o CSS
// derive transformações a partir dele. Um único listener de scroll atende a
// todos os elementos registrados.
//
// Uso: v-progress="'pin'" ou v-progress="{ mode: 'pin', onProgress }"

const MODES = {
  // Do topo entrando pela base da viewport até a base saindo pelo topo.
  view: (r, vh) => (vh - r.top) / (vh + r.height),
  // Seções com palco sticky: do topo encostar no topo até a base encostar na base.
  pin: (r, vh) => -r.top / Math.max(1, r.height - vh),
  // Elemento saindo pelo topo (ex.: hero).
  leave: (r) => -r.top / Math.max(1, r.height),
  // Do topo entrando pela base até a base chegar à base (ex.: rodapé).
  enter: (r, vh) => (vh - r.top) / Math.max(1, r.height),
  // Leitura: do topo a 85% da viewport até a base passar da metade.
  read: (r, vh) => (vh * 0.85 - r.top) / (vh * 0.35 + r.height),
};

const entries = new Map();
let frame = 0;

const clamp01 = (v) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0);

function measure() {
  frame = 0;
  const vh = window.innerHeight;

  // Lê todas as posições antes de escrever, para não forçar layout a cada item.
  const changed = [];
  entries.forEach((entry, el) => {
    const p = clamp01(MODES[entry.mode](el.getBoundingClientRect(), vh));
    if (Math.abs(p - entry.p) > 0.0005) changed.push([el, entry, p]);
  });

  changed.forEach(([el, entry, p]) => {
    entry.p = p;
    el.style.setProperty('--p', p.toFixed(4));
    entry.onProgress?.(p);
  });
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure);
}

export function refreshProgress() {
  if (typeof window !== 'undefined') schedule();
}

function parse(value) {
  if (typeof value === 'string') return { mode: value };
  return { mode: 'view', ...value };
}

export const progress = {
  mounted(el, binding) {
    const { mode, onProgress } = parse(binding.value);
    if (!entries.size) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }
    entries.set(el, { mode, onProgress, p: -1 });
    schedule();
  },
  unmounted(el) {
    entries.delete(el);
    if (!entries.size) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    }
  },
};
