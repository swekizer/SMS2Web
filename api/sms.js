const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://sms-2-q9ljvi2qs-swekit-patels-projects.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
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
  } else if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}; 