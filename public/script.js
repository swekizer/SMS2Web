// API Configuration - No more exposed API keys!
const API_BASE_URL = '/api';

// Global state
let isConnected = false;

function initializeConnection() {
  fetchSMS();
  setupPolling();
  updateStatusIndicator('connecting');
}

function setupPolling() {
  // Poll for new messages every 5 seconds instead of real-time
  setInterval(() => {
    if (isConnected) {
      fetchSMS();
    }
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
      console.log('API Response:', data);
      updateSMSList(data.messages || []);
      updateStatusIndicator('connected');
    })
    .catch(error => {
      console.error('Error fetching SMS:', error);
      updateStatusIndicator('error');
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

function updateStatusIndicator(status) {
  const indicator = document.getElementById("status-indicator");
  
  switch(status) {
    case 'connected':
      indicator.textContent = "API: Connected ✓";
      indicator.className = "status-indicator status-online";
      isConnected = true;
      break;
    case 'connecting':
      indicator.textContent = "API: Connecting...";
      indicator.className = "status-indicator status-offline";
      isConnected = false;
      break;
    case 'error':
      indicator.textContent = "API: Error ✗";
      indicator.className = "status-indicator status-offline";
      isConnected = false;
      break;
    default:
      indicator.textContent = "API: Disconnected ✗";
      indicator.className = "status-indicator status-offline";
      isConnected = false;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatTime(timestamp) {
  try {
    // Handle Unix timestamp (milliseconds)
    if (typeof timestamp === 'number' && timestamp > 1000000000000) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    }
    // Handle ISO string or other formats
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch {
    return "Unknown time";
  }
}

// Test API connection on page load
document.addEventListener('DOMContentLoaded', function() {
  // Test if API is available
  fetch(`${API_BASE_URL}/health`)
    .then(response => response.json())
    .then(data => {
      console.log('API Health Check:', data);
      initializeConnection();
    })
    .catch(error => {
      console.error('API not available:', error);
      updateStatusIndicator('error');
    });
});
