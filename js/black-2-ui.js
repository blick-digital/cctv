/* Components used on the homepage and all Black 2 detail pages. */
window.Black2 = (() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const D = { ...window.CCTV, LEGAL: { privacy: 'pages.html#privacy', consent: 'pages.html#privacy' } };
  const ARROW = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
  const mobileLayout = matchMedia('(max-width: 1023px)');
  const consent = () => `<label class="check"><input type="checkbox" required><i aria-hidden="true"></i><span>Я подтверждаю ознакомление и даю <a href="${D.LEGAL.consent}" target="_blank" rel="noopener">Согласие на обработку</a> моих персональных данных <br class="consent-break">в&nbsp;порядке и на условиях, указанных в&nbsp;<a href="${D.LEGAL.privacy}" target="_blank" rel="noopener">Политике обработки персональных данных</a></span></label>`;
  const revealMotion = {
    observerOptions: { rootMargin: '0px 0px -10% 0px' },
    setDelay(element) {
      const siblings = [...element.parentElement.children].filter(child => child.hasAttribute('data-reveal'));
      element.style.setProperty('--rd', `${Math.min(180, Math.max(0, siblings.indexOf(element)) * 55)}ms`);
    },
  };
  const home = {
    ...D.DIRS.home,
    title: 'Квартиры и дома: от проекта до новоселья',
    titleLines: ['Квартиры', 'и дома:', 'от проекта', 'до новоселья'],
    subs: ['Квартиры', 'Загородные дома', 'Дизайн-проекты'],
  };
  const mobileCardTitles = {
    contract: ['Крупные', 'объекты под', 'ключ'],
    business: ['Строительство', 'и ремонт', 'коммерческих', 'объектов'],
    telecom: ['Работы для', 'операторов', 'связи'],
  };
  const cardDescriptions = {
    contract: ['Девелоперам, социальным', 'и промышленным объектам'],
    home: ['Частным заказчикам:', 'квартиры и загородные дома'],
    telecom: ['Операторам связи:', 'Ростелеком, МГТС, МТС'],
  };

  const clientLogos = [
    [
      ['Брусника', 'brusnika.svg'],
      ['GloraX', 'glorax.png', '10 10 476 86', 496, 106],
      ['МСУ-1', 'msu1.png', '0 118 300 65', 300, 300],
      ['Инжиниринг групп', 'engineering-group.png', '127 204 1346 311', 1600, 719],
      ['ПИК', 'pik.svg'],
      ['Самолёт', 'samolet.png'],
      ['Группа ЛСР', 'lsr.png', '47 47 651 205', 744, 299],
      ['Setl Group', 'setl-group.png'],
      ['ФСК', 'fsk.png'],
      ['Level Group', 'level-group.svg', '0 0 44 44', 44, 44],
      ['А101', 'a101.png', '151 99 1023 1018', 1280, 1227],
      ['Sminex и Инград', 'sminex-ingrad.webp', '467 445 4176 897', 5003, 2000, true],
      ['RBI', 'rbi.png'],
      ['Пионер', 'pioneer.webp'],
      ['Гранель', 'granel.jpg', '3 62 759 458', 768, 576, true],
    ],
    [
      ['Главстрой Санкт-Петербург', 'glavstroy-spb.svg'],
      ['Кортрос', 'kortros.jpg', '22 20 356 110', 400, 149, true],
      ['Инсити', 'insiti.jpg', '92 93 808 177', 1000, 368, true],
      ['Страна Девелопмент', 'strana.png', '21 176 589 90', 640, 400, true],
      ['ТОЧНО', 'tochno.png', '99 192 602 116', 800, 500],
      ['DOGMA', 'dogma.png', '154 122 1514 450', 1833, 696, true],
      ['Аквилон', 'aquilon.png', '10 10 1007 300', 1027, 320],
      ['Основа', 'osnova.png', '10 10 895 263', 915, 283],
      ['Спектрум', 'spectrum.png', '11 11 1183 200', 1205, 222],
      ['Мангазея Девелопмент', 'mangazeya.png', '10 10 1399 146', 1420, 166],
      ['РСТИ', 'rsti.png', '10 10 464 464', 484, 484],
      ['АСПЭК-Домстрой', 'aspec-domstroy.png', '10 10 842 129', 862, 149],
      ['УДС Групп', 'uds-group.svg', '0 0 252 32', 252, 32],
      ['Неометрия', 'neometria.svg'],
      ['Главстрой', 'glavstroy.jpg', '55 56 406 50', 515, 161, true],
    ],
  ];

  const clientLogosKeepGray = new Set([
    'setl-group.png', 'fsk.png', 'sminex-ingrad.webp', 'rbi.png', 'pioneer.webp',
    'insiti.jpg', 'tochno.png', 'dogma.png', 'uds-group.svg', 'neometria.svg', 'glavstroy.jpg',
  ]);
  function clientLogo([name, file, crop, width, height, matte]) {
    const src = `assets/logos/black-2/${file}`;
    const [, , cropWidth, cropHeight] = crop ? crop.split(' ') : [];
    const logo = crop
      ? `<svg viewBox="${crop}" style="--logo-ratio:${cropWidth / cropHeight}" role="img" aria-label="${name}"><image href="${src}" width="${width}" height="${height}"${matte ? ' filter="url(#client-white-matte)"' : ''}/></svg>`
      : `<img src="${src}" alt="${name}" loading="lazy">`;
    const keepGray = clientLogosKeepGray.has(file) ? ' logo-cell--keep-gray' : '';
    return `<div class="logo-cell${keepGray}">${logo}</div>`;
  }

  function directionCards(proto) {
    return D.DKEYS.map(k => {
      const d = k === 'home' ? home : D.DIRS[k];
      const title = d.titleLines?.join('<br> ')
        ?? mobileCardTitles[k]?.join('<br class="dcard-mobile-break"> ')
        ?? d.title;
      const description = k === 'business'
        ? d.card.replace(' складам и АЗС', '<br class="dcard-mobile-break"> складам и АЗС')
        : cardDescriptions[k]?.join('<br> ') ?? d.card;
      return `<a class="dcard ${k}" href="${proto(k)}" aria-label="${d.brand}: ${d.title}">
        <div class="dcard-bg"><img src="${d.img}" alt="" decoding="async"><i class="dcard-tint"></i></div>
        <i class="dcard-frame"></i>
        <span class="dcard-name">${d.short}</span>
        <span class="dcard-arrow">${ARROW}</span>
        <div class="dcard-body">
          <h3 class="dcard-title">${title}</h3>
          <p class="dcard-text">${description}</p>
          <ul class="dcard-subs">${d.subs.map(s => `<li>${s}</li>`).join('')}</ul>
          <span class="dcard-go"><span>Подробнее о направлении</span><span>→</span></span>
        </div>
      </a>`;
    }).join('');
  }

  function directionsContent(proto) {
    return `<div class="dirs-head">
        <span class="label">/ Направления</span>
        <h2 class="dirs-title">Четыре направления группы</h2>
        <p class="dirs-text">От крупных строек и коммерческих<br> объектов до частного ремонта<br> и работ для операторов связи</p>
      </div>
      <div class="dirs-cards" data-dir-cards>${directionCards(proto)}</div>`;
  }

  function animateDirections(tl, stage, { cardTop = 110 } = {}) {
    const cards = $$('.dcard', stage);
    const U = () => document.documentElement.clientWidth / 1440;
    const H = () => stage.clientHeight;
    const pillBox = i => ({ left: () => (582 + i * 212) * U(), top: () => H() - 79 * U(), width: () => 202 * U(), height: () => 58 * U(), borderRadius: () => 36 * U() });
    const cardBox = i => ({ left: () => (300 + i * 282.5) * U(), top: () => cardTop * U(), width: () => 272.5 * U(), height: () => H() - (cardTop + 20) * U(), borderRadius: 0 });

    cards.forEach((c, i) => {
      tl.fromTo(c, pillBox(i), { ...cardBox(i), duration: 0.62, ease: 'power3.inOut', immediateRender: true }, 0.16 + i * 0.035)
        .fromTo($('.dcard-bg', c), { opacity: 0 }, { opacity: 1, duration: 0.22 }, 0.08 + i * 0.02)
        .fromTo($('.dcard-frame', c), { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0.2 + i * 0.02)
        .fromTo($('.dcard-arrow', c), { rotation: 0 }, { rotation: 45, duration: 0.3 }, 0.5 + i * 0.035)
        .fromTo($$('.dcard-body > *', c), { opacity: 0 }, { opacity: 1, duration: 0.28, stagger: 0.03, ease: 'power2.out' }, 0.82 + i * 0.035);
    });
    tl.fromTo($$('.dirs-head > *', stage), { opacity: 0, y: () => 40 * U() }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' }, 0.68)
      .to({}, { duration: 0.12 });
  }

  function renderMenu(proto, servicesHref) {
    // меню
    $('[data-menu-dirs]').innerHTML = '<span class="label" data-m>/ Направления</span>' + D.DKEYS.map((k, i) => `
      <div class="menu-dir" data-m style="--d:${i + 1}">
        <a href="${proto(k)}">${D.DIRS[k].brand}${ARROW}</a>
        <ul>${D.DIRS[k].subs.map(s => `<li>${s}</li>`).join('')}</ul>
      </div>`).join('');
    const menuCompany = D.COMPANY.map(([page, title]) => [proto(page), title]);
    menuCompany.splice(1, 0, [servicesHref, 'Услуги']);
    $('[data-menu-main]').innerHTML = '<span class="label" data-m>/ Компания</span>' +
      '<div class="menu-company-links">' +
      menuCompany.map(([href, title], i) => `<a href="${href}" data-m style="--d:${i + 2}"><span>${title}</span></a>`).join('') + '</div>';
    const menuDirections = $('[data-menu-dirs]');
    const menuCompanyColumn = $('[data-menu-main]');
    const alignMenuCompany = () => {
      if (mobileLayout.matches) {
        menuCompanyColumn.style.removeProperty('--menu-company-height');
        return;
      }
      const lastDirection = $('.menu-dir:last-child > a', menuDirections);
      if (!lastDirection.offsetHeight) return;
      const lastLink = $('.menu-company-links > a:last-child', menuCompanyColumn);
      const belowCap = el => {
        const style = getComputedStyle(el);
        return (parseFloat(style.lineHeight) - parseFloat(style.fontSize) * .654) / 2;
      };
      const lastGroup = lastDirection.parentElement;
      const height = lastGroup.offsetTop - menuDirections.offsetTop + lastDirection.offsetTop + lastDirection.offsetHeight
        - belowCap(lastDirection) + belowCap(lastLink);
      menuCompanyColumn.style.setProperty('--menu-company-height', `${height}px`);
    };
    new ResizeObserver(alignMenuCompany).observe(menuDirections);
    mobileLayout.addEventListener('change', alignMenuCompany);
    $$('.menu-contacts > *').forEach((el, i) => { el.setAttribute('data-m', ''); el.style.setProperty('--d', i + 3); });

    document.fonts.ready.then(alignMenuCompany);
  }
  // Identical service panel markup on the homepage and direction pages.
  function servicePanel(group, { services=D.SERVICES, labelledBy='tab-'+group.k, hidden=false }={}) {
    return `<article class="b2-service-panel" role="tabpanel" id="service-${group.k}" aria-labelledby="${labelledBy}" tabindex="0"${hidden?' hidden':''}>
      <figure><img src="${group.img}" alt="" loading="lazy"></figure>
      <div><h3 class="svc-word">${group.k==='general'?group.name.replace(' ','<br> '):group.name}</h3><p class="svc-desc">${group.desc}</p>
        <ul class="acc">${group.items.map(key=>{
          const [name,description]=services[key];
          return `<li class="acc-item"><button class="acc-btn" type="button" aria-expanded="false" aria-controls="acc-${key}"><span>${name}</span><svg aria-hidden="true"><use href="#i-plus"/></svg></button><div class="acc-panel" id="acc-${key}" inert><div><p>${description}</p></div></div></li>`;
        }).join('')}</ul>
      </div>
    </article>`;
  }
  function installInteractions({ lock, reduce, hasGsap }) {
    document.addEventListener('click', event => {
      const button=event.target.closest('.acc-btn');
      if(!button)return;
      const item=button.closest('.acc-item');
      const open=!item.classList.contains('is-open');
      item.classList.toggle('is-open',open);
      button.setAttribute('aria-expanded',String(open));
      document.getElementById(button.getAttribute('aria-controls')).inert=!open;
    });
    const hdr = $('#hdr');
    const motion = { ease: 'power3.out' };
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
    let opener = null, qz = null, bk = null, modalCloseTimer;
    const revealModalContent = () => {
      if (reduce || !hasGsap) return;
      gsap.fromTo(mBody, { opacity: 0, y: 8 }, {
        opacity: 1, y: 0, duration: .32, ease: motion.ease, force3D: false,
        overwrite: true, clearProps: 'transform,opacity,visibility',
      });
    };
    function openModal(html) {
      clearTimeout(modalCloseTimer);
      opener = document.activeElement;
      mBody.innerHTML = html;
      modal.hidden = false; requestAnimationFrame(() => modal.classList.add('is-open'));
      revealModalContent();
      lock(true); setPhone(false);
      setTimeout(() => { const f = $('button:not(.modal-x), input', mBody); f && f.focus(); }, 60);
    }
    function closeModal() {
      modal.classList.remove('is-open');
      modalCloseTimer = setTimeout(() => { modal.hidden = true; mBody.innerHTML = ''; }, reduce ? 0 : 320);
      if (!document.body.classList.contains('menu-open')) lock(false);
      opener && opener.focus && opener.focus();
    }
    modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Tab' && (!modal.hidden || !menu.hidden)) {
        const overlay = modal.hidden ? menu : modal;
        const controls = $$('a[href], button:not(:disabled), input:not(:disabled), select, textarea', overlay)
          .filter(el => el.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        const active = document.activeElement;
        if (!first) return;
        if (overlay === menu && active === menuBtn) {
          e.preventDefault(); (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault(); (overlay === menu ? menuBtn : last).focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault(); (overlay === menu ? menuBtn : first).focus();
        }
        return;
      }
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
      revealModalContent();
    }
    function startLead(dir) {
      qz = { k: dir ? (dir === 'home' ? 'homechoice' : dir) : 'lead', step: 0, a: {}, lead: true };
      openModal(''); quizRender();
    }

    document.addEventListener('click', e => {
      const t = e.target.closest('button, a'); if (!t) return;
      const ds = t.dataset;
      if (ds.open === 'lead') { e.preventDefault(); if (document.body.classList.contains('menu-open')) closeMenu(false); startLead(); return; }
      if (ds.open === 'booking') {
        bk = { type: 'Замер', day: null, time: null };
        qz = { k: 'booking', step: 0, a: {}, lead: false };
        openModal(''); quizRender(); return;
      }
      if (ds.open === 'callback') { openModal(`<div class="q-head"><span class="eyebrow" id="m-title">Обратный звонок</span></div><h3 class="q-title">Перезвоним в рабочее время</h3><p class="sm muted">${D.PHONE} · ${D.EMAIL}</p>${formHTML('callback')}`); return; }
      if (ds.quiz && D.QUIZ[ds.quiz]) {
        qz = { k: ds.quiz, step: 0, a: {}, lead: false };
        openModal(''); quizRender(); return;
      }
      if (ds.form === 'tender') {
        openModal(`<h3 class="q-title" id="m-title">Запросить КП</h3>${formHTML('tender', ds.dir)}`); return;
      }
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
      else if (ds.bkType) { bk.type = ds.bkType; $('#bk', modal).outerHTML = bookingHTML(); }
      else if (ds.bkDay) { bk.day = +ds.bkDay; bk.time = null; $('#bk', modal).outerHTML = bookingHTML(); }
      else if (ds.bkTime) { bk.time = ds.bkTime; $('#bk', modal).outerHTML = bookingHTML(); }
    });
    Black2.closeMenu = closeMenu;
    Black2.closeDialogs = () => {
      if (!modal.hidden) closeModal();
      if (!menu.hidden) closeMenu(false);
      setPhone(false);
    };
  }
  function pill(text, attrs, tag = 'button', variant = 'line') {
    const type = tag === 'button' && !attrs.includes('type=') ? ' type="button"' : '';
    return `<${tag} class="pill pill--${variant}"${type} ${attrs}><span>${text}</span><i class="pill-dot">${ARROW}</i></${tag}>`;
  }
  return { consent, revealMotion, servicePanel, clientLogos, clientLogo, directionsContent, animateDirections, renderMenu, installInteractions, pill };
})();
