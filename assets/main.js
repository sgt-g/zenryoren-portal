/* ============================================================
   第8部会ポータル - interactions
   - sticky nav state
   - mobile menu
   - intersection-observer reveals
   - hero parallax
   - news category filter
   - smooth nav-anchor scroll with nav offset
   ============================================================ */

(function () {
  'use strict';

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Nav: scrolled state + mobile menu ---------- */
  const nav      = $('#nav');
  const menuBtn  = $('#nav-menu');

  const onScrollNav = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else                    nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close on link click
    $$('.nav__links a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- Smooth anchor scroll with nav offset ---------- */
  const NAV_H = 72;
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - NAV_H + 1;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ---------- IntersectionObserver: reveal on scroll ---------- */
  const reveals = $$('[data-reveal]');
  const heroTitle = $('.hero__title');
  const hero = $('.hero');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-8% 0px -8% 0px', threshold: 0.05 });

    reveals.forEach(el => io.observe(el));

    // hero plays on load
    requestAnimationFrame(() => {
      if (hero) hero.classList.add('is-in');
      if (heroTitle) heroTitle.classList.add('is-in');
    });
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
    if (hero) hero.classList.add('is-in');
    if (heroTitle) heroTitle.classList.add('is-in');
  }

  /* ---------- Hero parallax marks ---------- */
  const marks = $$('.hero__marks .mark');
  let ticking = false;
  const onScrollParallax = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.4) {
        marks.forEach((m, i) => {
          const speed = [0.35, 0.18, 0.6, 0.12][i] || 0.2;
          m.style.transform = `translate3d(0, ${y * speed * -1}px, 0)`;
        });
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScrollParallax, { passive: true });

  /* ---------- News category filter ---------- */
  const tabs   = $$('.news__tab');
  const items  = $$('.news__item');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      const f = t.dataset.filter;
      tabs.forEach(o => o.classList.toggle('is-active', o === t));
      items.forEach(i => {
        const match = (f === 'all') || (i.dataset.cat === f);
        i.classList.toggle('is-hidden', !match);
      });
    });
  });

})();
