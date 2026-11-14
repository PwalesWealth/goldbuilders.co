/* GoldBuilders Co. additive UX enhancement layer: accessible carousels, touch navigation and responsive table wrappers. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function addSkipLink() {
    if (document.querySelector('.skip-to-content')) return;
    const target = document.querySelector('main, #main, [role="main"]');
    if (!target) return;
    if (!target.id) target.id = 'main-content';
    const link = document.createElement('a');
    link.className = 'skip-to-content';
    link.href = `#${target.id}`;
    link.textContent = 'Skip to main content';
    document.body.prepend(link);
  }

  function enhanceNavigation() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav-links]');
    if (toggle && nav) {
      const closeMenu = () => {
        nav.classList.remove('show');
        nav.querySelectorAll('[data-dropdown].open').forEach(menu => {
          menu.classList.remove('open');
          const submenuButton = menu.querySelector('.nav-submenu-toggle');
          if (submenuButton) submenuButton.setAttribute('aria-expanded', 'false');
        });
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      };
      // main.js owns the toggle behavior; this layer only syncs the accessible label/state.
      toggle.addEventListener('click', () => window.requestAnimationFrame(() => {
        const open = nav.classList.contains('show');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      }));
      nav.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (link) closeMenu();
      });
      document.addEventListener('click', event => {
        if (nav.classList.contains('show') && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
      });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
      window.addEventListener('resize', () => { if (window.innerWidth > 1180) closeMenu(); }, { passive: true });
    }

    // The standalone Nexora offer page has a separate Tailwind navigation; add its mobile menu as an additive control.
    const isNexoraOffer = /(?:^|\/)nexora\.html$/i.test(window.location.pathname);
    const header = isNexoraOffer ? document.querySelector('body > header') : null;
    const navInner = header && header.querySelector(':scope > div');
    const desktopNav = navInner && navInner.querySelector('nav');
    if (header && navInner && desktopNav && !header.querySelector('.gb-nexora-menu-toggle')) {
      header.classList.add('gb-nexora-header');
      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.className = 'gb-nexora-menu-toggle';
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.setAttribute('aria-controls', 'gb-nexora-mobile-menu');
      toggleButton.setAttribute('aria-label', 'Open Nexora navigation');
      toggleButton.innerHTML = '<span aria-hidden="true">☰</span>';
      const bookButton = navInner.querySelector('button[onclick="openBookingModal()"]');
      if (bookButton) navInner.insertBefore(toggleButton, bookButton); else navInner.appendChild(toggleButton);

      const mobileMenu = document.createElement('nav');
      mobileMenu.id = 'gb-nexora-mobile-menu';
      mobileMenu.className = 'gb-nexora-mobile-menu';
      mobileMenu.setAttribute('aria-label', 'Nexora mobile navigation');
      mobileMenu.innerHTML = [
        '<a href="index.html">GoldBuilders Home</a>',
        '<a href="#deliverables">12 Deliverables</a>',
        '<a href="#packages">Packages &amp; Pricing</a>',
        '<a href="#faqs">Frequently Asked Questions</a>',
        '<a href="nexora-solutions.html">Consulting Solutions &amp; Pricing</a>',
        '<a href="contact.html">Contact GoldBuilders</a>',
        '<a class="gb-mobile-wa" target="_blank" rel="noopener noreferrer" href="https://wa.me/2348022848749?text=Hello%20GoldBuilders%20Co.%2C%20I%20would%20like%20to%20discuss%20Nexora%20Business-In-A-Box.">WhatsApp Consultation · +234 802 284 8749</a>'
      ].join('');
      header.appendChild(mobileMenu);
      const close = () => {
        mobileMenu.classList.remove('open');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', 'Open Nexora navigation');
        toggleButton.querySelector('span').textContent = '☰';
      };
      toggleButton.addEventListener('click', () => {
        const opening = !mobileMenu.classList.contains('open');
        mobileMenu.classList.toggle('open', opening);
        toggleButton.setAttribute('aria-expanded', opening ? 'true' : 'false');
        toggleButton.setAttribute('aria-label', opening ? 'Close Nexora navigation' : 'Open Nexora navigation');
        toggleButton.querySelector('span').textContent = opening ? '×' : '☰';
      });
      mobileMenu.addEventListener('click', event => { if (event.target.closest('a')) close(); });
      document.addEventListener('click', event => { if (mobileMenu.classList.contains('open') && !mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) close(); });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    }
  }

  function enhanceGlobalWhatsApp() {
    const isAdmin = /\/admin\//i.test(window.location.pathname);
    if (isAdmin || document.querySelector('[data-global-whatsapp]')) return;
    const title = (document.title || 'GoldBuilders Co.').replace(/\s*\|\s*GoldBuilders Co\.?/i, '').trim();
    const message = `Hello GoldBuilders Co., I am viewing ${title} and would like to discuss a consultation or booking. Please guide me on the next step.`;
    const link = document.createElement('a');
    link.className = 'global-wa-cta';
    link.dataset.globalWhatsapp = 'true';
    link.href = `https://wa.me/2348022848749?text=${encodeURIComponent(message)}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Start a WhatsApp consultation with GoldBuilders Co. about ${title}`);
    link.innerHTML = '<span class="wa-dot" aria-hidden="true"></span><span>WhatsApp Consultation</span>';
    document.body.appendChild(link);
  }

  function enhanceTables() {
    document.querySelectorAll('table').forEach(table => {
      if (table.closest('.gb-table-scroll')) return;
      const parent = table.parentElement;
      if (!parent) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'gb-table-scroll';
      wrapper.tabIndex = 0;
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', 'Scrollable table content');
      parent.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function initCarousels() {
    document.querySelectorAll('[data-gb-carousel]').forEach((carousel, carouselIndex) => {
      if (carousel.dataset.gbInitialized === 'true') return;
      const slides = Array.from(carousel.querySelectorAll('.gb-carousel-slide'));
      const previous = carousel.querySelector('[data-carousel-prev]');
      const next = carousel.querySelector('[data-carousel-next]');
      const rotationButton = carousel.querySelector('[data-carousel-toggle]');
      const dots = Array.from(carousel.querySelectorAll('[data-carousel-to]'));
      const count = carousel.querySelector('[data-carousel-count]');
      if (!slides.length) return;
      carousel.dataset.gbInitialized = 'true';
      carousel.setAttribute('tabindex', '0');
      let active = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
      let timer = null;
      let hovered = false;
      let focused = false;
      let userPaused = false;
      let startX = null;
      let startY = null;

      const show = (requested, announce = true) => {
        active = (requested + slides.length) % slides.length;
        slides.forEach((slide, index) => {
          const isActive = index === active;
          slide.classList.toggle('is-active', isActive);
          slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
          slide.querySelectorAll('a,button').forEach(control => {
            if (isActive) control.removeAttribute('tabindex');
            else control.setAttribute('tabindex', '-1');
          });
        });
        dots.forEach((dot, index) => {
          dot.setAttribute('aria-current', index === active ? 'true' : 'false');
          dot.setAttribute('aria-label', `Show slide ${index + 1} of ${slides.length}`);
        });
        if (count) count.textContent = `${active + 1} / ${slides.length}`;
        if (announce) carousel.dataset.currentSlide = String(active + 1);
      };
      const stop = () => { if (timer) window.clearInterval(timer); timer = null; };
      const start = () => {
        stop();
        if (reducedMotion || userPaused || hovered || focused || document.hidden || slides.length < 2) return;
        timer = window.setInterval(() => show(active + 1, false), 6500);
      };
      if (rotationButton) {
        if (reducedMotion) {
          userPaused = true;
          rotationButton.textContent = '▶';
          rotationButton.setAttribute('aria-label', 'Automatic slide rotation disabled by reduced-motion setting');
          rotationButton.title = 'Automatic slide rotation disabled by reduced-motion setting';
          rotationButton.setAttribute('aria-pressed', 'true');
          rotationButton.disabled = true;
        }
        rotationButton.addEventListener('click', () => {
          userPaused = !userPaused;
          rotationButton.textContent = userPaused ? '▶' : 'Ⅱ';
          rotationButton.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
          rotationButton.setAttribute('aria-label', userPaused ? 'Resume automatic slide rotation' : 'Pause automatic slide rotation');
          rotationButton.title = userPaused ? 'Resume automatic slide rotation' : 'Pause automatic slide rotation';
          if (userPaused) stop(); else start();
        });
      }
      previous?.addEventListener('click', () => { show(active - 1); start(); });
      next?.addEventListener('click', () => { show(active + 1); start(); });
      dots.forEach((dot, index) => dot.addEventListener('click', () => { show(index); start(); }));
      carousel.addEventListener('mouseenter', () => { hovered = true; stop(); });
      carousel.addEventListener('mouseleave', () => { hovered = false; start(); });
      carousel.addEventListener('focusin', () => { focused = true; stop(); });
      carousel.addEventListener('focusout', event => {
        if (!carousel.contains(event.relatedTarget)) { focused = false; start(); }
      });
      carousel.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); show(active - 1); start(); }
        if (event.key === 'ArrowRight') { event.preventDefault(); show(active + 1); start(); }
      });
      carousel.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        startX = event.clientX; startY = event.clientY;
      }, { passive: true });
      carousel.addEventListener('pointerup', event => {
        if (startX === null || startY === null) return;
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        startX = null; startY = null;
        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
          show(active + (deltaX < 0 ? 1 : -1)); start();
        }
      }, { passive: true });
      carousel.addEventListener('pointercancel', () => { startX = startY = null; }, { passive: true });
      document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
      show(active, false); start();
    });
  }

  function initialize() {
    addSkipLink();
    enhanceNavigation();
    enhanceGlobalWhatsApp();
    enhanceTables();
    initCarousels();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
