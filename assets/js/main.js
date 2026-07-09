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

  /* ── Page switching (home / empresa) ── */
  const pageHome = document.getElementById('page-home');
  const pageEmpresa = document.getElementById('page-empresa');
  const empresaBtns = document.querySelectorAll('[data-page="empresa"]');
  const homeBtns = document.querySelectorAll('[data-page="home"]');

  function showEmpresa() {
    if (pageHome) pageHome.classList.add('hidden');
    if (pageEmpresa) pageEmpresa.classList.add('active');
    document.querySelectorAll('.nav-links [data-page="empresa"], .nav-mobile [data-page="empresa"]').forEach(function (btn) {
      btn.classList.add('active-page');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Empresa | Sicilia Labs';
  }

  function showHome() {
    if (pageHome) pageHome.classList.remove('hidden');
    if (pageEmpresa) pageEmpresa.classList.remove('active');
    document.querySelectorAll('.nav-links [data-page="empresa"], .nav-mobile [data-page="empresa"]').forEach(function (btn) {
      btn.classList.remove('active-page');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Sicilia Labs';
  }

  empresaBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      showEmpresa();
    });
  });

  homeBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      showHome();
    });
  });

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

  /* ── Smooth nav link scroll (fallback) ── */
  document.querySelectorAll('[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sectionId = this.getAttribute('data-section');
      if (sectionId) {
        var target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
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
