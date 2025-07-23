const SUPABASE_URL = "https://exgcokfpizcekvkevkix.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Z2Nva2ZwaXpjZWt2a2V2a2l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDU5NjEsImV4cCI6MjA2NzEyMTk2MX0.Izp_HXOdhiiJNSCsaTaRX6wqn3TSKfxa8j0Yn3KWBms";

let supabase = null;

function initializeConnection() {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);
  fetchSMS();
  setupRealtimeSubscription();
}

function setupRealtimeSubscription() {
  supabase
    .channel('sms-changes')
    .on('postgres_changes', 
      { 
        event: '*',
        schema: 'public', 
        table: 'sms' 
      }, 
      (payload) => {
        fetchSMS();
      }
    )
    .subscribe((status) => {
      updateStatusIndicator(status);
    });
}

function fetchSMS() {
  if (!supabase) return;
  
  supabase
    .from('sms')
    .select('*')
    .order('timestamp', { ascending: false })
    .then(({ data, error }) => {
      if (error) return;
      updateSMSList(data || []);
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
  if (!supabase) return;
  fetchSMS();
}

function updateStatusIndicator(status) {
  const indicator = document.getElementById("status-indicator");
  if (status === 'SUBSCRIBED') {
    indicator.textContent = "Real-time: Connected ✓";
    indicator.className = "status-indicator status-online";
  } else {
    indicator.textContent = "Real-time: Disconnected ✗";
    indicator.className = "status-indicator status-offline";
  }
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

document.addEventListener('DOMContentLoaded', function() {
  initializeConnection();
});
