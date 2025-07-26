module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://sms-2-gqmqcneaa-swekit-patels-projects.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      message: 'SMS2Web API is running'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}; 