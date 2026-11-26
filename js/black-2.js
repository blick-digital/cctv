/* CCTV Group — главная: отрисовка блоков, анимации, меню, квиз и формы */
(() => {
  const D = { ...window.CCTV, PROTO: 'pages.html', LEGAL: { privacy: 'pages.html#privacy', consent: 'pages.html#privacy' } };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ARROW = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
  const proto = hash => `${D.PROTO}#${hash}`;
  const pad2 = n => String(n).padStart(2, '0');

  const serviceGroups = D.SGROUPS.map(group => group.k === 'finish'
    ? { ...group, img: 'assets/img/svc-finish-dark.png' }
    : group);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!reduce && hasGsap) document.documentElement.classList.add('anim');

  /* ================= Отрисовка из данных ================= */

  // контакты
  $$('[data-phone]').forEach(a => { a.textContent = D.PHONE; a.href = D.PHONE_HREF; });
  $$('[data-email]').forEach(a => { a.textContent = D.EMAIL; a.href = `mailto:${D.EMAIL}`; });
  $$('[data-address]').forEach(el => {
    if(el.closest('#contacts'))el.innerHTML='Набережная Обводного канала, Санкт-Петербург<br>134 — 136, 138, лит. ВМ, офис 3';
    else el.textContent=D.ADDRESS;
  });
  $$('[data-proto]').forEach(a => { a.href = proto(a.dataset.proto); });
  $$('[data-legal]').forEach(a => { a.href = D.LEGAL[a.dataset.legal]; });
  $('[data-consent]').outerHTML = Black2.consent();
  $('#contacts').append($('.ftr > .ftr-bot').cloneNode(true));

  const contactGrid = $('#contacts .contact-grid');
  const contactSide = $('.contact-side', contactGrid);
  const contactLinks = $('.contact-links', contactSide);
  const serviceSide = $('.b2-services-head .sec-side');
  const serviceButton = $('.pill', serviceSide);
  const serviceSelector = $('.b2-service-selector');
  const mobileLayout = matchMedia('(max-width: 1023px)');
  const positionResponsiveContent = () => {
    (mobileLayout.matches ? contactGrid : contactSide).append(contactLinks);
    (mobileLayout.matches ? serviceSelector : serviceSide).append(serviceButton);
  };
  positionResponsiveContent();
  mobileLayout.addEventListener('change', positionResponsiveContent);

  // пилюли первого экрана (для телефона и режима без анимации)
  $('[data-hero-pills]').innerHTML = D.DKEYS.map(k =>
    `<a class="dpill ${k}" href="${proto(k)}"><span>${D.DIRS[k].short}</span>${ARROW}</a>`).join('');

  // карточки направлений: на десктопе это те же пилюли, которые раскрываются
  $('#directions').innerHTML = Black2.directionsContent(proto);

  const serviceNumber = index => `${pad2(index + 1)} / ${pad2(serviceGroups.length)}`;
  const serviceTabs = $('[data-service-tabs]');
  const servicePanels = $('[data-service-panels]');
  const serviceIndex = $('[data-service-number]');

  serviceTabs.innerHTML = serviceGroups.map((group, index) => `
    <button type="button" role="tab" id="tab-${group.k}" aria-controls="service-${group.k}"
      aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">${group.name}</button>`).join('');

  servicePanels.innerHTML = serviceGroups.map((group,index) =>
    Black2.servicePanel(group,{hidden:index!==0})).join('');

  const tabs = $$('[role="tab"]', serviceTabs);
  const panels = $$('[role="tabpanel"]', servicePanels);
  let selectedService = -1;
  function selectService(index) {
    if (index === selectedService) return;
    if (selectedService >= 0) {
      tabs[selectedService].setAttribute('aria-selected', 'false');
      tabs[selectedService].tabIndex = -1;
      panels[selectedService].hidden = true;
    }

    selectedService = index;
    tabs[index].setAttribute('aria-selected', 'true');
    tabs[index].tabIndex = 0;
    panels[index].hidden = false;
    const group = serviceGroups[index];
    serviceIndex.textContent = `${serviceNumber(index)}　${group.tag}`;
  }
  const serviceQuery = new URLSearchParams(location.search);
  const requestedItem = serviceQuery.get('work');
  const requestedGroup = serviceGroups.findIndex(group =>
    group.k === serviceQuery.get('group') || group.items.includes(requestedItem));
  selectService(Math.max(0, requestedGroup));
  if (requestedItem && Object.hasOwn(D.SERVICES, requestedItem)) {
    const panel = document.getElementById('acc-' + requestedItem);
    const item = panel.closest('.acc-item');
    item.classList.add('is-open');
    item.querySelector('button').setAttribute('aria-expanded', 'true');
    panel.inert = false;
  }
  serviceTabs.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) selectService(tabs.indexOf(tab));
  });
  serviceTabs.addEventListener('keydown', event => {
    const count = tabs.length;
    const indices = {
      ArrowLeft: (selectedService + count - 1) % count,
      ArrowRight: (selectedService + 1) % count,
      Home: 0,
      End: count - 1,
    };
    if (!Object.hasOwn(indices, event.key)) return;
    event.preventDefault();
    selectService(indices[event.key]);
    tabs[selectedService].focus();
  });
  // шаги
  $('[data-steps]').innerHTML = D.STEPS.map((s, i) => `
    <li class="step">
      <span class="step-num" aria-hidden="true">${pad2(i + 1)}</span>
      <i class="step-dot" aria-hidden="true"></i>
      <div class="step-body"><span class="step-k">Этап ${i + 1}</span><h3 class="step-t">${s[0]}</h3><p class="step-d">${s[1]}</p></div>
    </li>`).join('');

  // Встроенный SVG обрезает поля исходника и скрывает белую подложку там, где она есть.
  const clientRows = $$('[data-client-row]');
  clientRows.forEach((row, index) => {
    const cells = Black2.clientLogos[index].map(Black2.clientLogo).join('');
    $('.marquee-track', row).innerHTML =
      `<div class="client-logo-set">${cells}</div><div class="client-logo-set" aria-hidden="true">${cells}</div>`;
  });

  // документы
  $('[data-docs]').innerHTML = D.DOCS.map(d => `<div class="doc" data-reveal><h3>${d.name}</h3><p>${d.meta.replace(' Член с ', '<br>Член&nbsp;с&nbsp;')}</p></div>`).join('');

  // выбор направления в форме
  const chipList = [['', 'Не знаю, подскажите'], ...D.DKEYS.map(k => [k, D.DIRS[k].brand])];
  $('[data-dir-chips]').innerHTML = chipList.map(([k, t], i) =>
    `<button class="chip ${k}" type="button" data-chip="${k}" aria-pressed="${i === 0}">${t}</button>`).join('') +
    '<input type="hidden" name="dir" value="">';

  // подвал
  $('[data-ftr-dirs]').innerHTML = D.DKEYS.map(k => `<li><a href="${proto(k)}">${D.DIRS[k].brand}</a></li>`).join('');
  $('[data-ftr-company]').innerHTML = D.COMPANY.filter(([page]) => page !== 'contacts')
    .map(([h, t]) => `<li><a href="${proto(h)}">${t}</a></li>`).join('');

  Black2.renderMenu(proto, '#services');

  /* ================= Плавный скролл ================= */

  let lenis = null;
  if (!reduce && hasGsap && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  let autoScroll = false; // идёт программная прокрутка — доводку сцены не трогаем
  const scrollTo = (y, dur = 1.4) => {
    if (!lenis) return window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    autoScroll = true;
    const done = () => { autoScroll = false; };
    lenis.scrollTo(y, { duration: dur, lock: true, force: true, easing: t => 1 - Math.pow(1 - t, 3), onComplete: done });
    setTimeout(done, dur * 1000 + 250);
  };
  const lock = on => { if (lenis) on ? lenis.stop() : lenis.start(); document.documentElement.style.overflow = on ? 'hidden' : ''; };

  /* ================= Анимации ================= */

  const hdr = $('#hdr');
  const stage = $('.stage');
  let lastY = 0;
  let stageST = null;      // ScrollTrigger сцены (десктоп)
  const motion = { ease: 'power3.out', enter: .68, heading: 1.1, detail: .48, stagger: .055 };

  // разбивка заголовков на слова
  // <br> сохраняем; слова, связанные неразрывным пробелом (предлог + слово), остаются вместе
  $$('[data-split]').forEach(el => {
    const lines = el.innerHTML.split(/<br\s*\/?>/i).map(l => { const t = document.createElement('div'); t.innerHTML = l; return t.textContent.trim(); });
    el.innerHTML = lines.map(l => l.split(/[ \t\n]+/).filter(Boolean).map(w => {
      const className = w.includes('-') ? 'w w--hyphenated' : 'w';
      return `<span class="${className}"><span>${w}</span></span>`;
    }).join(' ')).join('<br> ');
  });

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    /* ---- вступление первого экрана ---- */
    if (!reduce) {
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
      const leadStart = 0.7;
      intro.from('.hero-bg img, .hero-bg video', { scale: 1.22, duration: 2.4, ease: 'power3.out' }, 0)
        .from('.hero-title .line-mask > span', { yPercent: 105, duration: 1.4 }, 0.25)
        .from('.hero-sub span', { yPercent: 60, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.55)
        .from('.hero-row .pill', { opacity: 0, duration: 1.1, clearProps: 'opacity' }, 0.6)
        .from('.hero-line--long', { scaleX: 0, duration: 1.6, ease: 'power3.inOut' }, 0.4)
        .from('.hero-line--short', { scaleX: 0, duration: 1.2, ease: 'power3.inOut' }, 0.8)
        .from('.hero-lead > span', { yPercent: 70, opacity: 0, duration: 1.1, stagger: 0.08 }, leadStart)
        .from('.hdr .logo, .hdr .nav a, .hdr .circ', { opacity: 0, y: -14, duration: 1, stagger: 0.04 }, 0.3);
      // пилюли: в режиме сцены это карточки, иначе отдельные ссылки
      intro.add(() => {}, 0);
      mm.add('(min-width: 1024px)', () => {
        intro.from('.dcard', { opacity: 0, y: 40, duration: 1.1, stagger: 0.07, clearProps: 'opacity,transform' }, 0.85);
      });
      mm.add('(max-width: 1023px)', () => {
        intro.from('.dpill', { opacity: 0, y: 30, duration: 1, stagger: 0.06, clearProps: 'opacity,transform' }, 0.85);
      });
      intro.addLabel('signature', mobileLayout.matches ? leadStart : intro.duration())
        .fromTo('.hero-signature p', { y: 6, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.15, force3D: false, clearProps: 'transform,opacity',
        }, 'signature')
        .fromTo('.hero-signature i, .hero-signature-edge', { scaleX: 0, opacity: 0 }, {
          scaleX: 1, opacity: 1, duration: 1.25, stagger: .04, ease: 'power3.inOut',
          force3D: false, clearProps: 'transform,opacity',
        }, 'signature');
    }

    /* ---- десктоп: первый экран и направления ---- */
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      stage.classList.add('is-stage');
      const cards = $$('.dcard', stage);
      const U = () => document.documentElement.clientWidth / 1440;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage, start: 'top top', end: () => '+=' + Math.round(innerHeight * 1.6),
          pin: true, scrub: 0.9, invalidateOnRefresh: true,
          onUpdate: () => syncHeader(),
        },
      });
      stageST = tl.scrollTrigger;

      // Тексты первого экрана уходят вверх.
      tl.to(['.hero-brand', '.hero-lead'], { y: () => -90 * U(), opacity: 0, duration: 0.32, stagger: 0.02, ease: 'power2.in' }, 0)
        .fromTo(['.hero-line--long', '.hero-line--short'], { opacity: 1 }, { opacity: 0, duration: 0.25, ease: 'power2.in', immediateRender: false }, 0);

      // Открываем блок направлений.
      tl.fromTo('.hero-bg', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.55, ease: 'power3.inOut' }, 0.22)
        .fromTo('.hero-bg img, .hero-bg video', { yPercent: 0 }, { yPercent: -12, duration: 0.55 }, 0.22);

      Black2.animateDirections(tl, stage);

      return () => {
        stage.classList.remove('is-stage');
        stageST = null;
        gsap.set(cards, { clearProps: 'all' });
        gsap.set([...$$('.dcard-bg, .dcard-frame, .dcard-num, .dcard-body > *, .dirs-head > *'), '.hero-bg', '.hero-bg img, .hero-bg video', '.hero-brand', '.hero-lead', '.hero-line'], { clearProps: 'all' });
      };
    });

    /* ---- общие анимации при скролле ---- */
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // заголовки по словам
      $$('[data-split]').forEach(el => {
        const words = $$('.w > span', el);
        gsap.fromTo(words, { yPercent: 55, opacity: 0 }, {
          yPercent: 0, opacity: 1, duration: motion.heading, ease: 'power2.out',
          stagger: { amount: Math.min(.32, (words.length - 1) * .045) }, force3D: false,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });
      gsap.fromTo('.contact-bg img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true } });
      // подвал: большое слово
      gsap.fromTo('.ftr-word', { yPercent: 12, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: .85, ease: motion.ease, force3D: false,
        clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: '.ftr-word', start: 'top 96%', once: true },
      });
      [[$$('.ftr-cols > div'), '.ftr-cols'], [$$('#contacts .form > *'), '#contacts .form']].forEach(([items, trigger]) => {
        gsap.fromTo(items, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: motion.enter, stagger: { amount: .18 }, ease: motion.ease,
          force3D: false, clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger, start: 'top 90%', once: true },
        });
      });
      $$('.step-body').forEach((body, i) => gsap.fromTo(body, { opacity: 0, y: 14 }, {
        opacity: 1, y: 0, duration: .9, delay: i * .04, ease: motion.ease,
        force3D: false, clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: body, start: 'top 92%', once: true },
      }));
    });

    /* ---- шкала шагов ---- */
    const steps = $$('.step');
    const stepsBar = $('[data-steps-bar]');
    ScrollTrigger.create({
      trigger: '.steps-wrap', start: 'top 72%', end: 'bottom 55%', scrub: reduce ? false : 0.6,
      onUpdate: self => {
        const vertical = innerWidth < 1024;
        stepsBar.style.transform = vertical ? `scaleY(${self.progress})` : `scaleX(${self.progress})`;
        const n = Math.min(steps.length, Math.floor(self.progress * steps.length + 0.35));
        steps.forEach((s, i) => s.classList.toggle('is-on', i < n));
      },
    });

    // «Заявка» накрывает футер после того, как его нижний край вошёл в экран.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const footer = $('.ftr');
      const contact = $('#contacts');
      contact.classList.add('contact--overlap');
      ScrollTrigger.create({
        trigger: footer,
        start: 'bottom bottom',
        endTrigger: contact,
        end: 'top top',
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
      return () => contact.classList.remove('contact--overlap');
    });

    // пересчёт после загрузки шрифтов и картинок
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
    addEventListener('load', () => ScrollTrigger.refresh());
    if ('ResizeObserver' in window) {
      let refreshTimer;
      const servicesResize = new ResizeObserver(() => {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
      });
      servicesResize.observe(servicePanels);
    }
  } else {
    $$('.step').forEach(s => s.classList.add('is-on'));
  }
  document.documentElement.classList.remove('hero-loading');

  /* ---- появление блоков ---- */
  if (document.documentElement.classList.contains('anim')) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in'); io.unobserve(e.target);
    }), Black2.revealMotion.observerOptions);
    $$('[data-reveal]').forEach(el => {
      Black2.revealMotion.setDelay(el);
      io.observe(el);
    });
  }

  /* ================= Шапка ================= */

  function syncHeader() {
    const y = window.scrollY;
    let overDark;
    if (stageST) overDark = y < stageST.start + 1 || (stageST.isActive && stageST.progress < 0.7);
    else overDark = y < $('#hero').offsetHeight - 60;
    const probe = 40;
    ['.contact', '.ftr'].forEach(s => {
      const r = $(s).getBoundingClientRect();
      if (r.top <= probe && r.bottom >= probe) overDark = true;
    });
    hdr.classList.toggle('is-light', !overDark);
    const inPin = stageST && stageST.isActive;
    const down = y > lastY + 4, up = y < lastY - 4;
    const inContact = $('#contacts').getBoundingClientRect().top < innerHeight;
    if (!document.body.classList.contains('menu-open')) {
      if (inContact) hdr.classList.add('is-hidden');
      else if (down && y > 300 && !inPin) hdr.classList.add('is-hidden');
      else if (up || y < 300) hdr.classList.remove('is-hidden');
    }
    lastY = y;
  }
  if (lenis) lenis.on('scroll', syncHeader); else addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  /* Доводка сцены: начали крутить вниз с первого экрана — сайт сам доезжает до направлений,
     начали крутить вверх с направлений — возвращается на первый экран */
  if (lenis) lenis.on('scroll', e => {
    if (!stageST || autoScroll) return;
    const y = e.scroll, s = stageST.start, end = stageST.end;
    if (y <= s + 1 || y >= end - 1) return;
    if (e.direction > 0) scrollTo(end, 1.7);
    else if (e.direction < 0) scrollTo(s, 1.7);
  });

  /* ================= Навигация по якорям ================= */

  function targetY(hash) {
    if (hash === '#top') return 0;
    if (hash === '#directions' && stageST) return stageST.end - 2;
    const el = $(hash); if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY
      - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0) - (innerWidth < 1024 ? 60 : 0);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (hash.length < 2) return;
    const y = targetY(hash);
    if (y === null) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) Black2.closeMenu(false);
    scrollTo(y);
  });

  /* ================= Бегущая строка ================= */
  // Каждая строка тормозит независимо и продолжает движение с той же позиции.
  if (!reduce) clientRows.forEach(row => {
    const track = $('.marquee-track', row);
    const set = $('.client-logo-set', track);
    const movesRight = row.dataset.clientRow === 'right';
    const speed = 40;
    let width = 0, distance = 0, velocity = speed;
    let visible = false, paused = false, last = 0, raf = 0;

    function render() {
      const offset = movesRight ? distance - width : -distance;
      track.style.transform = `translate3d(${offset}px,0,0)`;
    }

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = paused ? 0 : speed;
      velocity += (target - velocity) * Math.min(1, dt * 3);
      distance = (distance + velocity * dt) % width;
      render();
      raf = paused && velocity < .2 ? 0 : requestAnimationFrame(frame);
    }

    function start() {
      if (raf || !visible || !width || (paused && velocity < .2)) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    row.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') paused = true; });
    row.addEventListener('pointerleave', () => { paused = false; start(); });
    new ResizeObserver(() => {
      const newWidth = set.getBoundingClientRect().width;
      if (!newWidth) return;
      distance = width ? distance * newWidth / width : 0;
      width = newWidth;
      render();
      start();
    }).observe(set);
    function updateVisibility() {
      const { top, bottom } = row.getBoundingClientRect();
      visible = bottom > 0 && top < innerHeight;
      if (visible) start();
      else { cancelAnimationFrame(raf); raf = 0; }
    }
    addEventListener('scroll', updateVisibility, { passive: true });
    addEventListener('resize', updateVisibility, { passive: true });
    addEventListener('load', updateVisibility, { once: true });
    updateVisibility();
  });

  /* ================= Согласие на cookie ================= */
  // «Соглашаюсь» запоминаем навсегда, крестик — до конца визита
  (function cookie() {
    const box = $('#cookie'); if (!box) return;
    let seen = false;
    try { seen = localStorage.getItem('cctv-cookie') === 'ok' || sessionStorage.getItem('cctv-cookie') === 'closed'; } catch (_) {}
    if (seen) return;
    setTimeout(() => { box.hidden = false; void box.offsetWidth; box.classList.add('is-on'); }, 1200);
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-cookie]'); if (!b) return;
      try { if (b.dataset.cookie === 'ok') localStorage.setItem('cctv-cookie', 'ok'); else sessionStorage.setItem('cctv-cookie', 'closed'); } catch (_) {}
      box.classList.remove('is-on'); setTimeout(() => { box.hidden = true; }, 500);
    });
  })();

  Black2.installInteractions({ lock, reduce, hasGsap });
})();
