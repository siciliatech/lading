;(function () {
  'use strict';

  const DEBOUNCE_MS = 12;

  function debounce(fn, ms) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  /* ── Nav scroll shadow ── */
  const nav = document.querySelector('.nav');
  function toggleNavShadow() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 32);
  }
  window.addEventListener('scroll', debounce(toggleNavShadow, DEBOUNCE_MS), { passive: true });
  toggleNavShadow();

  /* ── Hamburger menu ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  /* ── Close mobile menu on nav link click ── */
  if (mobileMenu && hamburger) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── IntersectionObserver: fade-in ── */
  const animateEls = document.querySelectorAll('.method-step, .caso-card');
  if (animateEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animateEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Caso toggle (Ver más / Ver menos) ── */
  document.querySelectorAll('.caso-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = this.closest('.caso-card');
      if (!card) return;
      var expanded = card.classList.toggle('expanded');
      this.textContent = expanded ? 'Ver menos' : 'Ver más';
    });
  });

  /* ── Close mobile menu on resize ── */
  window.addEventListener('resize', debounce(function () {
    if (window.innerWidth > 960 && mobileMenu) {
      mobileMenu.classList.remove('open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  }, 150));
})();
