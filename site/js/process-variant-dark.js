(() => {
  const section = document.querySelector('#process-two');
  if (!section || !window.CCTV) return;
  const steps = window.CCTV.STEPS;
  const images = ['assets/img/process-request-dark.png', 'assets/img/svc-design.jpg', 'assets/img/process-contract-dark.png', 'assets/img/svc-general.jpg', 'assets/img/about-building.jpg'];
  const list = section.querySelector('[data-process-two]');
  const photos = section.querySelector('[data-process-photos]');
  list.innerHTML = steps.map((step, i) => `<li class="p2-step"><span class="p2-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div><span class="p2-k">Этап ${i + 1}</span><h3 class="p2-title">${step[0]}</h3><p class="p2-description">${step[1]}</p></div></li>`).join('');
  photos.innerHTML = images.map(src => `<img class="p2-photo" src="${src}" width="500" height="700" alt="">`).join('');
  if (!window.gsap || !window.ScrollTrigger) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    section.classList.add('has-process-motion');
    const rows = [...list.children];
    const pictures = [...photos.children];
    const state = { p: 0 };
    let current = -1;
    let unit = 1;
    const measure = () => { unit = section.querySelector('.process-two-dial').getBoundingClientRect().width / 340; };
    const render = () => {
      const p = state.p;
      const active = Math.min(steps.length - 1, Math.round(p));
      const base = Math.min(steps.length - 1, Math.floor(p));
      const fraction = p - base;
      const deal = fraction * fraction * (3 - 2 * fraction);
      rows.forEach((row, i) => {
        const d = i - p;
        row.style.transform = `translateY(${d * 187 * unit}px)`;
        row.style.opacity = d >= 0 ? Math.max(0, 1 - d * .8) : Math.max(0, 1 + d * 1.7);
        // Карты всегда непрозрачны: верхняя физически уходит из стопки.
        const depth = i - base;
        const card = pictures[i];
        card.style.opacity = '1';
        card.style.visibility = depth >= 0 && depth <= 2 ? 'visible' : 'hidden';
        card.style.zIndex = String(20 - depth);
        if (depth === 0) {
          card.style.transform = `translate(${-deal * 480 * unit}px, ${deal * 70 * unit}px) rotate(${-3 - deal * 18}deg)`;
        } else {
          const lift = Math.max(0, depth - deal);
          card.style.transform = `translate(${lift * 16 * unit}px, ${lift * 10 * unit}px) rotate(${-3 + lift * 7}deg) scale(${1 - lift * .035})`;
        }
      });
      if (active !== current) {
        current = active;
        rows.forEach((row, i) => {
          row.classList.toggle('is-current', i === active);
          row.setAttribute('aria-hidden', String(i !== active));
        });
      }
    };
    measure();
    // Нативный sticky вместо GSAP pin/spacer: высота раздела постоянна.
    gsap.to(state, { p: steps.length - 1, ease: 'none', onUpdate: render, scrollTrigger: {
      trigger: section, start: 'top top', end: 'bottom bottom', scrub: .45,
      invalidateOnRefresh: true,
      onRefresh: () => { measure(); render(); },
    }});
    render();
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh); section.classList.remove('has-process-motion');
      rows.forEach(row => { row.style.cssText = ''; row.removeAttribute('aria-hidden'); row.classList.remove('is-current'); });
      pictures.forEach(picture => { picture.style.cssText = ''; });
    };
  });
})();
