/**
 * course-nav.js — Panel lateral de navegación entre clases y diapositivas
 * Pensamiento Lógico Preuniversitario · Carrera de Psicología · UMSA
 *
 * Para habilitar una nueva clase al publicarla, cambiar `ready: false` a `ready: true`.
 */
(function () {
  const COURSE_CLASSES = [
    { num: '01', file: 'clase-01.html', title: 'Argumentación y primeras herramientas', ready: true },
    { num: '02', file: 'clase-02.html', title: 'Demostración, refutación y tablas de verdad', ready: true },
    { num: '03', file: 'clase-03.html', title: 'Inducción y analogía', ready: true },
    { num: '04', file: 'clase-04.html', title: 'Deducción y reglas de inferencia', ready: false },
    { num: '05', file: 'clase-05.html', title: 'Argumentaciones múltiples', ready: false },
    { num: '06', file: 'clase-06.html', title: 'Silogismos categóricos', ready: false },
    { num: '07', file: 'clase-07.html', title: 'Errores en la argumentación (Falacias)', ready: false },
    { num: '08', file: 'clase-08.html', title: 'Repaso general y construcción de argumentos', ready: false },
    { num: '09', file: 'clase-09.html', title: 'Consolidación y práctica integradora', ready: false }
  ];

  // Detectar archivo actual (compatible con URLs con o sin .html)
  const pathParts = window.location.pathname.split('/');
  const currentFile = (pathParts[pathParts.length - 1] || '').toLowerCase();

  // Inyectar estilos encapsulados sincronizados con las variables CSS del curso
  const style = document.createElement('style');
  style.textContent = `
    #top-left-bar {
      position: fixed;
      top: 12px;
      left: 18px;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    #top-left-bar #slide-label {
      position: static !important;
      transform: none !important;
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: .08em;
    }
    #nav-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 40px;
      padding: 0 14px;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--bg-card);
      color: var(--text-primary);
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, color .2s ease;
    }
    #nav-toggle-btn:hover {
      border-color: var(--border-accent);
      color: var(--brand-accent);
      box-shadow: var(--shadow-md);
      transform: translateY(-1px);
    }
    #nav-toggle-btn svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    #course-nav-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 1998;
      opacity: 0;
      pointer-events: none;
      transition: opacity .25s ease;
    }
    #course-nav-backdrop.open {
      opacity: 1;
      pointer-events: all;
    }

    #course-nav-drawer {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: min(370px, 90vw);
      background: var(--bg-surface);
      color: var(--text-primary);
      border-right: 1px solid var(--border);
      box-shadow: var(--shadow-md);
      z-index: 1999;
      display: flex;
      flex-direction: column;
      transform: translateX(-104%);
      transition: transform .28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #course-nav-drawer.open {
      transform: translateX(0);
    }

    .cnav-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px;
      border-bottom: 1px solid var(--border);
      background: var(--bg-card);
    }
    .cnav-brand-title {
      font-family: var(--font-serif, 'EB Garamond', Georgia, serif);
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.15;
      color: var(--text-primary);
    }
    .cnav-brand-sub {
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .cnav-close {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1px solid var(--border);
      background: var(--bg-subtle);
      color: var(--text-muted);
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .2s ease;
    }
    .cnav-close:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
      border-color: var(--border-accent);
    }

    .cnav-body {
      flex: 1;
      overflow-y: auto;
      padding: 14px 16px 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .cnav-home-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 13px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--bg-card);
      color: var(--text-primary);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all .2s ease;
    }
    .cnav-home-link:hover {
      border-color: var(--border-accent);
      background: var(--bg-hover);
      color: var(--brand-accent);
    }

    .cnav-sec-title {
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin-bottom: 8px;
      padding-left: 2px;
    }

    .cnav-class-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .cnav-class-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 11px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--bg-card);
      text-decoration: none;
      color: var(--text-primary);
      transition: all .18s ease;
    }
    a.cnav-class-item:hover {
      border-color: var(--border-accent);
      background: var(--bg-hover);
      transform: translateX(2px);
    }
    .cnav-class-item.is-current {
      border-color: var(--brand-accent);
      background: var(--brand-light);
    }
    .cnav-class-item.is-disabled {
      opacity: 0.52;
      cursor: default;
      background: var(--bg-subtle);
    }
    .cnav-num {
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 3px 7px;
      border-radius: 6px;
      background: var(--bg-subtle);
      color: var(--accent);
      flex-shrink: 0;
    }
    .cnav-class-item.is-current .cnav-num {
      background: var(--brand-primary);
      color: #ffffff;
    }
    .cnav-title {
      font-size: 0.88rem;
      font-weight: 500;
      line-height: 1.3;
      flex: 1;
    }
    .cnav-tag {
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 0.66rem;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 999px;
      flex-shrink: 0;
    }
    .cnav-tag.tag-cur {
      background: var(--brand-primary);
      color: #ffffff;
    }
    .cnav-tag.tag-ok {
      background: rgba(4, 120, 87, 0.14);
      color: var(--green);
    }
    .cnav-tag.tag-soon {
      background: var(--bg-hover);
      color: var(--text-muted);
    }

    .cnav-slide-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .cnav-slide-btn {
      display: flex;
      align-items: baseline;
      gap: 9px;
      width: 100%;
      text-align: left;
      padding: 7px 10px;
      border-radius: 8px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-secondary);
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.85rem;
      line-height: 1.35;
      cursor: pointer;
      transition: all .15s ease;
    }
    .cnav-slide-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }
    .cnav-slide-btn.is-active {
      background: var(--brand-light);
      border-color: var(--border-accent);
      color: var(--brand-primary);
      font-weight: 600;
    }
    .cnav-slide-idx {
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--text-muted);
      min-width: 22px;
      flex-shrink: 0;
    }
    .cnav-slide-btn.is-active .cnav-slide-idx {
      color: var(--brand-primary);
    }

    @media (max-width: 960px) {
      #section-label { display: none; }
    }

    /* Selector numérico editable en la barra inferior */
    #cnav-counter-box {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      padding: 0 4px;
    }
    #cnav-jump-input {
      width: 38px;
      height: 26px;
      text-align: center;
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 13px;
      font-weight: 700;
      color: var(--text-primary);
      background: var(--bg-subtle);
      border: 1px solid var(--border);
      border-radius: 6px;
      outline: none;
      transition: border-color .2s, background .2s;
      -moz-appearance: textfield;
    }
    #cnav-jump-input::-webkit-outer-spin-button,
    #cnav-jump-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    #cnav-jump-input:hover,
    #cnav-jump-input:focus {
      border-color: var(--brand-accent);
      background: var(--bg-card);
    }

    /* Selección interactiva y corrección de opciones en ejercicios */
    .ex-opt-item {
      cursor: pointer;
      user-select: none;
    }
    .ex-inciso-pane:not(.ex-sol-open) .ex-opt-item:hover {
      background: var(--bg-hover);
      border-color: var(--border-accent);
    }
    .ex-inciso-pane.ex-sol-open .ex-opt-item {
      cursor: default;
    }
    .ex-opt-item:focus-visible {
      outline: 2px solid var(--brand-accent);
      outline-offset: 2px;
    }
    .ex-opt-item.selected:not(.revealed-wrong):not(.revealed-correct) {
      background: var(--brand-light);
      border-color: var(--brand-accent);
      box-shadow: inset 3px 0 0 var(--brand-accent);
      color: var(--text-primary);
      font-weight: 500;
    }
    .ex-opt-item.selected:not(.revealed-wrong):not(.revealed-correct)::after {
      content: 'Marcada';
      margin-left: auto;
      padding-left: 0.65rem;
      flex-shrink: 0;
      white-space: nowrap;
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--brand-accent);
    }
    .ex-opt-item.revealed-correct {
      background: rgba(4, 120, 87, 0.13);
      border-color: var(--green);
      box-shadow: inset 3px 0 0 var(--green);
      color: var(--text-primary);
      font-weight: 500;
    }
    [data-theme="dark"] .ex-opt-item.revealed-correct {
      background: rgba(52, 211, 153, 0.18);
    }
    .ex-opt-item.revealed-correct .ex-opt-letter {
      color: var(--green);
    }
    .ex-opt-item.revealed-correct::after {
      content: '✓ Correcta';
      margin-left: auto;
      padding-left: 0.65rem;
      flex-shrink: 0;
      white-space: nowrap;
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--green);
    }
    .ex-opt-item.selected.revealed-correct::after {
      content: '✓ Tu elección';
    }
    .ex-opt-item.revealed-wrong {
      background: rgba(220, 38, 38, 0.14);
      border-color: var(--red, #dc2626);
      box-shadow: inset 3px 0 0 var(--red, #dc2626);
      color: var(--text-primary);
      font-weight: 500;
    }
    [data-theme="dark"] .ex-opt-item.revealed-wrong {
      background: rgba(248, 113, 113, 0.20);
    }
    .ex-opt-item.revealed-wrong .ex-opt-letter {
      color: var(--red, #dc2626);
    }
    .ex-opt-item.revealed-wrong::after {
      content: '✗ Tu elección';
      margin-left: auto;
      padding-left: 0.65rem;
      flex-shrink: 0;
      white-space: nowrap;
      font-family: var(--font-mono, 'Roboto Mono', monospace);
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--red, #dc2626);
    }
  `;
  document.head.appendChild(style);

  // Construir barra superior izquierda y ubicar el botón junto a #slide-label
  const topLeft = document.createElement('div');
  topLeft.id = 'top-left-bar';

  const btn = document.createElement('button');
  btn.id = 'nav-toggle-btn';
  btn.type = 'button';
  btn.title = 'Abrir panel de clases y diapositivas (M)';
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.setAttribute('aria-controls', 'course-nav-drawer');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
    <span>Clases</span>
  `;
  topLeft.appendChild(btn);

  const existingSlideLabel = document.getElementById('slide-label');
  if (existingSlideLabel) {
    topLeft.appendChild(existingSlideLabel);
  }
  document.body.appendChild(topLeft);

  // Construir backdrop y panel lateral
  const backdrop = document.createElement('div');
  backdrop.id = 'course-nav-backdrop';

  const drawer = document.createElement('aside');
  drawer.id = 'course-nav-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Navegación entre clases y diapositivas');

  // Lista de clases
  const classListHtml = COURSE_CLASSES.map(c => {
    const isCurrent = currentFile === c.file || currentFile === c.file.replace('.html', '');
    if (c.ready) {
      const tag = isCurrent
        ? '<span class="cnav-tag tag-cur">Actual</span>'
        : '<span class="cnav-tag tag-ok">Ir</span>';
      return `
        <a href="${c.file}" class="cnav-class-item${isCurrent ? ' is-current' : ''}">
          <span class="cnav-num">${c.num}</span>
          <span class="cnav-title">${c.title}</span>
          ${tag}
        </a>`;
    }
    return `
      <div class="cnav-class-item is-disabled" aria-disabled="true">
        <span class="cnav-num">${c.num}</span>
        <span class="cnav-title">${c.title}</span>
        <span class="cnav-tag tag-soon">Pronto</span>
      </div>`;
  }).join('');

  // Lista dinámica de diapositivas de la clase actual
  const slideEls = Array.from(document.querySelectorAll('#presentation > .slide'));
  const slideListHtml = slideEls.map((el, idx) => {
    const titleEl = el.querySelector('.slide-title, .cover-title');
    let label = titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : `Diapositiva ${idx + 1}`;
    if (idx === 0) label = `${label} · Portada`;
    return `
      <button type="button" class="cnav-slide-btn" data-slide-idx="${idx}">
        <span class="cnav-slide-idx">${String(idx + 1).padStart(2, '0')}</span>
        <span>${label}</span>
      </button>`;
  }).join('');

  drawer.innerHTML = `
    <div class="cnav-header">
      <div>
        <div class="cnav-brand-title">Pensamiento Lógico</div>
        <div class="cnav-brand-sub">UMSA · Navegación del curso</div>
      </div>
      <button type="button" class="cnav-close" id="cnav-close-btn" title="Cerrar panel (Esc)" aria-label="Cerrar panel">✕</button>
    </div>
    <div class="cnav-body">
      <a href="index.html" class="cnav-home-link">
        <span>⌂ &nbsp;Portal e Índice del Curso</span>
        <span style="color:var(--text-muted); font-size:0.8rem;">→</span>
      </a>

      <div>
        <div class="cnav-sec-title">Saltar a otra clase</div>
        <div class="cnav-class-list">
          ${classListHtml}
        </div>
      </div>

      <div>
        <div class="cnav-sec-title">Diapositivas de esta clase (${slideEls.length})</div>
        <div class="cnav-slide-list" id="cnav-slide-list">
          ${slideListHtml}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  const closeBtn = document.getElementById('cnav-close-btn');
  const slideBtns = Array.from(drawer.querySelectorAll('.cnav-slide-btn'));

  // Clave persistente por clase para recordar la última diapositiva visitada
  const canonicalFile = currentFile.endsWith('.html') ? currentFile : `${currentFile}.html`;
  const SLIDE_STORAGE_KEY = `plp-slide:${canonicalFile || 'default'}`;

  // Selector numérico editable en #controls (mantiene #counter oculto para no romper updateUI)
  let jumpInput = null;
  const legacyCounter = document.getElementById('counter');
  if (legacyCounter && legacyCounter.parentElement && slideEls.length > 0) {
    legacyCounter.style.display = 'none';
    const box = document.createElement('span');
    box.id = 'cnav-counter-box';
    box.innerHTML = `<input id="cnav-jump-input" type="number" min="1" max="${slideEls.length}" value="1" aria-label="Número de diapositiva" title="Escribe un número (1–${slideEls.length}) y pulsa Enter para saltar"> <span>/ ${slideEls.length}</span>`;
    legacyCounter.parentElement.insertBefore(box, legacyCounter.nextSibling);
    jumpInput = document.getElementById('cnav-jump-input');
  }

  function getActiveIndex() {
    const idx = slideEls.findIndex(s => s.classList.contains('active'));
    return idx >= 0 ? idx : 0;
  }

  function syncActiveSlide(persist = true) {
    const activeIdx = getActiveIndex();
    slideBtns.forEach((b, i) => {
      b.classList.toggle('is-active', i === activeIdx);
    });
    if (jumpInput && document.activeElement !== jumpInput) {
      jumpInput.value = String(activeIdx + 1);
    }
    if (persist) {
      try {
        localStorage.setItem(SLIDE_STORAGE_KEY, String(activeIdx));
        history.replaceState(null, '', `#slide=${activeIdx + 1}`);
      } catch (_) {}
    }
  }

  function commitJumpInput() {
    if (!jumpInput) return;
    const raw = parseInt(jumpInput.value, 10);
    if (!Number.isNaN(raw) && slideEls.length > 0) {
      const clamped = Math.max(1, Math.min(slideEls.length, raw));
      if (typeof window.goTo === 'function') {
        window.goTo(clamped - 1);
      }
      jumpInput.value = String(clamped);
    } else {
      jumpInput.value = String(getActiveIndex() + 1);
    }
  }

  if (jumpInput) {
    jumpInput.addEventListener('focus', () => jumpInput.select());
    jumpInput.addEventListener('change', commitJumpInput);
    jumpInput.addEventListener('blur', commitJumpInput);
  }

  function openDrawer() {
    syncActiveSlide(false);
    drawer.classList.add('open');
    backdrop.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    const activeBtn = drawer.querySelector('.cnav-slide-btn.is-active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ block: 'nearest' });
    }
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) closeDrawer();
    else openDrawer();
  });
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Saltar a una diapositiva dentro de la clase actual
  slideBtns.forEach(sb => {
    sb.addEventListener('click', () => {
      const idx = parseInt(sb.getAttribute('data-slide-idx'), 10);
      if (typeof window.goTo === 'function') {
        window.goTo(idx);
      }
      closeDrawer();
    });
  });

  // Tecla M para abrir/cerrar, Esc para cerrar, y proteger el input numérico y el panel abierto
  document.addEventListener('keydown', e => {
    if (jumpInput && document.activeElement === jumpInput) {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopImmediatePropagation();
        commitJumpInput();
        jumpInput.blur();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        jumpInput.value = String(getActiveIndex() + 1);
        jumpInput.blur();
        return;
      }
      if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', ' ', 'Home', 'End'].includes(e.key)) {
        e.stopImmediatePropagation();
        return;
      }
    }

    const isOpen = drawer.classList.contains('open');
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeDrawer();
      return;
    }
    if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const tag = (e.target && e.target.tagName) || '';
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        if (isOpen) closeDrawer();
        else openDrawer();
        return;
      }
    }
    if (isOpen && ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', ' ', 'Home', 'End'].includes(e.key)) {
      e.stopImmediatePropagation();
    }
  }, true);

  // Observar cambios en la diapositiva activa para sincronizar contador y guardar posición
  const pres = document.getElementById('presentation');
  if (pres && typeof MutationObserver !== 'undefined') {
    const obs = new MutationObserver(() => syncActiveSlide(true));
    obs.observe(pres, { attributes: true, attributeFilter: ['class'], subtree: true });
  }

  // Restaurar diapositiva desde hash (#slide=N) o desde localStorage
  let initialIdx = null;
  const hashMatch = window.location.hash.match(/^#slide=(\d+)$/);
  if (hashMatch) {
    const n = parseInt(hashMatch[1], 10);
    if (n >= 1 && n <= slideEls.length) initialIdx = n - 1;
  } else {
    try {
      const saved = parseInt(localStorage.getItem(SLIDE_STORAGE_KEY), 10);
      if (!Number.isNaN(saved) && saved >= 0 && saved < slideEls.length) {
        initialIdx = saved;
      }
    } catch (_) {}
  }

  if (initialIdx !== null && initialIdx !== getActiveIndex() && typeof window.goTo === 'function') {
    window.goTo(initialIdx);
  }
  syncActiveSlide(true);

  // Marcar respuesta en ejercicios antes de ver la solución y señalar acierto/error al revelarla
  const exOpts = document.querySelectorAll('.ex-inciso-pane .ex-opt-item');
  if (exOpts.length > 0) {
    exOpts.forEach(opt => {
      opt.setAttribute('role', 'button');
      opt.setAttribute('tabindex', '0');
      opt.setAttribute('aria-pressed', 'false');
    });

    function toggleOptionChoice(opt) {
      const pane = opt.closest('.ex-inciso-pane');
      if (!pane || pane.classList.contains('ex-sol-open')) return;
      const wasSelected = opt.classList.contains('selected');
      pane.querySelectorAll('.ex-opt-item').forEach(el => {
        el.classList.remove('selected');
        el.setAttribute('aria-pressed', 'false');
      });
      if (!wasSelected) {
        opt.classList.add('selected');
        opt.setAttribute('aria-pressed', 'true');
      }
    }

    document.addEventListener('click', e => {
      const opt = e.target && e.target.closest('.ex-inciso-pane .ex-opt-item');
      if (opt) toggleOptionChoice(opt);
    });

    document.addEventListener('keydown', e => {
      const opt = e.target && e.target.closest && e.target.closest('.ex-inciso-pane .ex-opt-item');
      if (!opt) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopImmediatePropagation();
        toggleOptionChoice(opt);
      }
    }, true);

    window.toggleExSol = function (exNum, letter) {
      const card = document.getElementById(`sol-e${exNum}-${letter}`);
      const btnLbl = document.getElementById(`btn-lbl-e${exNum}-${letter}`);
      const pane = document.getElementById(`pane-e${exNum}-${letter}`);
      if (!card) return;

      const isShown = card.classList.contains('shown');
      if (isShown) {
        card.classList.remove('shown');
        if (btnLbl) btnLbl.textContent = 'Mostrar solución razonada';
        if (pane) {
          pane.classList.remove('ex-sol-open');
          pane.querySelectorAll('.ex-opt-item').forEach(el => {
            el.classList.remove('revealed-correct', 'revealed-wrong');
          });
        }
      } else {
        card.classList.add('shown');
        if (btnLbl) btnLbl.textContent = 'Ocultar solución';
        if (pane) {
          pane.classList.add('ex-sol-open');
          pane.querySelectorAll('.ex-opt-item').forEach(el => {
            el.classList.remove('revealed-correct', 'revealed-wrong');
            const isCorrect = el.getAttribute('data-correct') === 'true';
            const isSelected = el.classList.contains('selected');
            if (isCorrect) {
              el.classList.add('revealed-correct');
            } else if (isSelected) {
              el.classList.add('revealed-wrong');
            }
          });
        }
      }
    };
  }
})();
