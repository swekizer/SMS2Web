import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      await register(email, password);
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Registration failed. Email might already exist.');
    }
  };

  return (
    <div className="container">
      <div className="split-layout">
        <div className="split-left">
          <h1 className="tagline">Join SMS2Web today.</h1>
          <p className="form-subtitle">Create an account to start syncing your SMS from your phone instantly.</p>
        </div>
        <div className="split-right">
          <div className="form-container">
            <h2 className="form-title">Register</h2>
            <p className="form-subtitle">Create your new account.</p>
            
            {error && <p style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</p>}
            {success && <p style={{ color: 'var(--success-color)', marginBottom: '1rem' }}>{success}</p>}
            
            <form onSubmit={handleRegister}>
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
              <button type="submit" style={{ width: '100%' }}>Register</button>
            </form>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p>Already a user? <Link to="/login">Login here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
