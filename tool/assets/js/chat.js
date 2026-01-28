/**
 * ITE Trip Generation Tool - Chat Interface
 * AI-powered assistant for trip generation questions
 */

const chatModule = (function() {
  'use strict';

  // State
  let apiKey = null;
  let isConnected = false;
  let isLoading = false;
  let conversationHistory = [];
  let pendingFiles = [];

  // DOM Elements (initialized on load)
  let elements = {};

  // System prompt with ITE context
  const SYSTEM_PROMPT = `You are an ITE Trip Generation expert assistant for Henrico County, Virginia. You help planners and developers understand trip generation calculations based on the ITE Trip Generation Manual, 12th Edition.

## Your Capabilities:
1. **ITE Code Selection**: Help users identify the correct ITE land use code for their development
2. **Trip Calculations**: Explain how trip generation is calculated using rates and equations
3. **Threshold Analysis**: Explain Henrico County thresholds (100 trips/peak hour warning, 1,000 daily warning, 4,000 vpd TIA requirement)
4. **Document Interpretation**: Help interpret ITE data plots and methodology
5. **Report Generation**: Help draft executive summaries and TIA narratives

## Key Reference Data:

### Henrico County Thresholds:
- AM or PM Peak Hour > 100 trips/hour → Warning
- Weekday Daily > 1,000 trips → Warning
- TIA Required: ≥ 4,000 vpd (vehicles per day)
- VDOT Threshold: 5,000 vpd

### Calculation Decision Tree:
- If R² ≥ 0.75 AND Equation exists → Use Fitted Curve Equation (MOST ACCURATE)
- If R² ≥ 0.50 AND Equation exists → Use Fitted Curve Equation with caution
- If Average Rate exists → Use Weighted Average Rate
- Else → Flag as "Insufficient data"

### Common ITE Codes (12th Edition):
- 210: Single-Family Detached Housing (9.43 trips/unit weekday)
- 220: Multifamily Housing Low-Rise (7.32 trips/unit weekday)
- 221: Multifamily Housing Mid-Rise (5.44 trips/unit weekday)
- 710: General Office Building (9.74 trips/1000sf weekday)
- 820: Shopping Center >150k (37.75 trips/1000sf weekday)
- 850: Supermarket (106.78 trips/1000sf weekday)
- 934: Fast Food with Drive-Through (467.48 trips/1000sf weekday)

### Directional Splits (Typical):
- Residential AM: 25% entering, 75% exiting
- Residential PM: 65% entering, 35% exiting
- Office AM: 88% entering, 12% exiting
- Office PM: 17% entering, 83% exiting
- Retail: Generally 50/50 split

## Guidelines:
- Be concise and practical
- Always cite ITE codes when discussing land uses
- Flag when data quality is low (sample size < 5 or R² < 0.50)
- Recommend consulting official ITE documentation for final submissions
- If analyzing uploaded images/PDFs, extract specific values (rates, R², sample size, equations)
- For ambiguous land uses, suggest the most appropriate ITE code with reasoning

## Response Format:
- Use clear headings and bullet points
- Show calculations step-by-step when relevant
- Highlight warnings or important notes
- Keep responses focused and actionable`;

  /**
   * Initialize the chat module
   */
  function init() {
    // Create and inject chat HTML
    injectChatHTML();

    // Get DOM elements
    elements = {
      toggleBtn: document.getElementById('chat-toggle-btn'),
      panel: document.getElementById('chat-panel'),
      overlay: document.getElementById('chat-overlay'),
      closeBtn: document.getElementById('chat-close-btn'),
      apiKeyInput: document.getElementById('chat-api-key'),
      apiKeyBtn: document.getElementById('chat-api-key-btn'),
      apiKeyStatus: document.getElementById('chat-api-key-status'),
      messagesContainer: document.getElementById('chat-messages'),
      filePreview: document.getElementById('chat-file-preview'),
      fileInput: document.getElementById('chat-file-input'),
      uploadBtn: document.getElementById('chat-upload-btn'),
      textarea: document.getElementById('chat-textarea'),
      sendBtn: document.getElementById('chat-send-btn')
    };

    // Bind events
    bindEvents();

    // Check for saved API key
    loadSavedApiKey();
  }

  /**
   * Inject chat HTML into the page
   */
  function injectChatHTML() {
    const chatHTML = `
      <!-- Chat Toggle Button -->
      <button class="chat-toggle-btn" id="chat-toggle-btn" title="Ask AI Assistant">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <!-- Chat Overlay -->
      <div class="chat-overlay" id="chat-overlay"></div>

      <!-- Chat Panel -->
      <div class="chat-panel" id="chat-panel">
        <!-- Header -->
        <div class="chat-header">
          <h3>ITE Trip Generation Assistant</h3>
          <button class="chat-close-btn" id="chat-close-btn">&times;</button>
        </div>

        <!-- API Key Section -->
        <div class="chat-api-section">
          <div class="api-key-input-group">
            <input type="password" id="chat-api-key" placeholder="Enter Anthropic API Key (sk-ant-...)" autocomplete="off">
            <button id="chat-api-key-btn">Connect</button>
          </div>
          <div class="api-key-status disconnected" id="chat-api-key-status">
            <span>Not connected</span>
          </div>
          <div class="api-key-warning">
            <strong>Security Notice:</strong> Your API key is stored only in this browser session and is sent directly to Anthropic's API. Never share your API key. Clear it when done on shared computers.
          </div>
        </div>

        <!-- Messages Area -->
        <div class="chat-messages" id="chat-messages">
          <div class="chat-welcome">
            <h4>Welcome to ITE Assistant</h4>
            <p>I can help you with:</p>
            <ul>
              <li>Finding the right ITE land use code</li>
              <li>Explaining trip generation calculations</li>
              <li>Interpreting ITE data plots (upload images)</li>
              <li>Understanding Henrico County thresholds</li>
              <li>Drafting TIA report sections</li>
            </ul>
            <p style="margin-top: 1rem; font-size: 0.75rem;">Enter your Anthropic API key above to start chatting.</p>
          </div>
        </div>

        <!-- File Preview -->
        <div class="chat-file-preview" id="chat-file-preview"></div>

        <!-- Input Area -->
        <div class="chat-input-area">
          <div class="chat-input-row">
            <div class="chat-input-wrapper">
              <textarea
                class="chat-textarea"
                id="chat-textarea"
                placeholder="Ask about ITE codes, trip calculations, or upload documents..."
                rows="1"
                disabled
              ></textarea>
            </div>
            <div class="chat-actions">
              <input type="file" id="chat-file-input" class="chat-file-input" multiple accept="image/*,.pdf">
              <button class="chat-upload-btn" id="chat-upload-btn" title="Upload image or PDF" disabled>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </button>
              <button class="chat-send-btn" id="chat-send-btn" title="Send message" disabled>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  /**
   * Bind event listeners
   */
  function bindEvents() {
    // Toggle panel
    elements.toggleBtn.addEventListener('click', togglePanel);
    elements.closeBtn.addEventListener('click', closePanel);
    elements.overlay.addEventListener('click', closePanel);

    // API key
    elements.apiKeyBtn.addEventListener('click', handleApiKeySubmit);
    elements.apiKeyInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleApiKeySubmit();
    });

    // File upload
    elements.uploadBtn.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileSelect);

    // Send message
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Auto-resize textarea
    elements.textarea.addEventListener('input', autoResizeTextarea);

    // Keyboard shortcut to open chat
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        togglePanel();
      }
    });
  }

  /**
   * Toggle chat panel open/closed
   */
  function togglePanel() {
    const isOpen = elements.panel.classList.contains('open');
    if (isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  }

  /**
   * Open chat panel
   */
  function openPanel() {
    elements.panel.classList.add('open');
    elements.overlay.classList.add('visible');
    elements.toggleBtn.classList.add('active');
    if (isConnected) {
      elements.textarea.focus();
    } else {
      elements.apiKeyInput.focus();
    }
  }

  /**
   * Close chat panel
   */
  function closePanel() {
    elements.panel.classList.remove('open');
    elements.overlay.classList.remove('visible');
    elements.toggleBtn.classList.remove('active');
  }

  /**
   * Load saved API key from sessionStorage
   */
  function loadSavedApiKey() {
    const savedKey = sessionStorage.getItem('anthropic_api_key');
    if (savedKey) {
      apiKey = savedKey;
      setConnected(true);
      elements.apiKeyInput.value = '••••••••••••••••';
    }
  }

  /**
   * Handle API key submission
   */
  function handleApiKeySubmit() {
    const inputValue = elements.apiKeyInput.value.trim();

    if (isConnected) {
      // Disconnect
      apiKey = null;
      sessionStorage.removeItem('anthropic_api_key');
      setConnected(false);
      elements.apiKeyInput.value = '';
      addSystemMessage('API key cleared. Your session has been disconnected.');
      return;
    }

    if (!inputValue) {
      addErrorMessage('Please enter your Anthropic API key');
      return;
    }

    if (!inputValue.startsWith('sk-ant-')) {
      addErrorMessage('Invalid API key format. Anthropic keys start with "sk-ant-"');
      return;
    }

    // Save to sessionStorage (not localStorage for security)
    apiKey = inputValue;
    sessionStorage.setItem('anthropic_api_key', apiKey);
    setConnected(true);
    elements.apiKeyInput.value = '••••••••••••••••';

    // Clear welcome message and add connected message
    elements.messagesContainer.innerHTML = '';
    addSystemMessage('Connected! You can now ask questions about ITE trip generation.');
  }

  /**
   * Set connected state and update UI
   */
  function setConnected(connected) {
    isConnected = connected;

    elements.apiKeyStatus.className = `api-key-status ${connected ? 'connected' : 'disconnected'}`;
    elements.apiKeyStatus.innerHTML = connected
      ? '<span>Connected</span>'
      : '<span>Not connected</span>';

    elements.apiKeyBtn.textContent = connected ? 'Disconnect' : 'Connect';
    elements.textarea.disabled = !connected;
    elements.uploadBtn.disabled = !connected;
    elements.sendBtn.disabled = !connected;

    if (connected) {
      elements.textarea.placeholder = 'Ask about ITE codes, trip calculations, or upload documents...';
    } else {
      elements.textarea.placeholder = 'Enter API key to start chatting...';
    }
  }

  /**
   * Handle file selection
   */
  function handleFileSelect(e) {
    const files = Array.from(e.target.files);

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        addErrorMessage(`Unsupported file type: ${file.name}. Only images and PDFs are supported.`);
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        addErrorMessage(`File too large: ${file.name}. Maximum size is 10MB.`);
        continue;
      }

      // Add to pending files
      pendingFiles.push(file);
    }

    // Update file preview
    renderFilePreview();

    // Clear input
    e.target.value = '';
  }

  /**
   * Render file preview area
   */
  function renderFilePreview() {
    if (pendingFiles.length === 0) {
      elements.filePreview.classList.remove('has-files');
      elements.filePreview.innerHTML = '';
      return;
    }

    elements.filePreview.classList.add('has-files');
    elements.filePreview.innerHTML = pendingFiles.map((file, index) => {
      const isImage = file.type.startsWith('image/');
      const preview = isImage
        ? `<img src="${URL.createObjectURL(file)}" alt="${file.name}">`
        : `<div class="file-icon">PDF</div>`;

      return `
        <div class="file-preview-item" data-index="${index}">
          ${preview}
          <span title="${file.name}">${truncateFilename(file.name)}</span>
          <button onclick="chatModule.removeFile(${index})" title="Remove">&times;</button>
        </div>
      `;
    }).join('');
  }

  /**
   * Remove a file from pending files
   */
  function removeFile(index) {
    pendingFiles.splice(index, 1);
    renderFilePreview();
  }

  /**
   * Truncate filename for display
   */
  function truncateFilename(name, maxLength = 15) {
    if (name.length <= maxLength) return name;
    const ext = name.split('.').pop();
    const base = name.substring(0, maxLength - ext.length - 4);
    return `${base}...${ext}`;
  }

  /**
   * Auto-resize textarea based on content
   */
  function autoResizeTextarea() {
    const textarea = elements.textarea;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  /**
   * Send message to Claude API
   */
  async function sendMessage() {
    const message = elements.textarea.value.trim();

    if (!message && pendingFiles.length === 0) return;
    if (!isConnected || isLoading) return;

    // Add user message to UI
    addUserMessage(message, pendingFiles);

    // Prepare content for API
    const content = await buildMessageContent(message, pendingFiles);

    // Clear input and files
    elements.textarea.value = '';
    autoResizeTextarea();
    pendingFiles = [];
    renderFilePreview();

    // Add to conversation history
    conversationHistory.push({
      role: 'user',
      content: content
    });

    // Show typing indicator
    setLoading(true);

    try {
      const response = await callClaudeAPI();

      // Add assistant message
      conversationHistory.push({
        role: 'assistant',
        content: response
      });

      addAssistantMessage(response);
    } catch (error) {
      console.error('API Error:', error);
      addErrorMessage(error.message || 'Failed to get response. Please try again.');

      // Remove failed user message from history
      conversationHistory.pop();
    } finally {
      setLoading(false);
    }
  }

  /**
   * Build message content with text and files
   */
  async function buildMessageContent(text, files) {
    if (files.length === 0) {
      return text;
    }

    // Build multimodal content array
    const content = [];

    // Add files first
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const base64 = await fileToBase64(file);
        content.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: file.type,
            data: base64
          }
        });
      } else if (file.type === 'application/pdf') {
        const base64 = await fileToBase64(file);
        content.push({
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: base64
          }
        });
      }
    }

    // Add text
    if (text) {
      content.push({
        type: 'text',
        text: text
      });
    }

    return content;
  }

  /**
   * Convert file to base64
   */
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Call Claude API
   */
  async function callClaudeAPI() {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: conversationHistory
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      if (response.status === 401) {
        setConnected(false);
        sessionStorage.removeItem('anthropic_api_key');
        throw new Error('Invalid API key. Please check your key and reconnect.');
      }

      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }

      throw new Error(error.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  /**
   * Set loading state
   */
  function setLoading(loading) {
    isLoading = loading;
    elements.sendBtn.disabled = loading || !isConnected;
    elements.textarea.disabled = loading || !isConnected;

    if (loading) {
      addTypingIndicator();
    } else {
      removeTypingIndicator();
    }
  }

  /**
   * Add typing indicator
   */
  function addTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    elements.messagesContainer.appendChild(indicator);
    scrollToBottom();
  }

  /**
   * Remove typing indicator
   */
  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  /**
   * Add user message to UI
   */
  function addUserMessage(text, files = []) {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message user';

    let content = '';

    // Add file indicators
    if (files.length > 0) {
      const fileNames = files.map(f => f.name).join(', ');
      content += `<div style="font-size: 0.75rem; opacity: 0.8; margin-bottom: 4px;">Attached: ${fileNames}</div>`;
    }

    // Add text
    if (text) {
      content += escapeHTML(text);
    }

    messageEl.innerHTML = content;
    elements.messagesContainer.appendChild(messageEl);
    scrollToBottom();
  }

  /**
   * Add assistant message to UI
   */
  function addAssistantMessage(text) {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message assistant';
    messageEl.innerHTML = formatMarkdown(text);
    elements.messagesContainer.appendChild(messageEl);
    scrollToBottom();
  }

  /**
   * Add system message to UI
   */
  function addSystemMessage(text) {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message system';
    messageEl.textContent = text;
    elements.messagesContainer.appendChild(messageEl);
    scrollToBottom();
  }

  /**
   * Add error message to UI
   */
  function addErrorMessage(text) {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message error';
    messageEl.textContent = text;
    elements.messagesContainer.appendChild(messageEl);
    scrollToBottom();
  }

  /**
   * Scroll messages to bottom
   */
  function scrollToBottom() {
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Basic markdown formatting
   */
  function formatMarkdown(text) {
    // Escape HTML first
    let html = escapeHTML(text);

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Headers
    html = html.replace(/^### (.+)$/gm, '<strong style="display:block;margin-top:0.5rem;">$1</strong>');
    html = html.replace(/^## (.+)$/gm, '<strong style="display:block;margin-top:0.5rem;font-size:1.1em;">$1</strong>');
    html = html.replace(/^# (.+)$/gm, '<strong style="display:block;margin-top:0.5rem;font-size:1.2em;">$1</strong>');

    // Bullet points
    html = html.replace(/^- (.+)$/gm, '&bull; $1<br>');
    html = html.replace(/^\* (.+)$/gm, '&bull; $1<br>');

    // Numbered lists
    html = html.replace(/^(\d+)\. (.+)$/gm, '$1. $2<br>');

    // Line breaks
    html = html.replace(/\n\n/g, '<br><br>');
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  /**
   * Clear conversation history
   */
  function clearConversation() {
    conversationHistory = [];
    elements.messagesContainer.innerHTML = '';
    addSystemMessage('Conversation cleared.');
  }

  // Public API
  return {
    init,
    removeFile,
    clearConversation,
    openPanel,
    closePanel
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  chatModule.init();
});
