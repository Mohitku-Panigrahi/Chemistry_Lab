/**
 * ChemLab Pro — Chatbot Module
 * ChemBot AI powered by Claude API
 */

/* =================== STATE =================== */
let chatOpen    = false;
let chatHistory = [];
let chatIsBusy  = false;

const CHEMBOT_SYSTEM = `You are ChemBot, an expert AI chemistry tutor and lab assistant integrated into ChemLab Pro — a virtual chemistry simulation platform for students from Class 7 to B.Tech level.

Your expertise covers:
- All school and university chemistry (Class 7 to B.Tech / B.Sc)
- Organic, Inorganic, Physical, Analytical and Environmental Chemistry
- Lab techniques: titration, chromatography, electrolysis, spectroscopy, etc.
- Chemical equations, stoichiometry, GMW, molarity, normality
- Water quality parameters (pH, BOD, COD, DO, TDS, hardness)
- Chemical safety and lab protocols
- Reaction mechanisms, functional groups
- Indian chemistry curriculum (CBSE, ICSE, State boards, GATE)

Formatting rules:
- Keep answers clear, structured, and student-friendly
- Use **bold** for key terms
- Wrap chemical equations in a line starting with "⚗ " like: ⚗ HCl + NaOH → NaCl + H₂O
- Use bullet points for lists
- For complex topics, break into sections
- Be encouraging and enthusiastic about chemistry
- Always relate abstract concepts to real-world or lab context`;

/* =================== TOGGLE =================== */

function toggleChat() {
  chatOpen = !chatOpen;
  const win     = document.getElementById('chat-window');
  const fabIcon = document.getElementById('fab-icon');
  const badge   = document.getElementById('fab-badge');

  if (chatOpen) {
    win.classList.remove('chat-hidden');
    win.setAttribute('aria-hidden', 'false');
    fabIcon.textContent = '✕';
    if (badge) badge.style.display = 'none';
    if (chatHistory.length === 0) initChatWelcome();
    setTimeout(() => {
      const input = document.getElementById('chat-input');
      if (input) input.focus();
    }, 350);
  } else {
    win.classList.add('chat-hidden');
    win.setAttribute('aria-hidden', 'true');
    fabIcon.textContent = '🤖';
  }
}

/* =================== WELCOME =================== */

function initChatWelcome() {
  const userName  = currentUser  ? currentUser.name.split(' ')[0] : 'Student';
  const classInfo = currentClass ? ` I see you're working on <strong>${escapeHTML(currentClass.name)}</strong> — ask me anything about those experiments!` : '';
  appendBotMsg(`👋 Hi <strong>${escapeHTML(userName)}</strong>! I'm <strong>ChemBot</strong>, your AI chemistry tutor.${classInfo}<br><br>I can help you with:<br>
• Chemical reactions & equations<br>
• Lab experiment guidance<br>
• Stoichiometry & calculations<br>
• Concepts from Class 7 to B.Tech<br><br>What would you like to learn today? 🧪`);
}

/* =================== CONTEXT BAR =================== */

function updateChatContext() {
  const bar = document.getElementById('chat-context-text');
  if (bar) {
    bar.textContent = currentClass
      ? `📚 Context: ${currentClass.name} · ${currentClass.level} Level`
      : '💡 Ask me anything about chemistry!';
  }
}

/**
 * Called when the class changes — notifies the chatbot.
 */
function onClassChanged() {
  updateChatContext();
  if (chatOpen && chatHistory.length > 0) {
    appendBotMsg(`📚 Switched to <strong>${escapeHTML(currentClass.name)}</strong>! I'm now tuned to help with ${escapeHTML(currentClass.level.toLowerCase())} level chemistry. What experiment or concept can I explain?`);
  }
}

/* =================== MESSAGES =================== */

function appendBotMsg(html) {
  const msgs = document.getElementById('chat-messages');
  if (!msgs) return;
  const time = nowTimestamp();
  const div  = document.createElement('div');
  div.className = 'msg bot';

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = '⚗';

  const content = document.createElement('div');
  const bubble  = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = formatBotText(html);  // Bot HTML is app-controlled, safe

  const timeEl = document.createElement('div');
  timeEl.className = 'msg-time';
  timeEl.textContent = time;

  content.appendChild(bubble);
  content.appendChild(timeEl);
  div.appendChild(avatar);
  div.appendChild(content);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendUserMsg(text) {
  const msgs = document.getElementById('chat-messages');
  if (!msgs) return;
  const time = nowTimestamp();
  const div  = document.createElement('div');
  div.className = 'msg user';

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = '👤';

  const content = document.createElement('div');
  const bubble  = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;  // User text — use textContent to prevent XSS

  const timeEl = document.createElement('div');
  timeEl.className = 'msg-time';
  timeEl.textContent = time;

  content.appendChild(bubble);
  content.appendChild(timeEl);
  div.appendChild(avatar);
  div.appendChild(content);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

/**
 * Formats bot message text with markdown-style conversions.
 * Input comes from the app or the Claude API. The API response is
 * rendered with innerHTML only after escaping user-provided parts.
 * @param {string} text
 * @returns {string} HTML string safe for bot bubble innerHTML
 */
function formatBotText(text) {
  // Escape HTML first, then apply safe formatting
  return escapeHTML(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^⚗ (.+)$/gm, '<span class="chem-eq">⚗ $1</span>')
    .replace(/\n/g, '<br>');
}

/* =================== TYPING INDICATOR =================== */

function showTyping() {
  const msgs = document.getElementById('chat-messages');
  if (!msgs) return;
  const el = document.createElement('div');
  el.className = 'msg bot';
  el.id = 'typing-msg';
  el.setAttribute('aria-label', 'ChemBot is thinking');

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = '⚗';

  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'typing-dot';
    indicator.appendChild(dot);
  }

  el.appendChild(avatar);
  el.appendChild(indicator);
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;

  const statusEl = document.getElementById('chat-status');
  if (statusEl) statusEl.innerHTML = `<span class="status-dot thinking"></span> Thinking…`;
}

function hideTyping() {
  const el = document.getElementById('typing-msg');
  if (el) el.remove();
  const statusEl = document.getElementById('chat-status');
  if (statusEl) statusEl.innerHTML = `<span class="status-dot"></span> Ready to help`;
}

/* =================== SEND MESSAGE =================== */

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text  = input ? input.value.trim() : '';
  if (!text || chatIsBusy) return;

  input.value = '';
  input.style.height = '';
  hideSuggestions();
  appendUserMsg(text);
  chatHistory.push({ role: 'user', content: text });
  chatIsBusy = true;

  const sendBtn = document.getElementById('chat-send-btn');
  if (sendBtn) sendBtn.disabled = true;

  showTyping();

  const ctxNote = currentClass
    ? `\n[User context: Currently studying ${currentClass.name} (${currentClass.level} level) chemistry on ChemLab Pro platform.]`
    : '';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     CHEMBOT_SYSTEM + ctxNote,
        messages:   chatHistory
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${response.status}`);
    }

    const data  = await response.json();
    const reply = data.content?.[0]?.text || 'Sorry, I could not generate a response.';
    chatHistory.push({ role: 'assistant', content: reply });
    hideTyping();
    appendBotMsg(reply);
    updateSuggestionsFromContext(text);
  } catch (err) {
    hideTyping();
    // Error message uses escapeHTML for the error text
    appendBotMsg(`⚠ **Connection error:** ${escapeHTML(err.message)}\n\nMake sure you're connected and try again.`);
  }

  chatIsBusy = false;
  if (sendBtn) sendBtn.disabled = false;
  if (input)   input.focus();
}

function sendSuggestion(btn) {
  const input = document.getElementById('chat-input');
  if (input) input.value = btn.textContent;
  sendChatMessage();
}

function hideSuggestions() {
  const el = document.getElementById('chat-suggestions');
  if (el) el.style.display = 'none';
}

function updateSuggestionsFromContext() {
  const sugg = document.getElementById('chat-suggestions');
  if (!sugg) return;
  sugg.style.display = 'flex';
  const sets = [
    ['What is pH?', 'Explain acid-base titration', 'How does electrolysis work?', 'What is molarity?'],
    ['Explain neutralization', 'What is GMW?', 'How to calculate normality?', 'What is Le Chatelier\'s principle?'],
    ['Explain chromatography', 'What are functional groups?', 'How does a galvanic cell work?', 'What is Faraday\'s law?'],
    ['Explain BOD and COD', 'What is EDTA titration?', 'How to determine hardness of water?', 'Explain Beer-Lambert law'],
  ];
  const set = sets[Math.floor(Math.random() * sets.length)];
  sugg.innerHTML = '';
  set.forEach(s => {
    const chip = document.createElement('button');
    chip.className = 'suggestion-chip';
    chip.textContent = s;
    // Event is handled via event delegation in app.js
    sugg.appendChild(chip);
  });
}

function clearChat() {
  chatHistory = [];
  const msgs = document.getElementById('chat-messages');
  if (msgs) msgs.innerHTML = '';
  const sugg = document.getElementById('chat-suggestions');
  if (sugg) sugg.style.display = 'flex';
  initChatWelcome();
}

/* =================== INPUT HELPERS =================== */

function chatKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}
