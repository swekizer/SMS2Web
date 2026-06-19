import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const user = await login(email, password);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="container">
      <div className="split-layout">
        <div className="split-left">
          <h1 className="tagline">Sync your SMS messages instantly.</h1>
          <p className="form-subtitle">Access your messages on the web with a simple utility tool.</p>
        </div>
        <div className="split-right">
          <div className="form-container">
            <h2 className="form-title">Login</h2>
            <p className="form-subtitle">Welcome back to SMS2Web.</p>
            
            {error && <p style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</p>}
            
            <form onSubmit={handleLogin}>
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" style={{ width: '100%' }}>Login</button>
            </form>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p>New user? <Link to="/register">Register here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
