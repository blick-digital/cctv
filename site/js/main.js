/* CCTV Group — главная: отрисовка блоков, анимации, меню, квиз и формы */
(() => {
  const D = window.CCTV;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ARROW = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
  const PLUS = '<svg aria-hidden="true"><use href="#i-plus"/></svg>';
  const proto = hash => `${D.PROTO}#${hash}`;
  const pad2 = n => String(n).padStart(2, '0');

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!reduce && hasGsap) document.documentElement.classList.add('anim');

  /* ================= Отрисовка из данных ================= */

  // контакты
  $$('[data-phone]').forEach(a => { a.textContent = D.PHONE; a.href = D.PHONE_HREF; });
  $$('[data-email]').forEach(a => { a.textContent = D.EMAIL; a.href = `mailto:${D.EMAIL}`; });
  $$('[data-address]').forEach(el => { el.textContent = D.ADDRESS; });
  $$('[data-proto]').forEach(a => { a.href = proto(a.dataset.proto); });
  $$('[data-legal]').forEach(a => { a.href = D.LEGAL[a.dataset.legal]; });

  // пилюли первого экрана (для телефона и режима без анимации)
  $('[data-hero-pills]').innerHTML = D.DKEYS.map(k =>
    `<a class="dpill ${k}" href="${proto(k)}"><span>${D.DIRS[k].short}</span>${ARROW}</a>`).join('');

  // карточки направлений: на десктопе это те же пилюли, которые раскрываются
  $('[data-dir-cards]').innerHTML = D.DKEYS.map((k, i) => {
    const d = D.DIRS[k];
    return `<a class="dcard ${k}" href="${proto(k)}" aria-label="${d.brand}: ${d.title}">
      <div class="dcard-bg"><img src="${d.img}" alt="" decoding="async"></div>
      <i class="dcard-tint"></i><i class="dcard-frame"></i>
      <span class="dcard-name">${d.short}</span>
      <svg class="dcard-arrow" aria-hidden="true"><use href="#i-arrow"/></svg>
      <div class="dcard-body">
        <h3 class="dcard-title">${d.title}</h3>
        <p class="dcard-text">${d.card}</p>
        <ul class="dcard-subs">${d.subs.map(s => `<li>${s}</li>`).join('')}</ul>
        <span class="dcard-go"><span>Подробнее о направлении</span><span>→</span></span>
      </div>
    </a>`;
  }).join('');

  // услуги: оглавление и лента
  $('[data-svc-index]').innerHTML = D.SGROUPS.map((g, i) =>
    `<li><button type="button" data-go="svc-${g.k}"><i>${pad2(i + 1)}</i>${g.name}</button></li>`).join('');
  $('[data-svc-track]').innerHTML = D.SGROUPS.map((g, i) => `
    <article class="svc-panel" id="svc-${g.k}" aria-labelledby="svc-${g.k}-t">
      <figure class="svc-photo"><img src="${g.img}" alt="" loading="lazy"></figure>
      <div class="svc-body">
        <h3 class="svc-word" id="svc-${g.k}-t">${g.name}</h3>
        <p class="svc-meta"><b>${pad2(i + 1)} / ${pad2(D.SGROUPS.length)}</b><span>${g.tag}</span></p>
        <p class="svc-desc">${g.desc}</p>
        <ul class="acc">${g.items.map(s => {
          const [name, desc] = D.SERVICES[s];
          return `<li class="acc-item"><button class="acc-btn" type="button" aria-expanded="false" aria-controls="acc-${s}"><span>${name}</span>${PLUS}</button>
            <div class="acc-panel" id="acc-${s}" role="region"><div><p>${desc}</p></div></div></li>`;
        }).join('')}</ul>
      </div>
    </article>`).join('') + `
    <div class="svc-end">
      <button class="svc-end-btn" type="button" data-open="lead">${ARROW}<span>Обсудить<br>проект</span></button>
    </div>`;

  // проекты
  $('[data-projects]').innerHTML = D.PROJECTS.map(p => `
    <a class="prj" href="${proto('project-' + p.slug)}">
      <div class="prj-img"><img src="${p.img}" alt="${p.name}, ${p.city}" loading="lazy"><span class="circ">${ARROW}</span></div>
      <p class="prj-meta">${p.city} · ${p.type}</p>
      <h3 class="prj-name">${p.name}</h3>
      <ul class="tags">${p.works.map(w => `<li>${w}</li>`).join('')}</ul>
    </a>`).join('');

  // шаги
  $('[data-steps]').innerHTML = D.STEPS.map((s, i) => `
    <li class="step">
      <span class="step-num" aria-hidden="true">${pad2(i + 1)}</span>
      <i class="step-dot" aria-hidden="true"></i>
      <div class="step-body"><span class="step-k">Этап ${i + 1}</span><h3 class="step-t">${s[0]}</h3><p class="step-d">${s[1]}</p></div>
    </li>`).join('');

  // логотипы клиентов: две одинаковые половины для бесшовной ленты
  const cells = D.CLIENTS.map(c => `<div class="logo-cell"><img class="${c.src.includes('msu1') ? 'sq' : ''}" src="${c.src}" alt="${c.name}" loading="lazy"></div>`).join('');
  const half = cells + cells;
  $('[data-marquee]').innerHTML = half + half.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');

  // документы
  $('[data-docs]').innerHTML = D.DOCS.map(d => `<div class="doc" data-reveal><h3>${d.name}</h3><p>${d.meta}</p></div>`).join('');

  // выбор направления в форме
  const chipList = [['', 'Не знаю, подскажите'], ...D.DKEYS.map(k => [k, D.DIRS[k].brand])];
  $('[data-dir-chips]').innerHTML = chipList.map(([k, t], i) =>
    `<button class="chip ${k}" type="button" data-chip="${k}" aria-pressed="${i === 0}">${t}</button>`).join('') +
    '<input type="hidden" name="dir" value="">';

  // подвал
  $('[data-ftr-dirs]').innerHTML = D.DKEYS.map(k => `<li><a href="${proto(k)}">${D.DIRS[k].brand}</a></li>`).join('');
  $('[data-ftr-company]').innerHTML = D.COMPANY.map(([h, t]) => `<li><a href="${proto(h)}">${t}</a></li>`).join('');

  // меню
  $('[data-menu-dirs]').innerHTML = '<span class="label" data-m>/ Направления</span>' + D.DKEYS.map((k, i) => `
    <div class="menu-dir" data-m style="--d:${i + 1}">
      <a href="${proto(k)}">${D.DIRS[k].brand}${ARROW}</a>
      <ul>${D.DIRS[k].subs.map(s => `<li><a href="${proto(k)}">${s}</a></li>`).join('')}</ul>
    </div>`).join('');
  const onPage = [['#directions', 'Направления'], ['#about', 'О группе'], ['#services', 'Услуги'], ['#projects', 'Проекты'], ['#process', 'Как мы работаем'], ['#clients', 'Клиенты'], ['#contacts', 'Контакты']];
  $('[data-menu-main]').innerHTML = '<span class="label" data-m>/ На странице</span>' +
    onPage.map(([h, t], i) => `<a href="${h}" data-m style="--d:${i + 2}"><span>${t}</span></a>`).join('') +
    '<span class="label" data-m style="--d:9;margin-top:28px">/ Компания</span>' +
    D.COMPANY.map(([h, t], i) => `<a href="${proto(h)}" data-m style="--d:${i + 10}"><span>${t}</span></a>`).join('');
  $$('.menu-contacts > *').forEach((el, i) => { el.setAttribute('data-m', ''); el.style.setProperty('--d', i + 3); });

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
  let svcST = null;        // ScrollTrigger ленты услуг (десктоп)
  let svcDist = () => 0;

  // разбивка заголовков на слова
  // <br> сохраняем; слова, связанные неразрывным пробелом (предлог + слово), остаются вместе
  $$('[data-split]').forEach(el => {
    const lines = el.innerHTML.split(/<br\s*\/?>/i).map(l => { const t = document.createElement('div'); t.innerHTML = l; return t.textContent.trim(); });
    el.innerHTML = lines.map(l => l.split(/[ \t\n]+/).filter(Boolean).map(w => `<span class="w"><span>${w}</span></span>`).join(' ')).join('<br>');
  });

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    /* ---- вступление первого экрана ---- */
    if (!reduce) {
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
      intro.from('.hero-bg img', { scale: 1.22, duration: 2.4, ease: 'power3.out' }, 0)
        .from('.hero-title .line-mask > span', { yPercent: 105, duration: 1.4 }, 0.25)
        .from('.hero-sub span', { yPercent: 60, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.55)
        .from('.hero-row .pill', { opacity: 0, duration: 1.1, clearProps: 'opacity' }, 0.6)
        .from('.hero-line--long', { scaleX: 0, duration: 1.6, ease: 'power3.inOut' }, 0.4)
        .from('.hero-line--short', { scaleX: 0, duration: 1.2, ease: 'power3.inOut' }, 0.8)
        .from('.hero-lead > span', { yPercent: 70, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.7)
        .from('.hero-hint', { opacity: 0, y: 14, duration: 1 }, 0.9)
        .from('.hdr .logo, .hdr .nav a, .hdr .circ', { opacity: 0, y: -14, duration: 1, stagger: 0.04 }, 0.3);
      // пилюли: в режиме сцены это карточки, иначе отдельные ссылки
      intro.add(() => {}, 0);
      mm.add('(min-width: 1024px)', () => {
        intro.from('.dcard', { opacity: 0, y: 40, duration: 1.1, stagger: 0.07, clearProps: 'opacity,transform' }, 0.85);
      });
      mm.add('(max-width: 1023px)', () => {
        intro.from('.dpill', { opacity: 0, y: 30, duration: 1, stagger: 0.06, clearProps: 'opacity,transform' }, 0.85);
      });
    }

    /* ---- десктоп: сцена и горизонтальная лента ---- */
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      stage.classList.add('is-stage');
      const cards = $$('.dcard');
      const U = () => document.documentElement.clientWidth / 1440;
      const H = () => stage.clientHeight;
      const pillBox = i => ({ left: (582 + i * 212) * U(), top: H() - 79 * U(), width: 202 * U(), height: 58 * U(), borderRadius: 36 * U() });
      const cardBox = i => ({ left: (300 + i * 282.5) * U(), top: 110 * U(), width: 272.5 * U(), height: H() - 130 * U(), borderRadius: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage, start: 'top top', end: () => '+=' + Math.round(innerHeight * 1.6),
          pin: true, scrub: 0.9, invalidateOnRefresh: true,
          onUpdate: () => syncHeader(),
        },
      });
      stageST = tl.scrollTrigger;

      // 1. тексты первого экрана уходят вверх
      tl.to(['.hero-brand', '.hero-hint', '.hero-lead'], { y: () => -90 * U(), opacity: 0, duration: 0.32, stagger: 0.02, ease: 'power2.in' }, 0)
        .fromTo(['.hero-line--long', '.hero-line--short'], { opacity: 1 }, { opacity: 0, duration: 0.25, ease: 'power2.in', immediateRender: false }, 0)


      // 2. пилюли наполняются фото и раскрываются в карточки
      cards.forEach((c, i) => {
        tl.fromTo(c, pillBox(i), { ...cardBox(i), duration: 0.62, ease: 'power3.inOut', immediateRender: true }, 0.16 + i * 0.035)
          .fromTo($('.dcard-bg', c), { opacity: 0 }, { opacity: 1, duration: 0.22 }, 0.08 + i * 0.02)
          .fromTo($('.dcard-frame', c), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0.2 + i * 0.02)
          .fromTo($$('.dcard-body > *', c), { opacity: 0, y: () => 30 * U() }, { opacity: 1, y: 0, duration: 0.22, stagger: 0.03, ease: 'power2.out' }, 0.74 + i * 0.03);
      });

      // 3. фото первого экрана стирается вверх, открывая белый экран
      tl.fromTo('.hero-bg', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.55, ease: 'power3.inOut' }, 0.22)
        .fromTo('.hero-bg img', { yPercent: 0 }, { yPercent: -12, duration: 0.55 }, 0.22);

      // 4. левая колонка «Направления»
      tl.fromTo($$('.dirs-head > *'), { opacity: 0, y: () => 40 * U() }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' }, 0.68)
        .to({}, { duration: 0.12 }); // небольшая пауза в конце

      /* лента услуг */
      const track = $('[data-svc-track]');
      const pin = $('#services');
      svcDist = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      const fixTrackH = () => { track.style.height = ''; track.style.height = Math.max(...$$('.svc-panel', track).map(p => p.offsetHeight)) + 'px'; };
      fixTrackH(); ScrollTrigger.addEventListener('refreshInit', fixTrackH);
      const bar = $('[data-svc-bar]');
      const idx = $$('[data-svc-index] button');
      const panels = $$('.svc-panel');
      const hz = gsap.to(track, {
        x: () => -svcDist(), ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'top top', end: () => '+=' + svcDist(), pin: true, scrub: 0.7, invalidateOnRefresh: true,
          onToggle: () => syncHeader(),
          onUpdate: self => {
            bar.style.transform = `scaleX(${self.progress})`;
            const x = self.progress * svcDist() + innerWidth * 0.4;
            let on = 0; panels.forEach((p, i) => { if (p.offsetLeft <= x) on = i; });
            idx.forEach((b, i) => b.classList.toggle('is-on', i === on));
          },
        },
      });
      svcST = hz.scrollTrigger;
      panels.forEach(p => {
        gsap.fromTo($('.svc-photo img', p), { xPercent: -7, scale: 1.18 }, {
          xPercent: 7, scale: 1.18, ease: 'none',
          scrollTrigger: { trigger: p, containerAnimation: hz, start: 'left right', end: 'right left', scrub: true },
        });
      });

      return () => {
        stage.classList.remove('is-stage');
        track.style.height = ''; ScrollTrigger.removeEventListener('refreshInit', fixTrackH);
        stageST = null; svcST = null;
        gsap.set(cards, { clearProps: 'all' });
        gsap.set([...$$('.dcard-bg, .dcard-frame, .dcard-num, .dcard-body > *, .dirs-head > *'), '.hero-bg', '.hero-bg img', '.hero-brand', '.hero-hint', '.hero-lead', '.hero-line'], { clearProps: 'all' });
      };
    });

    /* ---- общие анимации при скролле ---- */
    if (!reduce) {
      // заголовки по словам
      $$('[data-split]').forEach(el => {
        gsap.from($$('.w > span', el), {
          yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.035,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      // фото с параллаксом
      $$('[data-parallax] img').forEach(img => {
        gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.fromTo('.contact-bg img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true } });
      // проекты: фото раскрывается из маски
      $$('.prj').forEach((p, i) => {
        const img = $('.prj-img', p);
        gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 88%' } })
          .from(img, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
          .from($('img', img), { scale: 1.3, duration: 1.8, ease: 'expo.out' }, 0.2)
          .from([...$$('.prj-meta, .prj-name, .tags', p)], { opacity: 0, y: 20, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, 0.6);
      });
      // услуги на телефоне: фото из маски
      mm.add('(max-width: 1023px)', () => {
        $$('.svc-photo').forEach(f => gsap.from(f, { clipPath: 'inset(0% 100% 0% 0%)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: f, start: 'top 85%' } }));
      });
      // счётчики
      $$('[data-count]').forEach(b => {
        const end = +b.dataset.count, o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: b, start: 'top 90%' }, onUpdate: () => { b.textContent = Math.round(o.v); } });
      });
      // подвал: большое слово
      gsap.from('.ftr-word', { yPercent: 60, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.ftr-word', start: 'top 98%' } });
    }

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

    // пересчёт после загрузки шрифтов и картинок
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
    addEventListener('load', () => ScrollTrigger.refresh());
  } else {
    $$('.step').forEach(s => s.classList.add('is-on'));
  }

  /* ---- появление блоков ---- */
  if (document.documentElement.classList.contains('anim')) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in'); io.unobserve(e.target);
    }), { rootMargin: '0px 0px -10% 0px' });
    $$('[data-reveal]').forEach(el => {
      const sib = [...el.parentElement.children].filter(x => x.hasAttribute('data-reveal'));
      el.style.setProperty('--rd', `${Math.max(0, sib.indexOf(el)) * 90}ms`);
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
    const inPin = stageST && stageST.isActive; // в услугах шапка прячется, чтобы раздел помещался целиком
    const down = y > lastY + 4, up = y < lastY - 4;
    if (!document.body.classList.contains('menu-open')) {
      if (svcST && svcST.isActive) hdr.classList.add('is-hidden'); // в «Услугах» шапки нет даже при прокрутке вверх
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
    if (hash === '#services' && svcST) return el.getBoundingClientRect().top + window.scrollY;
    return el.getBoundingClientRect().top + window.scrollY - (innerWidth < 1024 ? 60 : 0);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (hash.length < 2) return;
    const y = targetY(hash);
    if (y === null) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) closeMenu(false);
    scrollTo(y);
  });

  // оглавление услуг: прыжок к нужной группе в ленте
  $('[data-svc-index]').addEventListener('click', e => {
    const b = e.target.closest('[data-go]'); if (!b) return;
    const panel = $('#' + b.dataset.go);
    if (svcST) {
      const p = Math.min(1, (panel.offsetLeft - 20) / Math.max(1, svcDist()));
      scrollTo(svcST.start + p * (svcST.end - svcST.start) + 2);
    } else {
      const track = $('[data-svc-track]');
      track.scrollTo({ left: panel.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' });
      scrollTo(track.getBoundingClientRect().top + window.scrollY - 90);
    }
  });

  // раскрывающиеся услуги
  document.addEventListener('click', e => {
    const b = e.target.closest('.acc-btn'); if (!b) return;
    const item = b.closest('.acc-item');
    const open = !item.classList.contains('is-open');
    item.classList.toggle('is-open', open);
    b.setAttribute('aria-expanded', open);
  });

  /* ================= Частицы в подвале ================= */

  /* ================= Бегущая строка ================= */
  // Едет скриптом: при наведении плавно тормозит до остановки, потом плавно разгоняется.
  // В Safari пауза CSS-анимации дёргала ленту, поэтому так.
  (function marquee() {
    const box = $('.marquee'), track = $('[data-marquee]');
    if (!box || !track || reduce) return;
    const SPEED = 40; // пикселей в секунду
    let x = 0, v = SPEED, target = SPEED, last = performance.now(), run = false, raf = 0;
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      v += (target - v) * Math.min(1, dt * 3);   // мягкое торможение и разгон
      const half = track.scrollWidth / 2;
      x -= v * dt; if (x <= -half) x += half;
      track.style.transform = `translate3d(${x}px,0,0)`;
      if (run) raf = requestAnimationFrame(frame);
    }
    box.addEventListener('pointerenter', () => { target = 0; });
    box.addEventListener('pointerleave', () => { target = SPEED; });
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !run) { run = true; last = performance.now(); raf = requestAnimationFrame(frame); }
      else if (!en.isIntersecting) { run = false; cancelAnimationFrame(raf); }
    }).observe(box);
  })();

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

  /* ================= Меню и телефон ================= */

  const menu = $('#menu'), menuBtn = $('#menu-btn');
  function openMenu() {
    menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open'));
    document.body.classList.add('menu-open'); hdr.classList.remove('is-hidden');
    menuBtn.setAttribute('aria-expanded', 'true'); menuBtn.setAttribute('aria-label', 'Закрыть меню');
    lock(true);
  }
  function closeMenu(focus = true) {
    menu.classList.remove('is-open'); menu.hidden = true;
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Открыть меню');
    lock(false); if (focus) menuBtn.focus();
  }
  menuBtn.addEventListener('click', () => document.body.classList.contains('menu-open') ? closeMenu() : openMenu());

  const phoneBtn = $('#phone-btn'), phonePanel = $('#phone-panel');
  const setPhone = on => { phonePanel.hidden = !on; phoneBtn.setAttribute('aria-expanded', on); };
  phoneBtn.addEventListener('click', e => { e.stopPropagation(); setPhone(phonePanel.hidden); });
  document.addEventListener('click', e => { if (!phonePanel.hidden && !e.target.closest('.phone-pop')) setPhone(false); });

  /* ================= Формы ================= */

  const consent = () => `<label class="check"><input type="checkbox" required><i></i><span>Я подтверждаю ознакомление и даю <a href="${D.LEGAL.consent}" target="_blank">Согласие на обработку</a> моих персональных данных в порядке и на условиях, указанных в <a href="${D.LEGAL.privacy}" target="_blank">Политике обработки персональных данных</a></span></label>`;
  const submitBtn = t => `<button class="pill pill--cta" type="submit"><span>${t}</span><i class="pill-dot">${ARROW}</i></button>`;
  const fld = (n, l, t = 'text', req, extra = '') => `<label class="field"><span>${l}${req ? '' : ' (необязательно)'}</span><input name="${n}" type="${t}"${req ? ' required' : ''}${extra}></label>`;
  const nameph = `<div class="form-row">${fld('name', 'Имя', 'text', 1, ' autocomplete="name"')}${fld('phone', 'Телефон', 'tel', 1, ' autocomplete="tel" placeholder="+7"')}</div>`;
  function formHTML(type, dir) {
    if (type === 'tender') {
      const objs = dir === 'telecom' ? ['Ростелеком', 'МГТС', 'МТС', 'Другой оператор'] : ['Жилой комплекс', 'Социальный объект', 'Промышленный объект', 'Коммерческий объект', 'Другое'];
      return `<form class="form form--light js-form" data-title="Запрос КП" novalidate>
        <div class="form-row">${fld('company', 'Компания', 'text', 1)}${fld('name', 'Контактное лицо', 'text', 1)}</div>
        <div class="form-row">${fld('phone', 'Телефон', 'tel', 1, ' placeholder="+7"')}${fld('email', 'Почта', 'email')}</div>
        <label class="field"><span>Тип объекта</span><select name="object">${objs.map(o => `<option>${o}</option>`).join('')}</select></label>
        <label class="field"><span>ТЗ, проект или ведомость объёмов (необязательно)</span><input name="file" type="file" multiple></label>
        <div class="form-foot">${consent()}${submitBtn('Отправить')}</div></form>`;
    }
    return `<form class="form form--light js-form" data-title="Обратный звонок" novalidate>${nameph}<div class="form-foot">${consent()}${submitBtn('Жду звонка')}</div></form>`;
  }
  const doneHTML = title => `<div class="done" role="status">
      <span class="done-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
      <b>Заявка отправлена</b>
      <span>${title}: менеджер свяжется с вами в рабочее время. Сейчас сайт работает в демо-режиме, поэтому заявка никуда не ушла.</span>
    </div>`;

  document.addEventListener('submit', e => {
    const f = e.target.closest('.js-form'); if (!f) return;
    e.preventDefault();
    let ok = true;
    $$('input[required]', f).forEach(i => {
      const bad = i.type === 'checkbox' ? !i.checked : !i.value.trim() || (i.type === 'tel' && i.value.replace(/\D/g, '').length < 10);
      (i.closest('.field') || i.closest('.check')).classList.toggle('is-bad', bad);
      if (bad) ok = false;
    });
    if (!ok) { const first = $('.is-bad input', f); first && first.focus(); return; }
    const box = document.createElement('div');
    box.innerHTML = doneHTML(f.dataset.title || 'Заявка');
    f.replaceWith(box.firstElementChild);
  });
  document.addEventListener('input', e => {
    const w = e.target.closest('.is-bad'); if (w) w.classList.remove('is-bad');
  });
  // выбор направления в форме
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-chip]'); if (!c) return;
    const box = c.parentElement;
    $$('[data-chip]', box).forEach(x => x.setAttribute('aria-pressed', x === c));
    $('input[name="dir"]', box).value = c.dataset.chip;
  });

  /* ================= Окно: квиз, запись, звонок ================= */

  const modal = $('#modal'), mBody = $('#m-body');
  let opener = null, qz = null, bk = null;
  function openModal(html) {
    opener = document.activeElement;
    mBody.innerHTML = html;
    modal.hidden = false; requestAnimationFrame(() => modal.classList.add('is-open'));
    lock(true); setPhone(false);
    setTimeout(() => { const f = $('button:not(.modal-x), input', mBody); f && f.focus(); }, 60);
  }
  function closeModal() {
    modal.classList.remove('is-open');
    setTimeout(() => { modal.hidden = true; mBody.innerHTML = ''; }, 500);
    if (!document.body.classList.contains('menu-open')) lock(false);
    opener && opener.focus && opener.focus();
  }
  modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) closeModal();
    else if (document.body.classList.contains('menu-open')) closeMenu();
    else if (!phonePanel.hidden) { setPhone(false); phoneBtn.focus(); }
  });

  const head = (title, cur, total) => `<div class="q-head"><span class="eyebrow" id="m-title">${title} · шаг ${cur}${total ? ' из ' + total : ''}</span>
    <div class="q-bar"><i style="width:${total ? Math.round(cur / total * 100) : Math.min(90, cur * 14)}%"></i></div></div>`;
  const back = '<button class="q-back" type="button" data-q-back>← Назад</button>';
  const opt = (attrs, inner, pressed, cls = '') => `<button type="button" class="q-opt ${cls}" ${attrs}${pressed !== undefined ? ` aria-pressed="${pressed}"` : ''}><span>${inner}</span>${ARROW}</button>`;

  function bookingHTML() {
    const days = []; const base = new Date(); base.setHours(0, 0, 0, 0);
    for (let i = 1; days.length < 10; i++) { const dt = new Date(base); dt.setDate(base.getDate() + i); if (dt.getDay() !== 0) days.push(dt); }
    const fmt = dt => dt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    const wd = dt => dt.toLocaleDateString('ru-RU', { weekday: 'short' });
    const times = ['10:00', '12:00', '14:00', '16:00', '18:00'];
    const busy = (di, ti) => ((di * 3 + ti * 7) % 5) === 0;
    const di = bk.day === null ? -1 : bk.day;
    return `<div class="bk" id="bk">
      <div class="bk-step"><span class="eyebrow">1. Что нужно</span><div class="slots">${['Замер', 'Консультация', 'Выезд инженера'].map(t => `<button type="button" class="slot" data-bk-type="${t}" aria-pressed="${bk.type === t}">${t}</button>`).join('')}</div></div>
      <div class="bk-step"><span class="eyebrow">2. День</span><div class="slots">${days.map((dt, i) => `<button type="button" class="slot" data-bk-day="${i}" aria-pressed="${di === i}">${fmt(dt)}<small>${wd(dt)}</small></button>`).join('')}</div></div>
      <div class="bk-step"><span class="eyebrow">3. Время</span>${di < 0 ? '<p class="sm muted">Сначала выберите день</p>' : `<div class="slots">${times.map((t, ti) => `<button type="button" class="slot" data-bk-time="${t}" aria-pressed="${bk.time === t}" ${busy(di, ti) ? 'disabled' : ''}>${t}</button>`).join('')}</div>`}</div>
      ${di >= 0 && bk.time ? `<div class="bk-step"><span class="eyebrow">4. Контакты</span><p class="sm">${bk.type}: ${fmt(days[di])}, ${bk.time}</p>${formHTML('callback')}</div>` : ''}
    </div>`;
  }

  function quizRender() {
    let html;
    if (qz.k === 'lead') {
      html = `${head('Оставить заявку', 1)}<h3 class="q-title">Какое направление вам нужно?</h3>
        <p class="sm muted">Дальше зададим пару вопросов именно под вашу задачу.</p>
        <div class="q-opts">${D.DKEYS.map(k => opt(`data-lead-dir="${k}"`, `<b>${D.DIRS[k].brand}</b><small>${D.DIRS[k].card}</small>`, undefined, `dirc ${k}`)).join('')}</div>`;
    } else if (qz.k === 'homechoice') {
      html = `${head('CCTV HOME', 2)}<h3 class="q-title">С чего начнём?</h3>
        <div class="q-opts">${opt('data-home-choice="booking"', '<b>Записаться на замер</b><small>Выберите день и время</small>')}${opt('data-home-choice="calc"', '<b>Рассчитать ремонт</b><small>4 вопроса и контакты</small>')}</div>
        <div class="q-row">${back}</div>`;
    } else if (qz.k === 'booking') {
      html = `${head('Запись на замер · CCTV HOME', 3, 3)}<h3 class="q-title">Когда вам удобно?</h3>${bookingHTML()}<div class="q-row">${back}</div>`;
    } else {
      const Q = D.QUIZ[qz.k], off = qz.lead ? (qz.k === 'home' ? 2 : 1) : 0, total = off + Q.qs.length + 1, step = qz.step;
      const bk_ = (step > 0 || qz.lead) ? back : '<span></span>';
      if (step >= Q.qs.length) {
        const sum = Q.qs.map((q, i) => `<div><span>${q[0]}</span> ${[].concat(qz.a[i] || []).join(', ') || '—'}</div>`).join('');
        html = `${head(Q.title, total, total)}<h3 class="q-title">${Q.final === 'tender' ? 'Куда прислать КП?' : 'Куда прислать расчёт?'}</h3>
          <div class="q-sum">${sum}</div>${formHTML(Q.final, qz.k)}<div class="q-row">${bk_}</div>`;
      } else {
        const q = Q.qs[step], multi = q[2], cur = [].concat(qz.a[step] || []);
        html = `${head(Q.title, off + step + 1, total)}<h3 class="q-title">${q[0]}</h3>${multi ? '<p class="sm muted">Можно выбрать несколько</p>' : ''}
          <div class="q-opts">${q[1].map(o => opt(`data-q-opt="${o}"`, o, cur.includes(o))).join('')}</div>
          <div class="q-row">${bk_}${multi ? `<button class="q-next" type="button" data-q-next ${cur.length ? '' : 'disabled'}>Далее →</button>` : ''}</div>`;
      }
    }
    mBody.innerHTML = html;
    const f = $('.q-opt, .slot, input', mBody); f && f.focus({ preventScroll: true });
  }
  function startLead(dir) {
    qz = { k: dir ? (dir === 'home' ? 'homechoice' : dir) : 'lead', step: 0, a: {}, lead: true };
    openModal(''); quizRender();
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('button, a'); if (!t) return;
    const ds = t.dataset;
    if (ds.open === 'lead') { e.preventDefault(); if (document.body.classList.contains('menu-open')) closeMenu(false); startLead(); return; }
    if (ds.open === 'callback') { openModal(`<div class="q-head"><span class="eyebrow" id="m-title">Обратный звонок</span></div><h3 class="q-title">Перезвоним в рабочее время</h3><p class="sm muted">${D.PHONE} · ${D.EMAIL}</p>${formHTML('callback')}`); return; }
    if (!t.closest('#modal') || !qz) return;
    if (ds.leadDir) { qz = { k: ds.leadDir === 'home' ? 'homechoice' : ds.leadDir, step: 0, a: {}, lead: true }; quizRender(); }
    else if (ds.homeChoice) { if (ds.homeChoice === 'booking') { bk = { type: 'Замер', day: null, time: null }; qz.k = 'booking'; } else { qz.k = 'home'; qz.step = 0; qz.a = {}; } quizRender(); }
    else if (ds.qOpt !== undefined) {
      const q = D.QUIZ[qz.k].qs[qz.step];
      if (q[2]) { const cur = [].concat(qz.a[qz.step] || []); const i = cur.indexOf(ds.qOpt); i < 0 ? cur.push(ds.qOpt) : cur.splice(i, 1); qz.a[qz.step] = cur; }
      else { qz.a[qz.step] = ds.qOpt; qz.step++; }
      quizRender();
    }
    else if (ds.qNext !== undefined) { qz.step++; quizRender(); }
    else if (ds.qBack !== undefined) {
      if (qz.k === 'booking') qz.k = 'homechoice';
      else if (qz.k === 'homechoice') qz.k = 'lead';
      else if (qz.step > 0) qz.step--;
      else if (qz.lead) qz.k = qz.k === 'home' ? 'homechoice' : 'lead';
      quizRender();
    }
    else if (ds.bkType) { bk.type = ds.bkType; $('#bk').outerHTML = bookingHTML(); }
    else if (ds.bkDay) { bk.day = +ds.bkDay; bk.time = null; $('#bk').outerHTML = bookingHTML(); }
    else if (ds.bkTime) { bk.time = ds.bkTime; $('#bk').outerHTML = bookingHTML(); }
  });
})();
