/**
 * ChemLab Pro — Authentication & Session Management
 * Handles login, logout, session persistence via localStorage
 */

/* =================== STATE =================== */
let currentUser  = null;
let currentClass = null;

/* =================== LOGIN =================== */

/**
 * Handles the login form submission.
 * Validates all fields, stores session in localStorage, then navigates.
 */
function doLogin() {
  const nameEl    = document.getElementById('inp-name');
  const rollEl    = document.getElementById('inp-roll');
  const emailEl   = document.getElementById('inp-email');
  const collegeEl = document.getElementById('inp-college');
  const mobileEl  = document.getElementById('inp-mobile');
  const errEl     = document.getElementById('login-err');

  const name    = nameEl.value.trim();
  const roll    = rollEl.value.trim();
  const email   = emailEl.value.trim();
  const college = collegeEl.value.trim();
  const mobile  = mobileEl.value.trim();

  // Clear previous error
  setLoginError(null);

  // Field presence check
  if (!name || !roll || !email || !college || !mobile) {
    setLoginError('⚠ Please fill all fields to continue.');
    focusFirstEmpty([nameEl, rollEl, emailEl, collegeEl, mobileEl]);
    return;
  }

  // Name length
  if (name.length < 2 || name.length > 60) {
    setLoginError('⚠ Full name must be between 2 and 60 characters.');
    nameEl.focus();
    return;
  }

  // Email format
  if (!isValidEmail(email)) {
    setLoginError('⚠ Please enter a valid email address (e.g. student@college.edu).');
    emailEl.focus();
    return;
  }

  // Roll number format
  if (!isValidRoll(roll)) {
    setLoginError('⚠ Roll number must be 3–20 alphanumeric characters (hyphens/slashes allowed).');
    rollEl.focus();
    return;
  }

  // Mobile number
  if (!isValidMobile(mobile)) {
    setLoginError('⚠ Please enter a valid mobile number (7–15 digits).');
    mobileEl.focus();
    return;
  }

  // College name length
  if (college.length < 3 || college.length > 100) {
    setLoginError('⚠ College name must be between 3 and 100 characters.');
    collegeEl.focus();
    return;
  }

  // All valid — create session
  currentUser = { name, roll, email, college, mobile };
  lsSave(LS_KEYS.USER, currentUser);

  updateNavUser();
  document.getElementById('navbar').classList.remove('hidden');
  document.getElementById('navbar').setAttribute('aria-hidden', 'false');

  showView('classSelect');
  renderClassGrid();
}

/* =================== LOGOUT =================== */

/**
 * Logs the current user out, clears session, and returns to login.
 */
function logout() {
  if (!confirm('Are you sure you want to log out?')) return;
  currentUser  = null;
  currentClass = null;
  lsRemove(LS_KEYS.USER);
  lsRemove(LS_KEYS.CLASS);
  document.getElementById('navbar').classList.add('hidden');
  document.getElementById('navbar').setAttribute('aria-hidden', 'true');
  showView('login');
  showToast('Logged out successfully.', 'info');
}

/* =================== SESSION RESTORE =================== */

/**
 * Attempts to restore a previous session from localStorage.
 * Called on app initialization.
 */
function restoreSession() {
  const savedUser  = lsLoad(LS_KEYS.USER);
  const savedClass = lsLoad(LS_KEYS.CLASS);

  if (savedUser) {
    currentUser = savedUser;
    updateNavUser();
    document.getElementById('navbar').classList.remove('hidden');
    document.getElementById('navbar').setAttribute('aria-hidden', 'false');

    if (savedClass) {
      currentClass = CLASSES.find(c => c.id === savedClass.id) || null;
    }

    showView(currentClass ? 'dashboard' : 'classSelect');
    if (!currentClass) renderClassGrid();
    showToast(`Welcome back, ${currentUser.name.split(' ')[0]}!`, 'success');
    return true;
  }
  return false;
}

/* =================== CLASS SELECTION =================== */

/**
 * Selects a class and navigates to the dashboard.
 * @param {string} id - Class ID (e.g. 'c10')
 */
function selectClass(id) {
  currentClass = CLASSES.find(c => c.id === id) || null;
  if (!currentClass) return;
  lsSave(LS_KEYS.CLASS, currentClass);
  showView('dashboard');

  // Notify chatbot context update (chatbot.js listens to this)
  if (typeof updateChatContext === 'function') updateChatContext();
  if (typeof onClassChanged === 'function') onClassChanged();
}

/* =================== HELPERS =================== */

/**
 * Shows or clears the login error message.
 * @param {string|null} msg - null to clear
 */
function setLoginError(msg) {
  const errEl = document.getElementById('login-err');
  if (!errEl) return;
  if (msg) {
    errEl.textContent = msg;
    errEl.style.display = 'block';
    errEl.setAttribute('role', 'alert');
  } else {
    errEl.textContent = '';
    errEl.style.display = 'none';
    errEl.removeAttribute('role');
  }
}

/**
 * Focuses the first empty input from the list.
 * @param {HTMLElement[]} inputs
 */
function focusFirstEmpty(inputs) {
  const empty = inputs.find(el => !el.value.trim());
  if (empty) empty.focus();
}

/**
 * Updates the navbar user display area.
 */
function updateNavUser() {
  if (!currentUser) return;
  const firstName = currentUser.name.split(' ')[0];
  const initial   = currentUser.name[0].toUpperCase();
  const usernameEl = document.getElementById('nav-username');
  const avatarEl   = document.getElementById('nav-avatar');
  if (usernameEl) usernameEl.textContent = firstName;
  if (avatarEl)   avatarEl.textContent   = initial;
}
