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
  const defaults = {collection: 'women', garment: 'tee', brand: 'emblem', slogan: 'app', view: 'front', presentation: 'product', tee_brand: 'emblem', joggers_brand: 'emblem', hoodie_brand: 'emblem', include_tee: '1', include_joggers: '1', include_hoodie: '0'};
  const allowed = {collection: ['women', 'men'], garment: Object.keys(names), brand: Object.keys(brands), slogan: Object.keys(slogans), view: ['front', 'back'], presentation: ['product', 'model', 'outfit'], tee_brand: Object.keys(brands), joggers_brand: Object.keys(brands), hoodie_brand: Object.keys(brands), include_tee: ['0','1'], include_joggers: ['0','1'], include_hoodie: ['0','1']};
  const state = {...defaults};
  const params = new URLSearchParams(location.search);
  Object.keys(defaults).forEach(key => {
    if (allowed[key].includes(params.get(key))) state[key] = params.get(key);
  });
  // Read old single-item links without losing the newly independent item designs.
  if (!params.has(`${state.garment}_brand`)) state[`${state.garment}_brand`] = state.brand;
  state.brand = state[`${state.garment}_brand`];
  if (!params.has(`include_${state.garment}`)) state[`include_${state.garment}`] = '1';
  function editItem(item) {
    state.garment = item;
    state.brand = state[`${item}_brand`];
    state[`include_${item}`] = '1';
    state.view = 'front';
  }
  function showSide(side) {
    state.view = side;
    if (side === 'back' && state.presentation === 'outfit') state.presentation = 'model';
  }
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
    if (state.garment !== 'tee' || state.presentation === 'outfit') state.view = 'front';
    root.querySelectorAll('input[type=radio]').forEach(input => {
      input.checked = state[input.name] === input.value;
    });
    root.querySelectorAll('[data-view]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
    });
    root.querySelectorAll('[data-presentation-option]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.presentationOption === state.presentation));
    });
    const outfit = state.presentation === 'outfit';
    const outfitStyle = state.include_hoodie === '1' ? (state.include_tee === '1' ? 'open' : 'closed') : 'basic';
    preview.dataset.outfitStyle = outfitStyle;
    const selectedItems = Object.keys(names).filter(item => state[`include_${item}`] === '1');
    const outfitDescription = selectedItems.map(item => `${names[item]}: ${brands[state[`${item}_brand`]]}${item === 'tee' ? `; back: “${slogans[state.slogan]}”` : ''}`).join(' · ');
    root.querySelectorAll('[data-include-item]').forEach(input => {input.checked = state[`include_${input.dataset.includeItem}`] === '1';});
    root.querySelectorAll('[data-item-brand]').forEach(label => {label.textContent = brands[state[`${label.dataset.itemBrand}_brand`]];});
    document.querySelector('#outfit-summary').textContent = outfitDescription || 'Choose an item to start your outfit.';
    document.querySelector('#single-print').hidden = outfit;
    document.querySelector('#outfit-prints').hidden = !outfit;
    Object.keys(names).forEach(item => {
      const layer = document.querySelector(`[data-outfit-print=${item}]`);
      const brand = state[`${item}_brand`];
      layer.hidden = state[`include_${item}`] !== '1';
      layer.dataset.brand = brand;
      const image = layer.querySelector('img');
      image.hidden = brand === 'wordmark';
      layer.querySelector('span').hidden = brand !== 'wordmark';
      if (!image.hidden) image.src = brand === 'emblem' ? '/assets/images/brand/esiva-logo.jpg' : `${assets}mascot.webp`;
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
    const outfitFile = outfitStyle === 'basic' ? `model-${state.collection}-joggers.webp` : `outfit-${state.collection}-${outfitStyle}.webp`;
    const src = assets + (outfit ? outfitFile : file) + (outfit && outfitStyle !== 'basic' ? '?v=cordless-20261108' : '');
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
    document.querySelector('#preview-view').textContent = outfit ? 'Full outfit · ¾' : state.presentation === 'model' ? (back ? '¾ view · Back' : '¾ view') : back ? 'Back print' : state.garment === 'joggers' ? 'Thigh detail' : 'Chest detail';
    preview.setAttribute('aria-label', `${label}${state.presentation === 'model' ? ' on a model' : ''}. ${back ? `Back slogan: ${slogans[state.slogan].replace(/\.$/, "")}` : `Front design: ${brands[state.brand]}`}. Design visualization.`);
    if (outfit) preview.setAttribute('aria-label', `${collection} full-length outfit on a model. ${outfitDescription || 'No branded items selected'}. Design visualization.`);
    viewControls.hidden = state.garment !== 'tee' || outfit;
    backOptions.hidden = state.garment !== 'tee';
    // Hidden form controls must not remain keyboard-focusable or change state.
    backOptions.disabled = state.garment !== 'tee';
    document.querySelector('#front-placement').textContent = state.garment === 'joggers' ? 'On the upper thigh' : 'On the left chest';
    document.querySelector('#design-summary').textContent = `${label} · ${brands[state.brand]}${state.garment === 'tee' ? ` · Back: “${slogans[state.slogan]}”` : ''}`;
    if (outfit) document.querySelector('#design-summary').textContent = `${selectedItems.length} items in your outfit. Editing: ${names[state.garment]}.`;
    if (announce) status.textContent = `${label}${state.presentation === 'model' ? ' on a model' : ''}. ${back ? `Back: ${slogans[state.slogan]}` : brands[state.brand]}.`;
    if (announce && outfit) status.textContent = `Full outfit updated. ${outfitDescription || 'No items selected.'}`;
    syncURL();
  }

  // Re-selecting the active print also brings its side into view.
  root.addEventListener('click', event => {
    const input = event.target;
    if ((input.name === 'slogan' || input.name === 'brand') && input.value === state[input.name]) {
      showSide(input.name === 'slogan' ? 'back' : 'front');
      render();
    }
  });
  root.addEventListener('change', event => {
    const input = event.target;
    if (input.dataset.includeItem) {
      state[`include_${input.dataset.includeItem}`] = input.checked ? '1' : '0';
      render();
      return;
    }
    if (!allowed[input.name]?.includes(input.value)) return;
    if (input.name === 'garment') editItem(input.value);
    else state[input.name] = input.value;
    if (input.name === 'slogan') { state.include_tee = '1'; showSide('back'); }
    if (input.name === 'brand') {
      state[`${state.garment}_brand`] = input.value;
      state[`include_${state.garment}`] = '1';
      state.view = 'front';
    }
    render();
  });
  root.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    showSide(button.dataset.view);
    render();
  }));
  root.querySelectorAll('[data-presentation-option]').forEach(button => button.addEventListener('click', () => {
    state.presentation = button.dataset.presentationOption;
    render();
  }));
  document.querySelector('#preview-outfit').addEventListener('click', () => {
    state.presentation = 'outfit';
    render();
    root.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  });
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
    editItem('tee');
    state.slogan = button.dataset.sloganPick;
    showSide('back');
    render();
    const target = root.querySelector(`input[name=slogan][value=${state.slogan}]`);
    target.focus({preventScroll: true});
    root.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  }));
  render(false);
})();
