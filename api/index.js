const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://sms-2-web.vercel.app']
    : ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.get('/api/sms', async (req, res) => {
  try {
    console.log('Fetching SMS messages...');
    
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

app.post('/api/sms', async (req, res) => {
  try {
    const { sender, message } = req.body;
    
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

    res.status(201).json({ message: 'Message created successfully', data: data[0] });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'SMS2Web API is running'
  });
});

// Serve the main page for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Export for Vercel
module.exports = app; 