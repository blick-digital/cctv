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

  let width = 0, height = 0, contourWidth = 0, gradient;
  let visible = false, frame = 0, last = 0, phase = 0;

  function resize() {
    width = footer.clientWidth;
    height = footer.clientHeight;
    const minContourWidth = parseFloat(getComputedStyle(footer).getPropertyValue('--footer-contour-width')) || 0;
    contourWidth = Math.max(width, minContourWidth);
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(180,154,121,.06)');
    gradient.addColorStop(0.08, 'rgba(180,154,121,.2)');
    gradient.addColorStop(0.35, 'rgba(180,154,121,.28)');
    gradient.addColorStop(0.7, 'rgba(180,154,121,.3)');
    gradient.addColorStop(0.92, 'rgba(180,154,121,.2)');
    gradient.addColorStop(1, 'rgba(180,154,121,.06)');
  }

  function draw(now) {
    frame = requestAnimationFrame(draw);
    if (now - last < 1000 / 30) return;
    const dt = last ? Math.min((now - last) / 1000, 0.08) : 1 / 30;
    last = now;
    phase += dt * 0.22;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 0.85;
    const lines = width < 700 ? 18 : 30;
    const contourScale = contourWidth > 0 ? width / contourWidth : 1;
    const waveHeight = height * contourScale;
    for (let row = 0; row < lines; row++) {
      const band = row / (lines - 1);
      ctx.globalAlpha = 0.35 + 0.65 * Math.sin(band * Math.PI);
      ctx.beginPath();
      for (let step = 0; step <= 88; step++) {
        const u = step / 88;
        const x = u * width;
        const waveX = .5 + (u - .5) * contourScale;
        const envelope = 0.65 + Math.sin(u * Math.PI) * 0.35;
        const y = height * (0.09 + band * 0.78)
          + Math.sin(waveX * 6.5 + phase + band * 1.8) * waveHeight * 0.13 * envelope
          + Math.sin(waveX * 11 - phase * 0.6 + band * 2.2) * waveHeight * 0.045 * envelope;
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
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  new ResizeObserver(resize).observe(footer);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(footer);
  resize();
})();
