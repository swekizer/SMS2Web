import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { logout } from '../api';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-brand">Home</Link>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-item">App</a>
      </div>
      
      {user ? (
        <div className="dropdown">
          <button className="nav-item" style={{ border: 'none' }}>
            <User size={18} /> Profile
          </button>
          <div className="dropdown-content">
            <button onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      ) : (
        <Link to="/login" className="nav-item">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
