/**
 * ChemLab Pro — UI Management
 * View switching, dashboard rendering, class grid, results display
 */

/* =================== VIEW MANAGEMENT =================== */

const VIEWS = ['login', 'classSelect', 'dashboard', 'simulation', 'results', 'custom'];

/**
 * Switches to the named view, hiding all others.
 * Updates the active nav link and triggers view-specific render.
 * @param {string} name - View name (login|classSelect|dashboard|simulation|results|custom)
 */
function showView(name) {
  VIEWS.forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) {
      el.classList.add('hidden');
      el.setAttribute('aria-hidden', 'true');
    }
  });

  const target = document.getElementById('view-' + name);
  if (target) {
    target.classList.remove('hidden');
    target.setAttribute('aria-hidden', 'false');
    // Move focus to the view heading for screen readers
    const heading = target.querySelector('h1,h2,h3,[data-focus]');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus(); }
  }

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.remove('active');
    l.setAttribute('aria-current', 'false');
  });
  const navEl = document.getElementById('nav-' + name);
  if (navEl) {
    navEl.classList.add('active');
    navEl.setAttribute('aria-current', 'page');
  }

  // Trigger view-specific render
  if (name === 'dashboard')  renderDashboard();
  if (name === 'simulation') renderSimulation();
  if (name === 'custom')     renderCustomExp();
  if (name === 'login')      resetLoginForm();
}

/* =================== LOGIN FORM =================== */

function resetLoginForm() {
  ['inp-name','inp-roll','inp-email','inp-college','inp-mobile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  setLoginError(null);
}

/* =================== CLASS GRID =================== */

/**
 * Renders the class selection cards.
 */
function renderClassGrid() {
  const container = document.getElementById('class-grid-container');
  if (!container) return;
  container.innerHTML = '';

  CLASSES.forEach(c => {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Select ${c.name} — ${c.level} level, ${c.expCount} experiments available`);

    const badge = document.createElement('span');
    badge.className = `level-badge ${c.badge}`;
    badge.textContent = c.level;

    const title = document.createElement('h3');
    title.textContent = `${c.emoji} ${c.name}`;

    const desc = document.createElement('p');
    desc.textContent = c.desc;

    const count = document.createElement('div');
    count.className = 'exp-count';
    count.textContent = `🔬 ${c.expCount} experiments available`;

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(count);

    card.addEventListener('click', () => selectClass(c.id));
    addKeyboardClick(card);

    container.appendChild(card);
  });
}

/* =================== DASHBOARD =================== */

/**
 * Renders the dashboard view: equipment grid, experiment cards, sidebar.
 */
function renderDashboard() {
  if (!currentClass) { showView('classSelect'); return; }

  const titleEl = document.getElementById('dash-class-title');
  const descEl  = document.getElementById('dash-class-desc');
  const nameEl  = document.getElementById('exp-class-name');

  if (titleEl) titleEl.textContent = `${currentClass.emoji} ${currentClass.name} — ${currentClass.level}`;
  if (descEl)  descEl.textContent  = `${currentClass.desc} · ${currentClass.expCount} Experiments Available`;
  if (nameEl)  nameEl.textContent  = currentClass.name.toUpperCase();

  renderEquipment();
  renderExperiments();
  renderSidebarExps();
}

/**
 * Renders the equipment grid in the dashboard.
 */
function renderEquipment() {
  const grid = document.getElementById('equipment-grid');
  if (!grid) return;
  grid.innerHTML = '';

  EQUIPMENT.forEach(e => {
    const card = document.createElement('div');
    card.className = 'equip-card';
    card.setAttribute('aria-label', `${e.name}: ${e.desc}`);

    const svg  = document.createElement('div');
    svg.innerHTML = makeEquipSVG(e.svgPath, e.color);

    const name = document.createElement('div');
    name.className = 'equip-name';
    name.textContent = e.name;

    const desc = document.createElement('div');
    desc.className = 'equip-desc';
    desc.textContent = e.desc;

    card.appendChild(svg.firstElementChild || svg);
    card.appendChild(name);
    card.appendChild(desc);
    grid.appendChild(card);
  });
}

/**
 * Renders the experiment cards in the dashboard main area.
 */
function renderExperiments() {
  const exps = EXPERIMENTS_BY_CLASS[currentClass.id] || [];
  const grid  = document.getElementById('exp-cards-grid');
  if (!grid) return;
  grid.innerHTML = '';

  exps.forEach((e, i) => {
    const card = document.createElement('article');
    card.className = 'exp-card';
    card.setAttribute('aria-label', `Experiment: ${e.name}`);

    const header = document.createElement('div');
    header.className = 'exp-card-header';

    const iconEl = document.createElement('div');
    iconEl.className = 'exp-card-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = e.icon;

    const metaEl = document.createElement('div');
    const titleEl = document.createElement('div');
    titleEl.className = 'exp-card-title';
    titleEl.textContent = e.name;
    const subEl = document.createElement('div');
    subEl.className = 'exp-card-sub';
    subEl.textContent = e.sub;
    metaEl.appendChild(titleEl);
    metaEl.appendChild(subEl);

    header.appendChild(iconEl);
    header.appendChild(metaEl);

    const descEl = document.createElement('p');
    descEl.textContent = e.desc;

    const tagsEl = document.createElement('div');
    tagsEl.className = 'exp-card-tags';
    e.tags.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = t;
      tagsEl.appendChild(tag);
    });

    const conceptsEl = document.createElement('div');
    conceptsEl.className = 'exp-concepts';
    const conceptsHead = document.createElement('h4');
    conceptsHead.textContent = 'Key Concepts';
    const conceptsList = document.createElement('ul');
    conceptsList.className = 'concept-list';
    e.concepts.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      conceptsList.appendChild(li);
    });
    conceptsEl.appendChild(conceptsHead);
    conceptsEl.appendChild(conceptsList);

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.style.cssText = 'width:100%;justify-content:center;padding:10px;';
    btn.textContent = `▶ Start Simulation`;
    btn.setAttribute('aria-label', `Start simulation for ${e.name}`);
    btn.addEventListener('click', () => openExpSimulation(e.name));

    card.appendChild(header);
    card.appendChild(descEl);
    card.appendChild(tagsEl);
    card.appendChild(conceptsEl);
    card.appendChild(btn);
    grid.appendChild(card);
  });
}

/**
 * Renders the sidebar experiment list in the dashboard.
 */
function renderSidebarExps() {
  const exps = EXPERIMENTS_BY_CLASS[currentClass.id] || [];
  const list  = document.getElementById('sidebar-exp-list');
  if (!list) return;
  list.innerHTML = '';

  exps.forEach(e => {
    const item = document.createElement('div');
    item.className = 'exp-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Open simulation for ${e.name}`);

    const iconEl = document.createElement('span');
    iconEl.className = 'exp-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = e.icon;

    const nameEl = document.createElement('span');
    nameEl.textContent = e.name;

    const simBtn = document.createElement('span');
    simBtn.className = 'exp-sim-btn';
    simBtn.textContent = '▶ SIM';
    simBtn.setAttribute('aria-hidden', 'true');

    item.appendChild(iconEl);
    item.appendChild(nameEl);
    item.appendChild(simBtn);

    item.addEventListener('click', () => openExpSimulation(e.name));
    addKeyboardClick(item);

    list.appendChild(item);
  });
}

/* =================== RESULTS VIEW =================== */

/**
 * Renders the results view from a reaction object.
 * @param {Object} rxn - Reaction data from REACTIONS
 */
function updateResults(rxn) {
  const eqEl  = document.getElementById('result-eq');
  const expEl = document.getElementById('result-exp-name');
  if (eqEl)  eqEl.textContent  = rxn.eq;
  if (expEl) expEl.textContent = rxn.type + ' Reaction';

  const pH    = rxn.pH;
  const pct   = (pH / 14) * 100;
  const indEl = document.getElementById('ph-indicator');
  const valEl = document.getElementById('ph-value');
  const typEl = document.getElementById('ph-type');
  if (indEl) indEl.style.left = pct + '%';
  if (valEl) valEl.textContent = pH.toFixed(1);
  const phType = pH < 7 ? '⚗ Acidic' : pH > 7 ? '🔵 Basic' : '⚪ Neutral';
  if (typEl) typEl.textContent = phType;

  const grid = document.getElementById('results-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const cards = [
    {
      icon: '🧪', title: 'Reaction Parameters',
      rows: [
        ['Reaction Type',    rxn.type],
        ['Products',         rxn.products],
        ['pH',               `${rxn.pH} (${phType})`],
        ['ΔH',               rxn.ΔH],
        ['Energy Type',      rxn.heat],
        ['GMW of Product',   `${rxn.GMW_product} g/mol`],
      ]
    },
    {
      icon: '🌊', title: 'Water Quality Parameters',
      rows: [
        ['pH',           rxn.pH.toFixed(1)],
        ['Conductivity', `${rxn.pH < 7 ? 1200 : 800} µS/cm`],
        ['BOD',          `${rxn.type.includes('Organic') ? 45 : 5} mg/L`],
        ['COD',          `${rxn.type.includes('Organic') ? 180 : 20} mg/L`],
        ['TDS',          `${(rxn.GMW_product * 8).toFixed(0)} mg/L`],
      ]
    },
    {
      icon: '🧬', title: 'Molecular Parameters',
      rows: [
        ['GMW (Product)', `${rxn.GMW_product} g/mol`],
        ['Ionization',    rxn.type.includes('Neutral') ? 'Complete' : 'Partial'],
        ['Bond Type',     rxn.type.includes('Precipitation') ? 'Ionic' : 'Polar Covalent'],
        ['State',         rxn.products.includes('↓') ? 'Precipitate formed' : rxn.products.includes('↑') ? 'Gas evolved' : 'Aqueous'],
      ]
    },
    {
      icon: '⚕', title: 'Analytical Parameters',
      rows: [
        ['Normality (est.)',  '0.1 N'],
        ['Molarity (est.)',   '0.1 M'],
        ['Purity (est.)',     '98.5%'],
        ['Stability Index',   rxn.heat === 'Exothermic' ? 'Stable' : 'Unstable above 60°C'],
        ['QSAR LogP',        (Math.log10(rxn.GMW_product) - 1.2).toFixed(2)],
      ]
    },
  ];

  cards.forEach(cardData => {
    const card = document.createElement('div');
    card.className = 'result-card';

    const heading = document.createElement('h3');
    heading.textContent = `${cardData.icon} ${cardData.title}`;
    card.appendChild(heading);

    cardData.rows.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'param-row';

      const nameEl = document.createElement('span');
      nameEl.className = 'param-name';
      nameEl.textContent = label;

      const valEl = document.createElement('span');
      valEl.className = 'param-val';
      valEl.textContent = value;

      row.appendChild(nameEl);
      row.appendChild(valEl);
      card.appendChild(row);
    });

    grid.appendChild(card);
  });

  // Save to history
  saveResultToHistory(rxn);
}

/* =================== RESULTS HISTORY =================== */

/**
 * Saves a completed reaction result to localStorage history.
 * @param {Object} rxn
 */
function saveResultToHistory(rxn) {
  const history = lsLoad(LS_KEYS.RESULTS, []);
  history.unshift({
    timestamp: new Date().toISOString(),
    eq: rxn.eq,
    type: rxn.type,
    pH: rxn.pH,
    heat: rxn.heat,
    ΔH: rxn.ΔH,
    products: rxn.products,
    GMW: rxn.GMW_product,
    class: currentClass ? currentClass.name : 'Free Mode',
  });
  // Keep only last 50 results
  lsSave(LS_KEYS.RESULTS, history.slice(0, 50));
}

/* =================== PRINT =================== */
function printResults() { window.print(); }
