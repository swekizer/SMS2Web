// Load environment variables
require('dotenv').config();

// Import required packages
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client (server-side - secure!)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files

// GET /api/sms - Fetch all SMS messages
app.get('/api/sms', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sms')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }

    res.json({ messages: data || [] });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log('🚀 SMS2Web Server Started!');
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api/sms`);
}); 