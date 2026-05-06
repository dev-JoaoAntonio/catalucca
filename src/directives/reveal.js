const supported = typeof IntersectionObserver !== 'undefined';

const observer = supported
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
  : null;

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal');
    if (binding.arg) {
      el.classList.add(`reveal--${binding.arg}`);
    }
    if (binding.value?.delay) {
      el.style.setProperty('--reveal-delay', `${binding.value.delay}ms`);
    }
    if (observer) {
      observer.observe(el);
    } else {
      el.classList.add('is-revealed');
    }
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
