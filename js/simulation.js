/**
 * ChemLab Pro — Simulation Module
 * Lab bench, drag-and-drop, reactions, tools, log, undo/redo
 */

/* =================== SIMULATION STATE =================== */
let benchChemicals     = [];
let startTime          = null;
let logEntries         = [];
let isHeatOn           = false;
let lastReaction       = null;
let selectedChemForMix = null;
let simMode            = 'guided';

// Undo/redo stacks — each entry is a snapshot of benchChemicals
const undoStack = [];
const redoStack = [];

/* =================== INITIALIZATION =================== */

/**
 * Called when the simulation view becomes active.
 */
function renderSimulation() {
  renderChemPanel();
  if (!startTime) startTime = Date.now();
  if (logEntries.length === 0) {
    addLog('Lab ready. Drag chemicals to bench.', 'info');
  }
}

/* =================== CHEMICAL PANEL =================== */

/**
 * Renders the draggable chemical list in the left panel.
 */
function renderChemPanel() {
  const list = document.getElementById('chem-panel-list');
  if (!list) return;
  list.innerHTML = '';

  Object.entries(CHEMICALS).forEach(([cat, chems]) => {
    const catEl = document.createElement('div');
    catEl.className = 'chem-category';
    catEl.textContent = cat;
    list.appendChild(catEl);

    chems.forEach(ch => {
      const item = document.createElement('div');
      item.className = 'chem-item';
      item.draggable = true;
      item.dataset.id = ch.id;
      item.setAttribute('role', 'listitem');
      item.setAttribute('aria-label', `${ch.name} (${ch.formula}) — drag to bench`);
      item.setAttribute('tabindex', '0');

      const dot = document.createElement('div');
      dot.className = 'chem-dot';
      dot.style.cssText = `background:${ch.color};box-shadow:0 0 6px ${ch.color}66;`;
      dot.setAttribute('aria-hidden', 'true');

      const name = document.createElement('span');
      name.textContent = ch.name;

      const formula = document.createElement('span');
      formula.className = 'chem-formula';
      formula.textContent = ch.formula;

      item.appendChild(dot);
      item.appendChild(name);
      item.appendChild(formula);

      // Desktop drag events
      item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('chemId', ch.id);
        e.dataTransfer.effectAllowed = 'copy';
        item.classList.add('dragging');
      });
      item.addEventListener('dragend', () => item.classList.remove('dragging'));

      // Click to add to bench (alternative to drag)
      item.addEventListener('click', () => addChemicalToBench(ch.id));

      // Keyboard: press Enter/Space to add to bench
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          addChemicalToBench(ch.id);
        }
      });

      // Touch drag support
      initTouchDrag(item, ch.id);

      list.appendChild(item);
    });
  });
}

/* =================== CHEMICAL SEARCH FILTER =================== */

/**
 * Filters the chemical panel by name or formula.
 * @param {string} q - Search query
 */
function filterChemicals(q) {
  const query = q.toLowerCase().trim();
  document.querySelectorAll('.chem-item').forEach(item => {
    const txt = item.textContent.toLowerCase();
    item.style.display = !query || txt.includes(query) ? '' : 'none';
  });
  // Show/hide category headers
  document.querySelectorAll('.chem-category').forEach(cat => {
    let sibling = cat.nextElementSibling;
    let anyVisible = false;
    while (sibling && !sibling.classList.contains('chem-category')) {
      if (sibling.style.display !== 'none') anyVisible = true;
      sibling = sibling.nextElementSibling;
    }
    cat.style.display = anyVisible ? '' : 'none';
  });
}

/* =================== BENCH DRAG-AND-DROP =================== */

/**
 * Handles dragover on the bench.
 * @param {DragEvent} e
 */
function benchDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  const bench = document.getElementById('sim-bench');
  if (bench) bench.classList.add('drag-over');
}

/**
 * Handles drag leave on the bench.
 */
function benchDragLeave(e) {
  // Only fire if leaving the bench entirely (not entering a child)
  if (!e.currentTarget.contains(e.relatedTarget)) {
    const bench = document.getElementById('sim-bench');
    if (bench) bench.classList.remove('drag-over');
  }
}

/**
 * Handles drop on the bench: adds the chemical.
 * @param {DragEvent} e
 */
function benchDrop(e) {
  e.preventDefault();
  const bench = document.getElementById('sim-bench');
  if (bench) bench.classList.remove('drag-over');
  const chemId = e.dataTransfer.getData('chemId');
  addChemicalToBench(chemId);
}

/**
 * Programmatically adds a chemical to the bench by ID.
 * @param {string} chemId
 */
function addChemicalToBench(chemId) {
  const chem = getChemById(chemId);
  if (!chem) return;
  if (benchChemicals.find(c => c.id === chemId)) {
    addLog(`${chem.name} already on bench`, 'warning');
    showToast(`${chem.name} is already on the bench`, 'warning');
    return;
  }
  // Save undo snapshot before mutating
  pushUndo();
  benchChemicals.push(chem);
  renderBench();
  addLog(`Added: ${chem.name} (${chem.formula})`, 'info');
  document.getElementById('bench-hint').style.display = 'none';
}

/* =================== TOUCH DRAG =================== */

/**
 * Adds touch-based drag support to a chemical item.
 * @param {HTMLElement} item - The chem-item element
 * @param {string} chemId
 */
function initTouchDrag(item, chemId) {
  let touchClone = null;

  item.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    touchClone = item.cloneNode(true);
    touchClone.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999; opacity:0.85;
      left:${touch.clientX - 60}px; top:${touch.clientY - 20}px;
      background:var(--surface); border:1px solid var(--cyan);
      border-radius:8px; padding:8px 12px;
    `;
    document.body.appendChild(touchClone);
  }, { passive: true });

  item.addEventListener('touchmove', e => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touchClone) {
      touchClone.style.left = `${touch.clientX - 60}px`;
      touchClone.style.top  = `${touch.clientY - 20}px`;
    }
    // Highlight bench if touch is over it
    const bench = document.getElementById('sim-bench');
    if (bench) {
      const r = bench.getBoundingClientRect();
      const over = touch.clientX >= r.left && touch.clientX <= r.right &&
                   touch.clientY >= r.top  && touch.clientY <= r.bottom;
      bench.classList.toggle('drag-over', over);
    }
  }, { passive: false });

  item.addEventListener('touchend', e => {
    if (touchClone) { touchClone.remove(); touchClone = null; }
    const bench = document.getElementById('sim-bench');
    if (bench) bench.classList.remove('drag-over');
    const touch = e.changedTouches[0];
    const bench2 = document.getElementById('sim-bench');
    if (bench2) {
      const r = bench2.getBoundingClientRect();
      if (touch.clientX >= r.left && touch.clientX <= r.right &&
          touch.clientY >= r.top  && touch.clientY <= r.bottom) {
        addChemicalToBench(chemId);
      }
    }
  }, { passive: true });
}

/* =================== BENCH RENDER =================== */

/**
 * Re-renders all beakers on the bench from benchChemicals state.
 */
function renderBench() {
  const zone = document.getElementById('bench-drop-zone');
  if (!zone) return;
  zone.querySelectorAll('.bench-beaker').forEach(b => b.remove());

  benchChemicals.forEach(chem => {
    const beaker = document.createElement('div');
    beaker.className = 'bench-beaker';
    beaker.dataset.id = chem.id;
    beaker.setAttribute('role', 'button');
    beaker.setAttribute('tabindex', '0');
    beaker.setAttribute('aria-label', `${chem.name} — click to select, or press Delete to remove`);

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.innerHTML = makeBeakerSVG(chem.color, 80, isHeatOn);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'beaker-remove';
    removeBtn.textContent = '✕';
    removeBtn.setAttribute('aria-label', `Remove ${chem.name} from bench`);
    removeBtn.addEventListener('click', e => { e.stopPropagation(); removeBeaker(chem.id); });

    wrapper.appendChild(removeBtn);

    const label = document.createElement('div');
    label.className = 'beaker-label';
    label.textContent = chem.formula;

    beaker.appendChild(wrapper);
    beaker.appendChild(label);

    beaker.addEventListener('click', () => toggleSelectBeaker(chem.id));
    beaker.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSelectBeaker(chem.id); }
      if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); removeBeaker(chem.id); }
    });

    zone.appendChild(beaker);
  });

  const hint = document.getElementById('bench-hint');
  if (hint) hint.style.display = benchChemicals.length > 0 ? 'none' : 'block';
}

/* =================== BEAKER OPERATIONS =================== */

function toggleSelectBeaker(id) {
  document.querySelectorAll('.bench-beaker').forEach(b => {
    const selected = b.dataset.id === id;
    b.classList.toggle('selected', selected);
    b.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
  selectedChemForMix = id;
}

function removeBeaker(id) {
  pushUndo();
  benchChemicals = benchChemicals.filter(c => c.id !== id);
  renderBench();
  const ch = getChemById(id);
  addLog(`Removed: ${ch ? ch.name : id}`, 'warning');
}

function clearBench() {
  if (benchChemicals.length === 0) return;
  if (!confirm('Clear all chemicals from the bench?')) return;
  pushUndo();
  benchChemicals = [];
  renderBench();
  const overlay = document.getElementById('reaction-overlay-container');
  if (overlay) overlay.innerHTML = '';
  addLog('Bench cleared.', 'info');
  showToast('Bench cleared', 'info');
}

/* =================== MIXING & REACTION =================== */

/**
 * Attempts to react the chemicals currently on the bench.
 */
function mixAndReact() {
  if (benchChemicals.length < 2) {
    addLog('⚠ Need at least 2 chemicals to react!', 'error');
    showToast('Add at least 2 chemicals to the bench first', 'warning');
    return;
  }

  const ids = benchChemicals.map(c => c.id).sort();
  let reaction = null;

  // Check all pairs
  for (let i = 0; i < ids.length && !reaction; i++) {
    for (let j = i + 1; j < ids.length && !reaction; j++) {
      const key1 = `${ids[i]}+${ids[j]}`;
      const key2 = `${ids[j]}+${ids[i]}`;
      reaction = REACTIONS[key1] || REACTIONS[key2] || null;
    }
  }

  addLog(`Mixing: ${benchChemicals.map(c => c.formula).join(' + ')}`, 'info');

  if (reaction) {
    lastReaction = reaction;
    addLog(`✅ ${reaction.eq}`, 'success');
    addLog(`Type: ${reaction.type} | pH: ${reaction.pH} | Heat: ${reaction.heat}`, 'info');
    addLog(`Observation: ${reaction.obs}`, 'info');
    showReactionOverlay(reaction);
    updateResults(reaction);
    showToast('Reaction complete! 🧪', 'success');
  } else {
    addLog('No recognized reaction between these chemicals.', 'warning');
    showNoReactionOverlay();
    showToast('No standard reaction found', 'warning');
  }
}

/* =================== OVERLAYS =================== */

function showReactionOverlay(rxn) {
  const container = document.getElementById('reaction-overlay-container');
  if (!container) return;

  const overlay = document.createElement('div');
  overlay.className = 'reaction-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Reaction complete');

  const heading = document.createElement('h3');
  heading.textContent = '✅ REACTION COMPLETE';

  const eq = document.createElement('div');
  eq.className = 'reaction-eq';
  eq.textContent = rxn.eq;

  const stats = document.createElement('div');
  stats.className = 'reaction-stats';
  [
    { label: 'Type',   val: rxn.type,  color: 'var(--purple2)' },
    { label: 'pH',     val: rxn.pH,    color: null },
    { label: 'Energy', val: rxn.heat,  color: 'var(--orange)'  },
    { label: 'ΔH',     val: rxn.ΔH,   color: 'var(--green)'   },
  ].forEach(s => {
    const stat = document.createElement('div');
    stat.className = 'r-stat';
    const lbl = document.createElement('div');
    lbl.className = 'r-stat-label';
    lbl.textContent = s.label;
    const v = document.createElement('div');
    v.className = 'r-stat-val';
    v.textContent = s.val;
    if (s.color) v.style.color = s.color;
    stat.appendChild(lbl);
    stat.appendChild(v);
    stats.appendChild(stat);
  });

  const obs = document.createElement('div');
  obs.style.cssText = 'font-size:0.82rem;color:var(--text2);margin-bottom:16px;padding:8px;background:var(--bg);border-radius:6px;';
  obs.textContent = rxn.obs;

  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:10px;justify-content:center;';

  const viewBtn = document.createElement('button');
  viewBtn.className = 'btn btn-success';
  viewBtn.textContent = '📊 View Results';
  viewBtn.addEventListener('click', viewResults);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-ghost';
  closeBtn.textContent = '✕ Close';
  closeBtn.setAttribute('aria-label', 'Close reaction overlay');
  closeBtn.addEventListener('click', () => container.innerHTML = '');

  actions.appendChild(viewBtn);
  actions.appendChild(closeBtn);

  overlay.appendChild(heading);
  overlay.appendChild(eq);
  overlay.appendChild(stats);
  overlay.appendChild(obs);
  overlay.appendChild(actions);

  container.innerHTML = '';
  container.appendChild(overlay);

  // Trap focus inside overlay, close on Escape
  const releaseFocus = trapFocus(overlay);
  overlay.addEventListener('keydown', e => {
    if (e.key === 'Escape') { releaseFocus(); container.innerHTML = ''; }
  });
}

function showNoReactionOverlay() {
  const container = document.getElementById('reaction-overlay-container');
  if (!container) return;

  const overlay = document.createElement('div');
  overlay.className = 'reaction-overlay';
  overlay.style.borderColor = 'var(--yellow)';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'No reaction');

  const heading = document.createElement('h3');
  heading.style.color = 'var(--yellow)';
  heading.textContent = '⚠ NO REACTION';

  const msg = document.createElement('div');
  msg.style.cssText = 'color:var(--text2);font-size:0.88rem;margin:12px 0;';
  msg.textContent = 'These chemicals do not react with each other under standard conditions.';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-ghost';
  closeBtn.textContent = '✕ Close';
  closeBtn.addEventListener('click', () => container.innerHTML = '');

  overlay.appendChild(heading);
  overlay.appendChild(msg);
  overlay.appendChild(closeBtn);

  container.innerHTML = '';
  container.appendChild(overlay);

  const releaseFocus = trapFocus(overlay);
  overlay.addEventListener('keydown', e => {
    if (e.key === 'Escape') { releaseFocus(); container.innerHTML = ''; }
  });
}

function viewResults() {
  const container = document.getElementById('reaction-overlay-container');
  if (container) container.innerHTML = '';
  showView('results');
}

/* =================== LOG =================== */

/**
 * Appends a plain-text entry to the reaction log.
 * @param {string} text - Plain text message (not HTML)
 * @param {'info'|'success'|'warning'|'error'} type
 */
function addLog(text, type = 'info') {
  const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const ts = formatTime(elapsed);
  logEntries.push({ ts, text, type });

  const entries = document.getElementById('log-entries');
  if (entries) {
    const el = document.createElement('div');
    el.className = 'log-entry';

    const timeEl = document.createElement('span');
    timeEl.className = 'log-time';
    timeEl.textContent = ts;

    const textEl = document.createElement('span');
    textEl.className = `log-text ${type}`;
    textEl.textContent = text;  // textContent prevents XSS

    el.appendChild(timeEl);
    el.appendChild(textEl);
    entries.appendChild(el);
    entries.scrollTop = entries.scrollHeight;
  }

  // Persist last 100 log entries
  lsSave(LS_KEYS.LOG, logEntries.slice(-100));
}

function clearLog() {
  logEntries = [];
  const entries = document.getElementById('log-entries');
  if (entries) entries.innerHTML = '';
  addLog('Log cleared.', 'info');
}

/* =================== TOOLS =================== */

function toggleHeat() {
  isHeatOn = !isHeatOn;
  const btn = document.getElementById('heat-btn');
  if (btn) {
    btn.style.background    = isHeatOn ? 'rgba(255,51,102,0.3)' : '';
    btn.style.borderColor   = isHeatOn ? 'var(--red)' : '';
    btn.setAttribute('aria-pressed', isHeatOn ? 'true' : 'false');
  }
  addLog(isHeatOn ? '🔥 Bunsen burner ON — heating applied' : '🔥 Burner OFF', isHeatOn ? 'warning' : 'info');
  renderBench();
}

function stirBench()    { addLog('🌀 Stirring mixture…', 'info');                                       showToast('Stirring…', 'info', 1500); }
function addFilterLog() { addLog('⚗ Filtration step applied.', 'info');                                showToast('Filtration applied', 'info', 1500); }
function dropperMode()  { addLog('💧 Dropper mode: click a chemical to add drops', 'info');             showToast('Dropper mode active', 'info', 2000); }
function captureNote()  { addLog('📷 Observation captured in lab notebook', 'info');                    showToast('Observation saved', 'success', 1500); }

function measurePH() {
  const validChems = benchChemicals.filter(c => c.ph !== null);
  if (validChems.length === 0) {
    addLog('⚠ No chemicals with known pH on bench', 'error');
    showToast('No pH-measurable chemicals on bench', 'warning');
    return;
  }
  const avgPH = validChems.reduce((s, c) => s + c.ph, 0) / validChems.length;
  addLog(`🌡 pH measured: ${avgPH.toFixed(1)}`, 'success');
  showToast(`pH = ${avgPH.toFixed(1)}`, 'success');
}

/* =================== SIM TAB SWITCHING =================== */

function switchSimTab(tab) {
  simMode = tab;
  document.querySelectorAll('.sim-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
    t.setAttribute('aria-selected', t.dataset.tab === tab ? 'true' : 'false');
  });
}

function showSimFreeMode() { switchSimTab('free'); showView('simulation'); }

/* =================== UNDO / REDO =================== */

function pushUndo() {
  undoStack.push(JSON.parse(JSON.stringify(benchChemicals)));
  redoStack.length = 0; // Clear redo on new action
  updateUndoRedoBtns();
}

function undoAction() {
  if (!undoStack.length) return;
  redoStack.push(JSON.parse(JSON.stringify(benchChemicals)));
  benchChemicals = undoStack.pop();
  renderBench();
  addLog('↩ Undo', 'info');
  updateUndoRedoBtns();
}

function redoAction() {
  if (!redoStack.length) return;
  undoStack.push(JSON.parse(JSON.stringify(benchChemicals)));
  benchChemicals = redoStack.pop();
  renderBench();
  addLog('↪ Redo', 'info');
  updateUndoRedoBtns();
}

function updateUndoRedoBtns() {
  const undoBtn = document.getElementById('undo-btn');
  const redoBtn = document.getElementById('redo-btn');
  if (undoBtn) undoBtn.disabled = undoStack.length === 0;
  if (redoBtn) redoBtn.disabled = redoStack.length === 0;
}

/* =================== CUSTOM EXPERIMENT =================== */

/**
 * Renders the custom experiment builder view.
 */
function renderCustomExp() {
  const allChems = Object.values(CHEMICALS).flat();
  const sel1 = document.getElementById('custom-chem1');
  const sel2 = document.getElementById('custom-chem2');
  if (!sel1 || !sel2) return;

  [sel1, sel2].forEach((container, idx) => {
    container.innerHTML = '';
    allChems.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'chem-select-btn';
      btn.dataset.id = c.id;
      btn.textContent = c.formula;
      btn.setAttribute('aria-label', `${c.name} (${c.formula})`);
      btn.addEventListener('click', () => toggleCustomChem(btn, idx === 0 ? 'chem1' : 'chem2'));
      container.appendChild(btn);
    });
  });
}

function toggleCustomChem(btn, group) {
  document.querySelectorAll(`#custom-${group} .chem-select-btn`).forEach(b => {
    b.classList.remove('selected');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('selected');
  btn.setAttribute('aria-pressed', 'true');
}

function runCustomExp() {
  const c1btn = document.querySelector('#custom-chem1 .chem-select-btn.selected');
  const c2btn = document.querySelector('#custom-chem2 .chem-select-btn.selected');
  const conc  = parseFloat(document.getElementById('conc-slider').value);
  const temp  = parseFloat(document.getElementById('temp-slider').value);
  const resBox = document.getElementById('custom-result-box');
  const gmwBox = document.getElementById('custom-gmw-box');

  if (!c1btn || !c2btn) {
    if (resBox) {
      resBox.textContent = '⚠ Select both reactants first!';
      resBox.style.color = 'var(--red)';
    }
    showToast('Select both reactants first', 'warning');
    return;
  }
  if (resBox) resBox.style.color = '';

  const id1  = c1btn.dataset.id;
  const id2  = c2btn.dataset.id;
  const ids  = [id1, id2].sort();
  const rxn  = REACTIONS[`${ids[0]}+${ids[1]}`] || REACTIONS[`${ids[1]}+${ids[0]}`] || null;

  if (rxn) {
    const adjPH = Math.max(0, Math.min(14, rxn.pH + (conc - 1) * 0.2 + (temp - 25) * 0.01));

    if (resBox) {
      resBox.innerHTML = '';
      const rows = [
        ['Reaction',     rxn.eq],
        ['Type',         rxn.type],
        ['Products',     rxn.products],
        [`pH (at ${conc}M, ${temp}°C)`, adjPH.toFixed(2)],
        ['ΔH',           rxn.ΔH],
        ['Energy',       rxn.heat],
        ['GMW Product',  `${rxn.GMW_product} g/mol`],
        ['Observation',  rxn.obs],
      ];

      const eqDiv = document.createElement('div');
      eqDiv.className = 'result-eq';
      eqDiv.textContent = rxn.eq;
      resBox.appendChild(eqDiv);

      rows.slice(1).forEach(([key, val]) => {
        const line = document.createElement('div');
        line.className = 'result-line';

        const keyEl = document.createElement('span');
        keyEl.className = 'r-key';
        keyEl.textContent = key;

        const valEl = document.createElement('span');
        valEl.className = 'r-val';
        valEl.textContent = val;

        line.appendChild(keyEl);
        line.appendChild(valEl);
        resBox.appendChild(line);
      });
    }

    if (gmwBox) {
      gmwBox.innerHTML = '';
      const stoic = document.createElement('div');
      stoic.style.cssText = 'background:var(--bg2);border:1px solid var(--border2);border-radius:10px;padding:16px;';

      const stoicHead = document.createElement('div');
      stoicHead.style.cssText = 'font-size:0.78rem;color:var(--text3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;';
      stoicHead.textContent = `⚖ Stoichiometry (at ${conc} mol/L)`;

      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;';

      [
        { val: (conc * rxn.GMW_product).toFixed(2), unit: 'g/L (product)',    color: 'var(--cyan)'    },
        { val: (conc * 1000).toFixed(0),             unit: 'mmol/L',           color: 'var(--purple2)' },
        { val: String(rxn.GMW_product),              unit: 'GMW (g/mol)',      color: 'var(--green)'   },
      ].forEach(s => {
        const cell = document.createElement('div');
        cell.style.cssText = 'text-align:center;background:var(--bg);border-radius:8px;padding:12px;';

        const valEl = document.createElement('div');
        valEl.style.cssText = `font-family:var(--font-mono);font-size:1.2rem;color:${s.color};`;
        valEl.textContent = s.val;

        const unitEl = document.createElement('div');
        unitEl.style.cssText = 'font-size:0.72rem;color:var(--text3);margin-top:4px;';
        unitEl.textContent = s.unit;

        cell.appendChild(valEl);
        cell.appendChild(unitEl);
        grid.appendChild(cell);
      });

      stoic.appendChild(stoicHead);
      stoic.appendChild(grid);
      gmwBox.appendChild(stoic);
    }
  } else {
    if (resBox) {
      resBox.textContent = '⚗ No standard reaction found. These chemicals may react under special conditions. Check further literature.';
      resBox.style.color = 'var(--yellow)';
    }
    if (gmwBox) gmwBox.innerHTML = '';
  }
}

/* =================== HELPERS =================== */

/**
 * Looks up a chemical from the CHEMICALS data by its ID.
 * @param {string} id
 * @returns {Object|null}
 */
function getChemById(id) {
  for (const cat of Object.values(CHEMICALS)) {
    const found = cat.find(c => c.id === id);
    if (found) return found;
  }
  return null;
}

/**
 * Opens the simulation view for a named experiment.
 * @param {string} name - Experiment name
 */
function openExpSimulation(name) {
  showView('simulation');
  addLog(`Loaded experiment: ${name}`, 'info');
}

/* =================== EXPERIMENT SAVE / LOAD =================== */

/**
 * Saves the current bench state to localStorage under a user-named slot.
 */
function saveExperiment() {
  if (benchChemicals.length === 0) {
    showToast('Add chemicals to the bench before saving', 'warning');
    return;
  }
  const label = prompt('Name for this experiment save:', `Exp-${Date.now()}`);
  if (!label) return;

  const saved = lsLoad(LS_KEYS.SAVED_EXPS, []);
  saved.unshift({
    id:        Date.now(),
    name:      label.trim().slice(0, 60),
    chemicals: JSON.parse(JSON.stringify(benchChemicals)),
    class:     currentClass ? currentClass.name : 'Free Mode',
    date:      new Date().toLocaleDateString(),
    heatOn:    isHeatOn,
  });
  lsSave(LS_KEYS.SAVED_EXPS, saved.slice(0, 20));
  showToast(`Experiment "${label.trim()}" saved!`, 'success');
}

/**
 * Shows a dialog to load a previously saved experiment.
 */
function loadExperiment() {
  const saved = lsLoad(LS_KEYS.SAVED_EXPS, []);
  if (saved.length === 0) {
    showToast('No saved experiments found', 'info');
    return;
  }

  const names = saved.map((s, i) => `${i + 1}. ${s.name} (${s.class} — ${s.date})`).join('\n');
  const choice = prompt(`Select an experiment to load:\n\n${names}\n\nEnter number:`);
  if (!choice) return;

  const idx = parseInt(choice, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= saved.length) {
    showToast('Invalid selection', 'error');
    return;
  }

  pushUndo();
  const exp = saved[idx];
  benchChemicals = exp.chemicals;
  isHeatOn = exp.heatOn || false;
  renderBench();
  addLog(`Loaded experiment: ${exp.name}`, 'info');
  showToast(`Loaded "${exp.name}"`, 'success');
}
