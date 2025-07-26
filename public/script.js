// API Configuration
const API_BASE_URL = '/api';

function initializeApp() {
  fetchSMS();
  setupPolling();
}

function setupPolling() {
  // Poll for new messages every 5 seconds for real-time feel
  setInterval(() => {
    fetchSMS();
  }, 5000);
}

function fetchSMS() {
  fetch(`${API_BASE_URL}/sms`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      updateSMSList(data.messages || []);
    })
    .catch(error => {
      console.error('Error fetching SMS:', error);
      showError('Failed to load messages');
    });
}

function updateSMSList(data) {
  const list = document.getElementById("sms-list");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<div class='sms-item'>No messages found</div>";
    return;
  }

  data.forEach(sms => {
    const div = document.createElement("div");
    div.className = "sms-item";
    div.innerHTML = `
      <div class="sms-sender">${escapeHtml(sms.sender || 'Unknown')}</div>
      <div class="sms-body">${escapeHtml(sms.message || '')}</div>
      <div class="sms-time">${formatTime(sms.timestamp)}</div>
    `;
    list.appendChild(div);
  });
}

function manualRefresh() {
  fetchSMS();
}

function showError(message) {
  const list = document.getElementById("sms-list");
  list.innerHTML = `<div class='sms-item error'>${message}</div>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatTime(timestamp) {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch {
    return "Unknown time";
  }
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});
