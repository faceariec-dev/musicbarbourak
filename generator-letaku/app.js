(() => {
  'use strict';

  const STORAGE_KEY = 'bourak-flyer-generator-v1';
  const RED = '#b6232a';
  const CREAM = '#f8ead1';
  const INK = '#201c1c';

  const templates = [
    { id: 'hazbin', name: 'Hazbin Hotel', enabled: true, colors: ['#f8ead1', '#b6232a', '#1b1718'], label: 'HAZBIN\nHOTEL' },
    { id: 'winter-rum', name: 'Winter Rum Rock', enabled: false, colors: ['#f4e8ce', '#c83d38', '#643a28'], label: 'WINTER\nRUM ROCK' },
    { id: 'retro', name: 'Retro Bourák', enabled: false, colors: ['#d65a2f', '#f3c877', '#15232b'], label: 'RETRO\nBOURÁK' },
    { id: 'halloween', name: 'Halloween', enabled: false, colors: ['#161015', '#ef7b27', '#622759'], label: 'HALLOWEEN' },
    { id: 'vanoce', name: 'Vánoce', enabled: false, colors: ['#173831', '#c12b32', '#e1bf73'], label: 'VÁNOCE' }
  ];

  const defaults = [
    { name: 'Verosika', price: '155 Kč', ingredients: 'mandlička, grep, pomerančová kůra' },
    { name: 'Asmodeus', price: '164 Kč', ingredients: 'modrý curaçao, legendario rosé, ananasový džus' },
    { name: 'Chazz', price: '180 Kč', ingredients: 'modrý curaçao, ananasový džus, tmavý rum' },
    { name: 'Vox', price: '159 Kč', ingredients: 'legendario rosé, grenadina, curaçao, limo' },
    { name: 'Baxter (Mocktail)', price: '130 Kč', ingredients: 'curaçao, sweet&sour, sprite' },
    { name: 'Angel Dust', price: '169 Kč', ingredients: 'bílý rum, malina, limeta, soda' },
    { name: 'Alastor', price: '175 Kč', ingredients: 'tmavý rum, třešeň, citrus, bitter' }
  ];

  const state = {
    template: 'hazbin',
    count: 5,
    drinks: defaults.map(x => ({ ...x })),
    zoom: 1
  };

  const els = {
    templateGrid: document.getElementById('templateGrid'),
    drinkFields: document.getElementById('drinkFields'),
    preview: document.getElementById('flyerPreview'),
    status: document.getElementById('statusText'),
    saveStatus: document.getElementById('saveStatus'),
    clearBtn: document.getElementById('clearBtn'),
    loadBtn: document.getElementById('loadBtn'),
    pdfBtn: document.getElementById('pdfBtn'),
    pngBtn: document.getElementById('pngBtn'),
    resetZoomBtn: document.getElementById('resetZoomBtn'),
    rowTemplate: document.getElementById('drinkRowTemplate')
  };

  function escapeXml(value = '') {
    return String(value).replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
  }

  function normalizePrice(value = '') {
    const v = String(value).trim();
    if (!v) return '';
    if (/kč/i.test(v)) return v.replace(/kč/i, 'Kč');
    if (/^\d+[\s,.]?\d*$/.test(v)) return `${v} Kč`;
    return v;
  }

  function wrapWords(text, maxChars) {
    const words = String(text || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [''];
    const lines = [];
    let line = '';
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (next.length <= maxChars || !line) line = next;
      else { lines.push(line); line = word; }
    }
    if (line) lines.push(line);
    return lines.slice(0, 3);
  }

  function textSpans(lines, x, y, lineHeight) {
    return lines.map((line, i) => `<tspan x="${x}" y="${y + i * lineHeight}">${escapeXml(line)}</tspan>`).join('');
  }

  function templateThumb(t) {
    const [a, b, c] = t.colors;
    return `
      <button type="button" class="template-card ${state.template === t.id ? 'active' : ''}" data-template="${t.id}" ${t.enabled ? '' : 'disabled'}>
        <span class="template-thumb" style="background:linear-gradient(145deg,${a} 0 38%,${b} 38% 68%,${c} 68%);color:${t.id === 'hazbin' ? b : '#fff'}">${escapeXml(t.label).replace(/\n/g, '<br>')}</span>
        <span class="template-name">${escapeXml(t.name)}</span>
        <span class="template-note">${t.enabled ? 'aktivní' : 'připravuje se'}</span>
      </button>`;
  }

  function renderTemplateGrid() {
    els.templateGrid.innerHTML = templates.map(templateThumb).join('');
    els.templateGrid.querySelectorAll('[data-template]:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        state.template = btn.dataset.template;
        renderTemplateGrid();
        renderPreview();
        persist();
      });
    });
  }

  function ensureDrinks() {
    while (state.drinks.length < 7) state.drinks.push({ name: '', price: '', ingredients: '' });
  }

  function renderFields() {
    ensureDrinks();
    els.drinkFields.innerHTML = '';
    for (let i = 0; i < state.count; i++) {
      const frag = els.rowTemplate.content.cloneNode(true);
      const row = frag.querySelector('.drink-row');
      row.dataset.index = i;
      frag.querySelector('.row-number').textContent = i + 1;
      frag.querySelector('.drink-name').value = state.drinks[i].name || '';
      frag.querySelector('.drink-price').value = state.drinks[i].price || '';
      frag.querySelector('.drink-ingredients').value = state.drinks[i].ingredients || '';
      els.drinkFields.appendChild(frag);
    }
    els.drinkFields.querySelectorAll('.drink-row').forEach(row => {
      const index = Number(row.dataset.index);
      const name = row.querySelector('.drink-name');
      const price = row.querySelector('.drink-price');
      const ingredients = row.querySelector('.drink-ingredients');
      const update = () => {
        state.drinks[index] = { name: name.value, price: price.value, ingredients: ingredients.value };
        renderPreview();
        persistDebounced();
      };
      name.addEventListener('input', update);
      price.addEventListener('input', update);
      price.addEventListener('blur', () => { price.value = normalizePrice(price.value); update(); });
      ingredients.addEventListener('input', update);
    });
  }

  function activeDrinks() {
    return state.drinks.slice(0, state.count);
  }

  function drinkLayout(count) {
    const startY = 585;
    const endY = 1700;
    const slot = (endY - startY) / count;
    const cfg = count === 7
      ? { nameSize: 45, priceSize: 35, ingSize: 24, ingLine: 30, maxChars: 42 }
      : count === 3
        ? { nameSize: 62, priceSize: 43, ingSize: 31, ingLine: 38, maxChars: 38 }
        : { nameSize: 54, priceSize: 39, ingSize: 28, ingLine: 34, maxChars: 40 };
    return { startY, endY, slot, ...cfg };
  }

  function renderDrinksSvg(drinks, count) {
    const cfg = drinkLayout(count);
    return drinks.map((d, i) => {
      const top = cfg.startY + i * cfg.slot;
      const nameY = top + cfg.slot * .25;
      const ingredientY = nameY + cfg.nameSize * .86;
      const lineY = top + cfg.slot - 18;
      const xName = 710;
      const xPrice = 1420;
      const name = escapeXml(d.name || `Koktejl ${i + 1}`);
      const price = escapeXml(normalizePrice(d.price));
      const lines = wrapWords(d.ingredients, cfg.maxChars);
      const bulletX = 720;
      const textX = 754;
      return `
        <g class="drink-item">
          <text x="${xName}" y="${nameY}" fill="${RED}" font-family="Georgia, 'Times New Roman', serif" font-size="${cfg.nameSize}" font-weight="700">${name}</text>
          <text x="${xPrice}" y="${nameY}" fill="${RED}" font-family="Georgia, 'Times New Roman', serif" font-size="${cfg.priceSize}" font-weight="700" text-anchor="end">${price}</text>
          <line x1="${Math.min(1270, xName + Math.max(235, (d.name || '').length * cfg.nameSize * .42))}" y1="${nameY - 9}" x2="${price ? 1320 : 1410}" y2="${nameY - 9}" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 18" />
          <circle cx="${bulletX}" cy="${ingredientY - 8}" r="7" fill="${RED}" />
          <text x="${textX}" y="${ingredientY}" fill="${INK}" font-family="Arial, Helvetica, sans-serif" font-size="${cfg.ingSize}" font-weight="500">${textSpans(lines, textX, ingredientY, cfg.ingLine)}</text>
          ${i < count - 1 ? `<line x1="700" y1="${lineY}" x2="1425" y2="${lineY}" stroke="${RED}" stroke-width="2" opacity=".62"/><path d="M1062 ${lineY-16} L1073 ${lineY} L1062 ${lineY+16} L1051 ${lineY} Z" fill="${RED}"/>` : ''}
        </g>`;
    }).join('');
  }

  function renderHazbinSvg() {
    const items = renderDrinksSvg(activeDrinks(), state.count);
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1540 2160" role="img" aria-label="Náhled koktejlového letáku Hazbin Hotel">
        <defs>
          <filter id="paperNoise" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="7" result="noise"/>
            <feColorMatrix in="noise" type="saturate" values="0" result="mono"/>
            <feComponentTransfer in="mono" result="faint"><feFuncA type="table" tableValues="0 .055"/></feComponentTransfer>
            <feBlend in="SourceGraphic" in2="faint" mode="multiply"/>
          </filter>
          <linearGradient id="redPanel" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#d13335"/><stop offset="1" stop-color="#8a171d"/></linearGradient>
        </defs>
        <rect width="1540" height="2160" fill="${CREAM}"/>
        <g filter="url(#paperNoise)"><rect x="0" y="0" width="1540" height="2160" fill="${CREAM}"/></g>
        <rect x="62" y="62" width="1416" height="2036" rx="3" fill="none" stroke="${RED}" stroke-width="3"/>
        <g fill="${RED}">
          <path d="M62 62 l22 11 l-22 11 l-11 22 l-11-22 l-22-11 l22-11 l11-22 z"/>
          <path d="M1478 62 l22 11 l-22 11 l-11 22 l-11-22 l-22-11 l22-11 l11-22 z"/>
          <path d="M62 2098 l22 11 l-22 11 l-11 22 l-11-22 l-22-11 l22-11 l11-22 z"/>
          <path d="M1478 2098 l22 11 l-22 11 l-11 22 l-11-22 l-22-11 l22-11 l11-22 z"/>
        </g>

        <text x="770" y="360" text-anchor="middle" fill="${RED}" font-family="Georgia, 'Times New Roman', serif" font-size="220" font-weight="700" letter-spacing="-8">KOKTEJLY</text>
        <path d="M240 400 Q770 500 1300 400" fill="none" stroke="${RED}" stroke-width="12" stroke-linecap="round"/>

        <polygon points="86,470 510,610 445,1840 80,1910" fill="url(#redPanel)"/>
        <polygon points="105,820 555,650 480,1160 140,1300" fill="#9c171e" opacity=".88"/>
        <polygon points="150,1510 550,1220 480,1820 120,1940" fill="#a91d24" opacity=".88"/>

        <g transform="translate(235 555)">
          <path d="M125 0 L205 80 L175 205 L70 205 L35 78 Z" fill="#efe3c4" stroke="#1d1c1e" stroke-width="10"/>
          <path d="M42 75 L2 15 L65 43 Z M186 76 L230 8 L175 45 Z" fill="#1b1a1d"/>
          <ellipse cx="82" cy="100" rx="35" ry="47" fill="#fff3b9" stroke="#1c1b1d" stroke-width="8"/>
          <ellipse cx="153" cy="100" rx="35" ry="47" fill="#fff3b9" stroke="#1c1b1d" stroke-width="8"/>
          <circle cx="92" cy="105" r="10" fill="#c9262e"/><circle cx="143" cy="105" r="10" fill="#c9262e"/>
          <path d="M73 152 Q120 195 168 150 Q120 220 73 152" fill="#fff" stroke="#1d1c1e" stroke-width="8"/>
          <path d="M107 205 L107 250 L140 250 L140 205" fill="#f1e4c6" stroke="#1d1c1e" stroke-width="8"/>
          <path d="M20 244 L115 215 L220 247 L205 565 L38 565 Z" fill="#cb262e" stroke="#1d1c1e" stroke-width="12"/>
          <path d="M110 255 L75 320 L116 358 L155 319 L120 255 Z" fill="#1d1c1e"/>
          <path d="M116 358 L95 575 L140 575 Z" fill="#f3e4c8"/>
          <path d="M35 280 L-20 400 L27 420 L75 320 Z" fill="#cf2931" stroke="#1d1c1e" stroke-width="10"/>
          <path d="M210 280 L300 382 L267 420 L155 319 Z" fill="#cf2931" stroke="#1d1c1e" stroke-width="10"/>
          <path d="M55 560 L85 995 L120 995 L126 575 Z" fill="#bd2028" stroke="#1d1c1e" stroke-width="11"/>
          <path d="M130 575 L146 995 L180 995 L190 560 Z" fill="#bd2028" stroke="#1d1c1e" stroke-width="11"/>
          <path d="M80 994 L118 994 L98 1055 L48 1055 Z M145 994 L180 994 L210 1053 L159 1053 Z" fill="#f6e7c9" stroke="#1d1c1e" stroke-width="10"/>
          <path d="M22 410 L-16 425 L-5 442 L30 427 Z" fill="#f4e5c8" stroke="#1d1c1e" stroke-width="8"/>
          <path d="M297 385 L360 340 L373 361 L312 416 Z" fill="#f4e5c8" stroke="#1d1c1e" stroke-width="8"/>
        </g>

        <g fill="#f6c975" opacity=".95">
          <path d="M180 690 l11 28 l28 11 l-28 11 l-11 28 l-11-28 l-28-11 l28-11 z"/>
          <path d="M500 750 l9 23 l23 9 l-23 9 l-9 23 l-9-23 l-23-9 l23-9 z"/>
          <path d="M180 1440 l11 28 l28 11 l-28 11 l-11 28 l-11-28 l-28-11 l28-11 z"/>
          <path d="M475 1690 l11 28 l28 11 l-28 11 l-11 28 l-11-28 l-28-11 l28-11 z"/>
        </g>

        ${items}

        <g transform="translate(650 1815)">
          <text x="0" y="45" fill="#1f2022" font-family="Georgia, serif" font-size="31" font-style="italic" font-weight="700">Music Bar</text>
          <text x="0" y="105" fill="#1f2022" font-family="Arial Black, Arial, sans-serif" font-size="60" font-style="italic" font-weight="900">Bourák</text>
          <text x="0" y="153" fill="#2d2b2a" font-family="Arial, sans-serif" font-size="25">Ke Kateřinkám 1411/17</text>
          <text x="0" y="187" fill="#2d2b2a" font-family="Arial, sans-serif" font-size="25">149 00 Praha 11–Chodov</text>
          <text x="0" y="236" fill="#2d2b2a" font-family="Arial, sans-serif" font-size="23">● /musicbarbourak</text>
          <text x="0" y="269" fill="#2d2b2a" font-family="Arial, sans-serif" font-size="23">◎ @music_bar_bourak</text>
        </g>

        <g transform="translate(1120 1805)">
          <path d="M0 40 L42 0 L245 0 L285 40 L270 165 L20 165 Z" fill="#1d1a1e" stroke="#e92842" stroke-width="15"/>
          <text x="142" y="78" text-anchor="middle" fill="#fff" font-family="Georgia, serif" font-size="50" letter-spacing="5">HAZBIN</text>
          <text x="142" y="135" text-anchor="middle" fill="#fff" font-family="Georgia, serif" font-size="43" letter-spacing="8">HOTEL</text>
          <circle cx="142" cy="104" r="12" fill="#e72c42"/>
        </g>
        <text x="1225" y="2040" text-anchor="middle" fill="${RED}" font-family="Georgia, serif" font-size="34" font-style="italic" font-weight="700" transform="rotate(-8 1225 2040)">Dobré drinky, pekelné zážitky!</text>
      </svg>`;
  }

  function renderPreview() {
    els.preview.innerHTML = renderHazbinSvg();
    els.preview.style.transform = `scale(${state.zoom})`;
    els.status.textContent = `${templates.find(t => t.id === state.template)?.name || 'Šablona'} · ${state.count} položek`;
  }

  function setCount(count) {
    state.count = count;
    document.querySelectorAll('[data-count]').forEach(btn => btn.classList.toggle('active', Number(btn.dataset.count) === count));
    renderFields();
    renderPreview();
    persist();
  }

  let persistTimer;
  function persistDebounced() {
    clearTimeout(persistTimer);
    els.saveStatus.textContent = 'Ukládám…';
    persistTimer = setTimeout(persist, 220);
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ template: state.template, count: state.count, drinks: state.drinks }));
      els.saveStatus.textContent = 'Automaticky uloženo';
    } catch (e) {
      els.saveStatus.textContent = 'Uložení není dostupné';
    }
  }

  function loadSaved(showMessage = true) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved) { if (showMessage) toast('Zatím tu není žádná uložená verze.'); return; }
      state.template = saved.template || 'hazbin';
      state.count = [3,5,7].includes(Number(saved.count)) ? Number(saved.count) : 5;
      state.drinks = Array.isArray(saved.drinks) ? saved.drinks.slice(0, 7).map(d => ({ name: d.name || '', price: d.price || '', ingredients: d.ingredients || '' })) : defaults.map(x => ({ ...x }));
      ensureDrinks();
      renderTemplateGrid();
      document.querySelectorAll('[data-count]').forEach(btn => btn.classList.toggle('active', Number(btn.dataset.count) === state.count));
      renderFields();
      renderPreview();
      if (showMessage) toast('Poslední uložená verze byla načtena.');
    } catch (e) {
      if (showMessage) toast('Uložená data se nepodařilo načíst.');
    }
  }

  function clearAll() {
    state.drinks = Array.from({ length: 7 }, () => ({ name: '', price: '', ingredients: '' }));
    renderFields();
    renderPreview();
    persist();
    toast('Pole jsou prázdná.');
  }

  function toast(message) {
    document.querySelector('.toast')?.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  async function svgToCanvas(scale = 1) {
    await (document.fonts?.ready || Promise.resolve());
    const svg = renderHazbinSvg();
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    try {
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(1819 * scale);
      canvas.height = Math.round(2551 * scale);
      const ctx = canvas.getContext('2d', { alpha: false });
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  async function exportPng() {
    toggleBusy(els.pngBtn, true, 'Připravuji…');
    try {
      const canvas = await svgToCanvas(1);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      downloadBlob(blob, `bourak-hazbin-koktejly-${state.count}.png`);
      toast('PNG náhled je připraven.');
    } catch (e) {
      console.error(e);
      toast('PNG se nepodařilo vytvořit.');
    } finally {
      toggleBusy(els.pngBtn, false, 'PNG náhled');
    }
  }

  async function exportPdf() {
    if (!window.jspdf?.jsPDF) {
      toast('PDF knihovna se nenačetla. Zkontroluj připojení k internetu.');
      return;
    }
    toggleBusy(els.pdfBtn, true, 'Generuji PDF…');
    try {
      const canvas = await svgToCanvas(1);
      const jpeg = canvas.toDataURL('image/jpeg', .95);
      const { jsPDF } = window.jspdf;
      // 168 × 230 mm = A5 + 3mm spadávka + prostor na ořezové značky.
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [168, 230], compress: true });
      pdf.addImage(jpeg, 'JPEG', 7, 7, 154, 216, undefined, 'FAST');

      // A5 TrimBox leží 3 mm uvnitř 154 × 216 mm artworku.
      const left = 10, top = 10, right = 158, bottom = 220;
      const markOuter = 3.4, markInnerGap = 1.2;
      pdf.setDrawColor(20, 20, 20);
      pdf.setLineWidth(.18);
      const hMark = (x, y, dir) => pdf.line(x + dir * markInnerGap, y, x + dir * markOuter, y);
      const vMark = (x, y, dir) => pdf.line(x, y + dir * markInnerGap, x, y + dir * markOuter);
      hMark(left, top, -1); vMark(left, top, -1);
      hMark(right, top, 1); vMark(right, top, -1);
      hMark(left, bottom, -1); vMark(left, bottom, 1);
      hMark(right, bottom, 1); vMark(right, bottom, 1);

      pdf.setProperties({
        title: `Music Bar Bourák – Hazbin Hotel – ${state.count} koktejlů`,
        subject: 'A5 koktejlové menu',
        author: 'Music Bar Bourák',
        creator: 'Bourák Generátor letáků'
      });
      pdf.save(`Bourak_Hazbin_Koktejly_A5_${state.count}_PRINT.pdf`);
      persist();
      toast('Tiskové PDF bylo vygenerováno.');
    } catch (e) {
      console.error(e);
      toast('PDF se nepodařilo vytvořit.');
    } finally {
      toggleBusy(els.pdfBtn, false, 'Vygenerovat PDF (tiskové)');
    }
  }

  function toggleBusy(button, busy, label) {
    button.disabled = busy;
    button.textContent = label;
  }

  function bindUi() {
    document.querySelectorAll('[data-count]').forEach(btn => btn.addEventListener('click', () => setCount(Number(btn.dataset.count))));
    els.clearBtn.addEventListener('click', () => { if (confirm('Opravdu vymazat všechny položky?')) clearAll(); });
    els.loadBtn.addEventListener('click', () => loadSaved(true));
    els.pdfBtn.addEventListener('click', exportPdf);
    els.pngBtn.addEventListener('click', exportPng);
    els.resetZoomBtn.addEventListener('click', () => {
      state.zoom = state.zoom === 1 ? .85 : 1;
      els.resetZoomBtn.textContent = state.zoom === 1 ? '100 %' : '85 %';
      renderPreview();
    });
  }

  renderTemplateGrid();
  bindUi();
  loadSaved(false);
  renderFields();
  renderPreview();
})();
