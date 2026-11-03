/* Quiet contour field. No libraries; rendered only while the footer is visible. */
(() => {
  const footer = document.querySelector('.ftr');
  if (!footer) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.className = 'ftr-motion';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  footer.prepend(canvas);

  let width = 0, height = 0, gradient;
  let visible = false, frame = 0, last = 0, phase = 0;
  const pointer = { x: 0.5, y: 0.5, strength: 0, targetX: 0.5, targetY: 0.5, targetStrength: 0 };

  function resize() {
    width = footer.clientWidth;
    height = footer.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(92,137,255,.06)');
    gradient.addColorStop(0.08, 'rgba(92,137,255,.2)');
    gradient.addColorStop(0.35, 'rgba(127,162,255,.28)');
    gradient.addColorStop(0.7, 'rgba(127,162,255,.3)');
    gradient.addColorStop(0.92, 'rgba(92,137,255,.2)');
    gradient.addColorStop(1, 'rgba(92,137,255,.06)');
  }

  function draw(now) {
    frame = requestAnimationFrame(draw);
    if (now - last < 1000 / 30) return;
    const dt = last ? Math.min((now - last) / 1000, 0.08) : 1 / 30;
    last = now;
    phase += dt * 0.22;
    const follow = 1 - Math.exp(-dt * 5);
    pointer.x += (pointer.targetX - pointer.x) * follow;
    pointer.y += (pointer.targetY - pointer.y) * follow;
    pointer.strength += (pointer.targetStrength - pointer.strength) * follow;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 0.85;
    const lines = width < 700 ? 18 : 30;
    const radius = Math.min(width * 0.23, 300);
    for (let row = 0; row < lines; row++) {
      const band = row / (lines - 1);
      ctx.globalAlpha = 0.35 + 0.65 * Math.sin(band * Math.PI);
      ctx.beginPath();
      for (let step = 0; step <= 88; step++) {
        const u = step / 88;
        const x = u * width;
        const envelope = 0.65 + Math.sin(u * Math.PI) * 0.35;
        let y = height * (0.09 + band * 0.78)
          + Math.sin(u * 6.5 + phase + band * 1.8) * height * 0.13 * envelope
          + Math.sin(u * 11 - phase * 0.6 + band * 2.2) * height * 0.045 * envelope;
        const dx = x - pointer.x * width;
        const dy = y - pointer.y * height;
        const influence = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
        y += influence * pointer.strength * Math.tanh(dy / 60) * 42;
        if (step === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function sync() {
    const active = visible && !document.hidden && !motion.matches;
    if (active && !frame) { last = 0; frame = requestAnimationFrame(draw); }
    if (!active && frame) { cancelAnimationFrame(frame); frame = 0; }
  }
  footer.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const rect = footer.getBoundingClientRect();
    pointer.targetX = (e.clientX - rect.left) / rect.width;
    pointer.targetY = (e.clientY - rect.top) / rect.height;
    pointer.targetStrength = 1;
  }, { passive: true });
  footer.addEventListener('pointerleave', () => { pointer.targetStrength = 0; });
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  new ResizeObserver(resize).observe(footer);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(footer);
  resize();
})();
