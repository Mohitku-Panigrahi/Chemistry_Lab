/**
 * ChemLab Pro — App Entry Point
 * Initializes the application, sets up event listeners, molecular canvas
 */

/* =================== MOLECULAR BACKGROUND CANVAS =================== */

const canvas = document.getElementById('mol-canvas');
const ctx    = canvas ? canvas.getContext('2d') : null;
let nodes    = [];

function initCanvas() {
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  nodes = Array.from({ length: 50 }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r:  Math.random() * 3 + 1,
  }));
}

function animCanvas() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,212,255,0.6)';
    ctx.fill();
  });

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(0,212,255,${0.15 * (1 - d / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animCanvas);
}

/* =================== EVENT LISTENER SETUP =================== */

function setupEventListeners() {
  // Login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', e => { e.preventDefault(); doLogin(); });

  // Navbar links
  document.getElementById('nav-dashboard')?.addEventListener('click',  () => showView('dashboard'));
  document.getElementById('nav-simulation')?.addEventListener('click', () => showView('simulation'));
  document.getElementById('nav-free')?.addEventListener('click',       () => showSimFreeMode());
  document.getElementById('nav-results')?.addEventListener('click',    () => showView('results'));
  document.getElementById('nav-custom')?.addEventListener('click',     () => showView('custom'));
  document.getElementById('nav-logout')?.addEventListener('click',     logout);

  // Dashboard buttons
  document.getElementById('btn-change-class')?.addEventListener('click',  () => showView('classSelect'));
  document.getElementById('btn-open-sim')?.addEventListener('click',      () => showView('simulation'));
  document.getElementById('btn-open-sim-2')?.addEventListener('click',    () => showView('simulation'));

  // Simulation bench drag events
  const bench = document.getElementById('sim-bench');
  if (bench) {
    bench.addEventListener('dragover',   benchDragOver);
    bench.addEventListener('drop',       benchDrop);
    bench.addEventListener('dragleave',  benchDragLeave);
  }

  // Simulation tab buttons
  document.querySelectorAll('.sim-tab').forEach(tab => {
    tab.addEventListener('click', () => switchSimTab(tab.dataset.tab));
  });

  // Simulation back/results buttons
  document.getElementById('btn-sim-back')?.addEventListener('click',    () => showView('dashboard'));
  document.getElementById('btn-sim-results')?.addEventListener('click', () => showView('results'));

  // Tool buttons
  document.getElementById('heat-btn')?.addEventListener('click',    toggleHeat);
  document.getElementById('stir-btn')?.addEventListener('click',    stirBench);
  document.getElementById('filter-btn')?.addEventListener('click',  addFilterLog);
  document.getElementById('ph-btn')?.addEventListener('click',      measurePH);
  document.getElementById('dropper-btn')?.addEventListener('click', dropperMode);
  document.getElementById('camera-btn')?.addEventListener('click',  captureNote);

  // Mix & clear buttons
  document.getElementById('mix-btn')?.addEventListener('click',   mixAndReact);
  document.getElementById('clear-btn')?.addEventListener('click', clearBench);

  // Undo/redo buttons
  document.getElementById('undo-btn')?.addEventListener('click', undoAction);
  document.getElementById('redo-btn')?.addEventListener('click', redoAction);

  // Save/load experiment buttons
  document.getElementById('save-exp-btn')?.addEventListener('click', saveExperiment);
  document.getElementById('load-exp-btn')?.addEventListener('click', loadExperiment);

  // Reaction log clear
  document.getElementById('clear-log-btn')?.addEventListener('click', clearLog);

  // Results buttons
  document.getElementById('btn-new-sim')?.addEventListener('click',  () => showView('simulation'));
  document.getElementById('btn-custom-exp')?.addEventListener('click', () => showView('custom'));
  document.getElementById('btn-print')?.addEventListener('click',     printResults);

  // Chemical search
  const searchInput = document.getElementById('chem-search-inp');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(e => filterChemicals(e.target.value), 200));
  }

  // Custom experiment slider labels
  const concSlider = document.getElementById('conc-slider');
  const tempSlider = document.getElementById('temp-slider');
  if (concSlider) {
    concSlider.addEventListener('input', () => {
      const el = document.getElementById('conc-val');
      if (el) el.textContent = concSlider.value;
    });
  }
  if (tempSlider) {
    tempSlider.addEventListener('input', () => {
      const el = document.getElementById('temp-val');
      if (el) el.textContent = tempSlider.value;
    });
  }

  // Custom experiment run button
  document.getElementById('run-custom-btn')?.addEventListener('click', runCustomExp);

  // Chat suggestion chips (event delegation for dynamic chips)
  const suggArea = document.getElementById('chat-suggestions');
  if (suggArea) {
    suggArea.addEventListener('click', e => {
      const chip = e.target.closest('.suggestion-chip');
      if (chip) sendSuggestion(chip);
    });
  }

  // Nav brand — go to dashboard if logged in, else login
  document.getElementById('nav-brand')?.addEventListener('click', e => {
    e.preventDefault();
    showView(currentUser ? 'classSelect' : 'login');
  });
  document.getElementById('chat-send-btn')?.addEventListener('click',  sendChatMessage);
  document.getElementById('clear-chat-btn')?.addEventListener('click', clearChat);
  document.getElementById('close-chat-btn')?.addEventListener('click', toggleChat);

  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', chatKeydown);
    chatInput.addEventListener('input',   () => autoResize(chatInput));
  }

  // Global keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z') { e.preventDefault(); undoAction(); }
      if (e.key === 'y') { e.preventDefault(); redoAction(); }
      if (e.key === 's') { e.preventDefault(); saveExperiment(); }
    }
    if (e.key === 'Escape') {
      // Close open overlays
      const overlay = document.getElementById('reaction-overlay-container');
      if (overlay && overlay.firstChild) { overlay.innerHTML = ''; }
    }
  });

  // Window resize
  window.addEventListener('resize', debounce(initCanvas, 200));
}

/* =================== INIT =================== */

document.addEventListener('DOMContentLoaded', () => {
  // Start molecular canvas
  initCanvas();
  animCanvas();

  // Wire up all event listeners (no inline onclick handlers)
  setupEventListeners();

  // Try to restore previous session
  const restored = restoreSession();
  if (!restored) {
    showView('login');
  }

  // Show chatbot badge notification after delay
  setTimeout(() => {
    if (!chatOpen) {
      const badge = document.getElementById('fab-badge');
      if (badge) badge.style.display = 'flex';
    }
  }, 3000);

  // Initialize undo/redo button states
  updateUndoRedoBtns();
});
