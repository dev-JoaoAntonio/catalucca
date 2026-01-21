document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('nav-mobile');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');
  
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      mobileNav.classList.add('active'); 
      
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-label', 'Fechar menu');
    } else {
      mobileNav.classList.remove('active');
      
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
    }
  }
  
  mobileMenuBtn.addEventListener('click', toggleMenu);
  
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });
  
  document.addEventListener('click', function(event) {
    const header = document.getElementById('header');
    if (isMenuOpen && !header.contains(event.target)) {
      toggleMenu();
    }
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const accordions = document.querySelectorAll('.accordion-header');
  
  accordions.forEach(acc => {
    acc.addEventListener('click', function() {
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

