// Load environment variables
require('dotenv').config();

// Import required packages
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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

// Security middleware
app.use(helmet()); // Adds security headers
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://sms-2-web.vercel.app'] // Remove trailing slash
    : ['http://localhost:3000'],
  credentials: true
})); // Allows cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Serve static files from public directory
app.use(express.static('public'));

// API Routes - These replace direct client-side database access

// GET /api/sms - Fetch all SMS messages
app.get('/api/sms', async (req, res) => {
  try {
    console.log('Fetching SMS messages...');
    console.log('Supabase URL:', process.env.SUPABASE_URL ? 'Set' : 'Missing');
    console.log('Service Key:', process.env.SUPABASE_SERVICE_KEY ? 'Set' : 'Missing');
    
    const { data, error } = await supabase
      .from('sms')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
    }

    console.log(`Fetched ${data?.length || 0} messages`);
    res.json({ messages: data || [] });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// POST /api/sms - Create new SMS message
app.post('/api/sms', async (req, res) => {
  try {
    const { sender, message } = req.body;
    
    // Basic validation
    if (!sender || !message) {
      return res.status(400).json({ error: 'Sender and message are required' });
    }

    const newMessage = {
      sender: sender.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('sms')
      .insert([newMessage])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to create message' });
    }

    console.log('Created new message:', data[0]);
    res.status(201).json({ message: 'Message created successfully', data: data[0] });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'SMS2Web API is running'
  });
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
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
}); 