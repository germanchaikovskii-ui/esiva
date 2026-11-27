(() => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isLimitedConnection = () => Boolean(connection && (
    connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType) ||
    (connection.downlink > 0 && connection.downlink < 1.5)
  ));

  if (!isLimitedConnection()) {
    for (const image of document.querySelectorAll('img[data-screen-full]')) {
      const { screenFull, screenWidth, screenLightWidth } = image.dataset;
      if (Number(screenWidth) > Number(screenLightWidth)) {
        image.srcset = `${image.getAttribute('src')} ${screenLightWidth}w, ${screenFull} ${screenWidth}w`;
      }
    }
  }

  const banner = document.querySelector('.day-film');
  if (!banner) return;

  const video = banner.querySelector('video');
  const sources = [...video.querySelectorAll('source[data-src]')];
  const control = banner.querySelector('button');
  const cues = [...banner.querySelectorAll('[data-start]')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const bounds = banner.getBoundingClientRect();
  let inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
  let current = cues[0];
  let loaded = false;
  let stalled = false;
  let userPaused = false;
  let userRequested = false;
  let pending;
  let stallTimer;

  video.defaultMuted = true;
  video.muted = true;
  video.playsInline = true;

  function setCaption(cue) {
    if (current === cue) return;
    current.hidden = true;
    cue.hidden = false;
    current = cue;
  }

  function updateControl() {
    control.textContent = video.paused ? (loaded ? 'Play video' : 'Load video') : 'Pause video';
  }

  function showPoster() {
    clearTimeout(stallTimer);
    loaded = false;
    video.pause();
    for (const source of sources) source.removeAttribute('src');
    video.load();
    banner.classList.remove('is-playing');
    setCaption(cues[0]);
    updateControl();
  }

  function watchForStall() {
    clearTimeout(stallTimer);
    if (!loaded || userPaused || !inView || document.hidden) return;
    stallTimer = setTimeout(() => {
      stalled = true;
      userRequested = false;
      showPoster();
    }, 8000);
  }

  function shouldPlay() {
    return inView && !document.hidden && !userPaused &&
      (userRequested || (!motion.matches && !stalled && !isLimitedConnection()));
  }

  function play() {
    if (pending || !video.paused || !shouldPlay()) return;
    if (!loaded) {
      for (const source of sources) source.src = source.dataset.src;
      loaded = true;
      video.load();
    }
    video.muted = true;
    watchForStall();
    pending = video.play().catch(error => {
      if (error.name === 'NotAllowedError') clearTimeout(stallTimer);
    }).finally(() => {
      pending = undefined;
      if (!shouldPlay()) video.pause();
      updateControl();
    });
  }

  function syncPlayback() {
    if (shouldPlay()) {
      play();
    } else {
      clearTimeout(stallTimer);
      video.pause();
    }
  }

  control.hidden = false;
  control.addEventListener('click', () => {
    userPaused = !video.paused;
    userRequested = !userPaused;
    syncPlayback();
  });

  video.addEventListener('playing', () => {
    clearTimeout(stallTimer);
    banner.classList.add('is-playing');
    updateControl();
  });
  video.addEventListener('pause', updateControl);
  video.addEventListener('waiting', watchForStall);
  video.addEventListener('timeupdate', () => {
    if (loaded) setCaption(cues.findLast(cue => Number(cue.dataset.start) <= video.currentTime) || cues[0]);
  });
  video.addEventListener('error', () => {
    if (!loaded) return;
    stalled = true;
    userRequested = false;
    showPoster();
  });
  sources.at(-1)?.addEventListener('error', () => {
    if (loaded && video.readyState === 0) watchForStall();
  });

  video.addEventListener('canplay', play);
  window.addEventListener('pageshow', syncPlayback);
  document.addEventListener('visibilitychange', syncPlayback);
  motion.addEventListener('change', syncPlayback);
  connection?.addEventListener?.('change', () => {
    if (isLimitedConnection() && loaded && !userRequested) showPoster();
    else syncPlayback();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }).observe(banner);
  }
  document.addEventListener('pointerdown', event => {
    if (!control.contains(event.target)) play();
  }, { passive: true });
  document.addEventListener('keydown', event => {
    if (!control.contains(event.target)) play();
  });

  updateControl();
  play();
})();
