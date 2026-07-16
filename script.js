document.addEventListener('DOMContentLoaded', () => {

  /* Header shadow on scroll */
  const header = document.getElementById('site-header');
  const backToTop = document.getElementById('back-to-top');
  const onScroll = () => {
    const scrolled = window.scrollY > 12;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 480);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Mobile nav toggle */
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* Animated donut counters */
  const donuts = document.querySelectorAll('.donut');
  const donutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const donut = entry.target;
      const target = parseInt(donut.style.getPropertyValue('--pct'), 10) || 0;
      const valueEl = donut.querySelector('.donut-value');
      donut.style.setProperty('--pct', 0);
      let current = 0;
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.round(eased * target);
        donut.style.setProperty('--pct', current);
        valueEl.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      donutObserver.unobserve(donut);
    });
  }, { threshold: 0.5 });
  donuts.forEach(d => donutObserver.observe(d));

  /* Footer year */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* Contact form (static demo submission) */
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      formNote.textContent = 'Por favor, completa los campos obligatorios.';
      return;
    }
    formNote.textContent = 'Gracias. Hemos recibido tu solicitud y te contactaremos en breve.';
    form.reset();
  });

});
