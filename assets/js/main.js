// SiCiLIA — interacción básica
(function(){
  const menuBtn = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const themeBtn = document.getElementById('themeToggle');
  const year = document.getElementById('year');

  // Año actual en footer
  if(year) year.textContent = new Date().getFullYear();

  // Menú móvil
  if(menuBtn && menu){
    menuBtn.addEventListener('click', () => {
      const open = menu.style.display === 'flex';
      menu.style.display = open ? 'none' : 'flex';
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
    // Cerrar menú al navegar
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if(window.innerWidth <= 640){ menu.style.display = 'none'; menuBtn.setAttribute('aria-expanded','false'); }
    }))
  }

  // Tema oscuro/claro
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('sicilia-theme');
  function setTheme(mode){
    if(mode === 'light'){
      document.documentElement.style.setProperty('--text', '#0b0f14');
      document.documentElement.style.setProperty('--muted', '#4a5561');
      document.documentElement.style.setProperty('--card', '#ffffff');
      document.documentElement.style.setProperty('--border', '#e5e7eb');
    } else {
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--bg-alt');
      document.documentElement.style.removeProperty('--text');
      document.documentElement.style.removeProperty('--muted');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--border');
    }
    localStorage.setItem('sicilia-theme', mode);
  }
  let mode = saved || (prefersDark ? 'dark' : 'light');
  setTheme(mode);
  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      mode = mode === 'dark' ? 'light' : 'dark';
      setTheme(mode);
    })
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
