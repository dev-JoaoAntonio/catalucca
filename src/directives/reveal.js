// Revela o elemento quando ele entra na viewport.
//
// O estado inicial (oculto) já sai no HTML estático via getSSRProps e só vale
// com a classe .js no <html> — assim não há "flash" de conteúdo antes da
// hidratação, e sem JavaScript tudo continua visível.
//
// O estado revelado fica em data-revealed, não em uma classe: o Vue reescreve
// o atributo class de elementos com :class dinâmico e apagaria a marcação.
//
// Uso: v-reveal, v-reveal:left, v-reveal:scale="{ delay: 120 }"
// Variantes: up (padrão), left, right, scale, fade, wipe.

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(onIntersect, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      })
    : null;

function onIntersect(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.dataset.revealed = '';
    observer.unobserve(entry.target);
  });
}

function variant(binding) {
  return binding.arg || 'up';
}

function delayStyle(binding) {
  const delay = binding.value?.delay;
  return delay ? { '--reveal-delay': `${delay}ms` } : undefined;
}

export const reveal = {
  getSSRProps(binding) {
    return { 'data-reveal': variant(binding), style: delayStyle(binding) };
  },
  mounted(el, binding) {
    el.dataset.reveal = variant(binding);
    const style = delayStyle(binding);
    if (style) el.style.setProperty('--reveal-delay', style['--reveal-delay']);

    if (observer) {
      observer.observe(el);
    } else {
      el.dataset.revealed = '';
    }
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
