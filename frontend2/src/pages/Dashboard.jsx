import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { getSms, deleteSms } from '../api';

const Dashboard = ({ user }) => {
  const [smsList, setSmsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchSms();
    }
  }, [user]);

  const fetchSms = async () => {
    setLoading(true);
    try {
      const data = await getSms();
      setSmsList(data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch SMS messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSms(id);
      setSmsList(smsList.filter(sms => sms.id !== id));
    } catch (err) {
      alert('Failed to delete SMS.');
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="unauth-home">
          <h1>SMS2Web</h1>
          <p>Sync your messages from your phone to your computer instantly. Minimal, fast, and secure.</p>
          <Link to="/login">
            <button style={{ padding: '0.75rem 2rem', fontSize: '1.25rem' }}>Login to Dashboard</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-layout">
        <div className="sync-panel">
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>Sync Code</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Enter this code in your phone app to sync your messages.</p>
          </div>
          
          <div className="sync-code-box">
            {user.syncCode || '------'}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ marginBottom: '1rem' }}>Don't have the app yet?</p>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', width: '100%' }}>
              <button style={{ width: '100%' }}>Download the app</button>
            </a>
          </div>
        </div>

        <div className="sms-panel">
          <div className="sms-header">
            SMS Messages
            {loading && <span style={{ fontSize: '1rem', color: '#666', marginLeft: '1rem', fontWeight: 'normal' }}>Refreshing...</span>}
          </div>
          
          {error && <p style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</p>}
          
          <div className="sms-list">
            {smsList.length === 0 && !loading && (
              <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No messages found.</p>
            )}
            
            {smsList.map((sms) => (
              <div key={sms.id} className="sms-item">
                <div className="sms-content">
                  <div className="sms-sender">{sms.sender}</div>
                  <div className="sms-message">{sms.message}</div>
                  <div className="sms-time">
                    {new Date(sms.timestamp || Date.now()).toLocaleString()}
                  </div>
                </div>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(sms.id)}
                  title="Delete SMS"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
