(() => {
  'use strict';
  const root = document.querySelector('[data-configurator]');
  if (!root) return;
  const assets = '/assets/images/merch/';
  const names = {tee: 'T-shirt', joggers: 'Training pants', hoodie: 'Full-zip hoodie'};
  const brands = {emblem: 'Pink emblem', wordmark: 'White wordmark', mascot: 'ESIVA mascot'};
  const slogans = {
    app: 'My app made me do it.', track: 'I don’t guess. I track.',
    source: 'My body is a data source.', numbers: 'I sweat in numbers.',
    knows: 'My app knows too much.', data: 'I don’t sweat. I collect data.'
  };
  const defaults = {collection: 'women', garment: 'tee', brand: 'emblem', slogan: 'app', view: 'front', presentation: 'product'};
  const allowed = {collection: ['women', 'men'], garment: Object.keys(names), brand: Object.keys(brands), slogan: Object.keys(slogans), view: ['front', 'back'], presentation: ['product', 'model']};
  const state = {...defaults};
  const params = new URLSearchParams(location.search);
  Object.keys(defaults).forEach(key => {
    if (allowed[key].includes(params.get(key))) state[key] = params.get(key);
  });
  const preview = document.querySelector('.product-preview');
  const garment = document.querySelector('#garment-image');
  const print = document.querySelector('#print-image');
  const wordmark = document.querySelector('#print-wordmark');
  const viewControls = document.querySelector('#view-controls');
  const backOptions = document.querySelector('#back-options');
  const status = document.querySelector('#design-status');
  let revision = 0;

  function syncURL() {
    const url = new URL(location.href);
    Object.keys(state).forEach(key => url.searchParams.set(key, state[key]));
    history.replaceState(null, '', url);
    document.querySelector('#look-link').value = url.href;
  }

  function render(announce = true) {
    if (state.garment !== 'tee') state.view = 'front';
    root.querySelectorAll('input[type=radio]').forEach(input => {
      input.checked = state[input.name] === input.value;
    });
    root.querySelectorAll('[data-view]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
    });
    root.querySelectorAll('[data-presentation-option]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.presentationOption === state.presentation));
    });
    const back = state.view === 'back';
    const collection = state.collection === 'women' ? 'Women’s' : 'Men’s';
    const label = `${collection} black ${names[state.garment].toLowerCase()}`;
    preview.dataset.garment = state.garment;
    preview.dataset.view = state.view;
    preview.dataset.brand = state.brand;
    preview.dataset.collection = state.collection;
    preview.dataset.presentation = state.presentation;
    const file = `${state.presentation === 'model' ? 'model-' : ''}${state.collection}-${state.garment === 'tee' ? `tee-${state.view}` : state.garment}.webp`;
    const src = assets + file;
    const current = ++revision;
    if (garment.getAttribute('src') !== src) {
      preview.classList.add('is-loading');
      const next = new Image();
      next.onload = () => {
        if (current !== revision) return;
        garment.src = src;
        preview.classList.remove('is-loading');
      };
      next.onerror = () => {
        if (current !== revision) return;
        preview.classList.remove('is-loading');
        status.textContent = 'The preview could not load. Please refresh the page.';
      };
      next.src = src;
    } else {
      preview.classList.remove('is-loading');
    }
    print.hidden = !back && state.brand === 'wordmark';
    wordmark.hidden = back || state.brand !== 'wordmark';
    if (!print.hidden) print.src = back ? `${assets}slogan-${state.slogan}.webp` : state.brand === 'emblem' ? '/assets/images/brand/esiva-logo.jpg' : `${assets}mascot.webp`;
    document.querySelector('#product-name').textContent = names[state.garment];
    document.querySelector('#collection-label').textContent = `${collection} collection`;
    document.querySelector('#preview-view').textContent = state.presentation === 'model' ? (back ? '¾ view · Back' : '¾ view') : back ? 'Back print' : state.garment === 'joggers' ? 'Thigh detail' : 'Chest detail';
    preview.setAttribute('aria-label', `${label}${state.presentation === 'model' ? ' on a model' : ''}. ${back ? `Back slogan: ${slogans[state.slogan].replace(/\.$/, "")}` : `Front design: ${brands[state.brand]}`}. Design visualization.`);
    viewControls.hidden = state.garment !== 'tee';
    backOptions.hidden = state.garment !== 'tee';
    // Hidden form controls must not remain keyboard-focusable or change state.
    backOptions.disabled = state.garment !== 'tee';
    document.querySelector('#front-placement').textContent = state.garment === 'joggers' ? 'On the upper thigh' : 'On the left chest';
    document.querySelector('#design-summary').textContent = `${label} · ${brands[state.brand]}${state.garment === 'tee' ? ` · Back: “${slogans[state.slogan]}”` : ''}`;
    if (announce) status.textContent = `${label}${state.presentation === 'model' ? ' on a model' : ''}. ${back ? `Back: ${slogans[state.slogan]}` : brands[state.brand]}.`;
    syncURL();
  }

  // Re-selecting the active print also brings its side into view.
  root.addEventListener('click', event => {
    const input = event.target;
    if ((input.name === 'slogan' || input.name === 'brand') && input.value === state[input.name]) {
      state.view = input.name === 'slogan' ? 'back' : 'front';
      render();
    }
  });
  root.addEventListener('change', event => {
    const input = event.target;
    if (!allowed[input.name]?.includes(input.value)) return;
    state[input.name] = input.value;
    if (input.name === 'slogan') state.view = 'back';
    if (input.name === 'brand' || input.name === 'garment') state.view = 'front';
    render();
  });
  root.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    state.view = button.dataset.view;
    render();
  }));
  root.querySelectorAll('[data-presentation-option]').forEach(button => button.addEventListener('click', () => {
    state.presentation = button.dataset.presentationOption;
    render();
  }));
  document.querySelector('#reset-design').addEventListener('click', () => {
    Object.assign(state, defaults);
    render();
  });
  document.querySelector('#copy-design').addEventListener('click', async () => {
    const field = document.querySelector('#look-link');
    try {
      await navigator.clipboard.writeText(field.value);
      status.textContent = 'Design link copied. It reopens these exact choices.';
      document.querySelector('#copy-design').textContent = 'Link copied ✓';
      setTimeout(() => document.querySelector('#copy-design').textContent = 'Copy design link ↗', 2200);
    } catch {
      document.querySelector('#link-fallback').hidden = false;
      field.focus();
      field.select();
      status.textContent = 'Select and copy your design link below.';
    }
  });
  document.querySelectorAll('[data-slogan-pick]').forEach(button => button.addEventListener('click', () => {
    state.garment = 'tee';
    state.slogan = button.dataset.sloganPick;
    state.view = 'back';
    render();
    const target = root.querySelector(`input[name=slogan][value=${state.slogan}]`);
    target.focus({preventScroll: true});
    root.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  }));
  render(false);
})();
