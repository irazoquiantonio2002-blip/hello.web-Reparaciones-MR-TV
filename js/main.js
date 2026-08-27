(() => {
  'use strict';

  const WHATSAPP_NUMBER = '526391595732';

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  const loaderFill = loader?.querySelector('.loader-bar-fill');
  let progress = 0;
  const progressTimer = setInterval(() => {
    progress = Math.min(progress + Math.random() * 22, 92);
    if (loaderFill) loaderFill.style.width = progress + '%';
  }, 160);

  window.addEventListener('load', () => {
    clearInterval(progressTimer);
    if (loaderFill) loaderFill.style.width = '100%';
    setTimeout(() => loader?.classList.add('loaded'), 300);
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobMenu = document.getElementById('mob-menu');
  hamburger?.addEventListener('click', () => {
    const open = mobMenu?.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobMenu.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealItems.forEach(el => io.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Stat counters ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString('es-MX') + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && statNums.length) {
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statNums.forEach(el => statIo.observe(el));
  }

  /* ---------- Marquee content ---------- */
  const marqueeItems = [
    'Reparación de Televisores', 'Bocinas Amplificadas', 'Microondas',
    'LED · LCD · Smart TV', 'Diagnóstico Preciso', 'Garantía por Escrito'
  ];
  const marquee = document.getElementById('marquee');
  if (marquee) {
    const buildSet = () => marqueeItems.map(t =>
      `<span class="marquee-item"><i class="fa-solid fa-circle"></i>${t}</span>`
    ).join('');
    marquee.innerHTML = buildSet() + buildSet();
  }

  /* ---------- Hero canvas particles ---------- */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;
    const colors = ['rgba(47,111,237,0.55)', 'rgba(230,57,74,0.5)', 'rgba(250,204,21,0.4)'];

    const resize = () => {
      const hero = canvas.closest('#hero');
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    };

    const createParticles = () => {
      const count = Math.max(18, Math.round(width / 90));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.2 + Math.random() * 2.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    };

    resize();
    createParticles();
    requestAnimationFrame(tick);
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  const form = document.getElementById('wa-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('f-name')?.value.trim();
    const interest = document.getElementById('f-interest')?.value;
    const msg = document.getElementById('f-msg')?.value.trim();

    if (!name || !msg) {
      form.reportValidity?.();
      return;
    }

    const lines = [
      `Hola, soy ${name}.`,
      `Me interesa: ${interest}.`,
      `Detalle: ${msg}`
    ];
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
