/* Two copies overlap at the loop boundary; playback speed stays at 1x. */
(() => {
  const hero = document.querySelector('#hero');
  const videos = [...document.querySelectorAll('.hero-video')];
  if (!hero || videos.length !== 2) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0, frame = 0, visible = false, overlapping = false, preparing = false;
  videos.forEach((video, i) => {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.style.zIndex = i === 0 ? '1' : '2';
  });

  const canRun = () => visible && !document.hidden && !motion.matches;
  const play = video => video.play().catch(() => {});

  function tick() {
    frame = requestAnimationFrame(tick);
    const current = videos[active];
    const next = videos[1 - active];
    const fade = Math.min(1.2, current.duration * 0.22);
    if (current.readyState >= 2 && !current.paused) current.style.opacity = '1';

    if (Number.isFinite(fade) && fade > 0 && !overlapping && !preparing
      && current.currentTime > 0 && current.duration - current.currentTime <= fade) {
      preparing = true;
      next.currentTime = 0;
      next.style.opacity = '0';
      next.style.zIndex = '2';
      current.style.zIndex = '1';
      next.play().then(() => {
        overlapping = true;
        preparing = false;
        if (!canRun()) next.pause();
      }).catch(() => { preparing = false; });
    }

    if (overlapping) {
      // Mix over an opaque outgoing frame, avoiding a dark flash between loops.
      const progress = Math.min(1, next.currentTime / fade);
      next.style.opacity = String(progress * progress * (3 - 2 * progress));
      if (progress >= 1) {
        current.pause();
        current.style.opacity = '0';
        current.currentTime = 0;
        current.style.zIndex = '2';
        next.style.zIndex = '1';
        active = 1 - active;
        overlapping = false;
      }
    }
  }

  function sync() {
    if (canRun()) {
      play(videos[active]);
      if (overlapping) play(videos[1 - active]);
      if (!frame) frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      videos.forEach(video => video.pause());
    }
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(hero);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  sync();
})();
