/**
 * ChemLab Pro — Utility Functions
 * Security helpers, DOM utilities, toast notifications, localStorage
 */

/* =================== SANITIZATION =================== */

/**
 * Escapes HTML special characters to prevent XSS when inserting user content.
 * @param {string} str - Raw user input
 * @returns {string} HTML-safe string
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Strips all HTML tags from a string to produce plain text.
 * @param {string} str
 * @returns {string}
 */
function stripHTML(str) {
  const tmp = document.createElement('div');
  tmp.textContent = str;
  return tmp.innerHTML;
}

/* =================== INPUT VALIDATION =================== */

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validates a mobile number (allows +, spaces, digits, 7–15 chars).
 * @param {string} mobile
 * @returns {boolean}
 */
function isValidMobile(mobile) {
  return /^[\+\d\s\-]{7,15}$/.test(mobile.trim());
}

/**
 * Validates a roll/PIN number (alphanumeric, 3–20 chars).
 * @param {string} roll
 * @returns {boolean}
 */
function isValidRoll(roll) {
  return /^[A-Za-z0-9\-\/]{3,20}$/.test(roll.trim());
}

/* =================== TOAST NOTIFICATIONS =================== */

let _toastTimeout = null;

/**
 * Shows a toast notification at the bottom of the screen.
 * @param {string} message - Plain text message
 * @param {'info'|'success'|'warning'|'error'} type
 * @param {number} [duration=3000] - Auto-dismiss in ms
 */
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = { info: 'ℹ', success: '✅', warning: '⚠', error: '❌' };
  const icon = document.createElement('span');
  icon.textContent = icons[type] || icons.info;

  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  // Auto-dismiss
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

/* =================== LOADING STATES =================== */

/**
 * Shows or hides a full-page loading overlay.
 * @param {boolean} visible
 * @param {string} [message]
 */
function setLoading(visible, message = 'Loading…') {
  let overlay = document.getElementById('loading-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-label', 'Loading');
    overlay.innerHTML = `<div class="loading-spinner"></div><div class="loading-text"></div>`;
    document.body.appendChild(overlay);
  }
  overlay.querySelector('.loading-text').textContent = message;
  overlay.classList.toggle('hidden', !visible);
}

/* =================== LOCALSTORAGE HELPERS =================== */

const LS_KEYS = {
  USER:        'chemlab_user',
  CLASS:       'chemlab_class',
  SAVED_EXPS:  'chemlab_saved_experiments',
  RESULTS:     'chemlab_results_history',
  LOG:         'chemlab_last_log',
};

/**
 * Saves a value to localStorage as JSON. Silently ignores errors.
 * @param {string} key
 * @param {*} value
 */
function lsSave(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(_) {}
}

/**
 * Loads and parses a JSON value from localStorage.
 * @param {string} key
 * @param {*} [fallback=null]
 * @returns {*}
 */
function lsLoad(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch(_) { return fallback; }
}

/**
 * Removes a key from localStorage.
 * @param {string} key
 */
function lsRemove(key) {
  try { localStorage.removeItem(key); } catch(_) {}
}

/* =================== TIME FORMATTING =================== */

/**
 * Formats elapsed seconds into MM:SS.
 * @param {number} elapsed - Seconds
 * @returns {string}
 */
function formatTime(elapsed) {
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

/**
 * Returns a human-readable timestamp for the current time.
 * @returns {string}
 */
function nowTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* =================== KEYBOARD NAVIGATION =================== */

/**
 * Makes a card element respond to Enter/Space key like a click.
 * @param {HTMLElement} el
 */
function addKeyboardClick(el) {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
}

/**
 * Traps focus inside a modal element.
 * @param {HTMLElement} modal
 * @returns {function} Cleanup function to call when modal closes
 */
function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return () => {};
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  const handler = (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  };

  modal.addEventListener('keydown', handler);
  first.focus();
  return () => modal.removeEventListener('keydown', handler);
}

/* =================== DEBOUNCE =================== */

/**
 * Returns a debounced version of fn.
 * @param {function} fn
 * @param {number} delay - ms
 * @returns {function}
 */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
