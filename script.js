document.addEventListener('DOMContentLoaded', function () {

  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } else {
    console.warn('Lenis não foi carregado. Verifique se o script foi incluído no HTML.');
  }


  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('nav-mobile');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon') || document.createElement('div');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      mobileNav.classList.add('active');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-label', 'Fechar menu');

      if (lenis) lenis.stop();
    } else {
      mobileNav.classList.remove('active');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');

      if (lenis) lenis.start();
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });

  document.addEventListener('click', function (event) {
    const header = document.getElementById('header');
    if (isMenuOpen && header && !header.contains(event.target)) {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;

        if (lenis) {
          lenis.scrollTo(target, {
            offset: -headerHeight,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  const accordions = document.querySelectorAll('.accordion-header');

  accordions.forEach(acc => {
    acc.addEventListener('click', function () {
      this.classList.toggle('active');

      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }

      accordions.forEach(otherAcc => {
        if (otherAcc !== this && otherAcc.classList.contains('active')) {
          otherAcc.classList.remove('active');
          otherAcc.nextElementSibling.style.maxHeight = null;
        }
      });

    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll('.reveal');
  elementsToReveal.forEach((el) => observer.observe(el));

  const statsSection = document.querySelector('.stats-section');

  if (statsSection) {
    const observerOptions = {
      root: null,
      threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-number');

          counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimals'));
            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;

            let current = 0;
            const increment = target / (duration / stepTime);

            const timer = setInterval(() => {
              current += increment;

              if (current >= target) {
                counter.textContent = target.toFixed(decimals).replace('.', ',');
                clearInterval(timer);
              } else {
                counter.textContent = current.toFixed(decimals).replace('.', ',');
              }
            }, stepTime);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    statsObserver.observe(statsSection);
  }
});