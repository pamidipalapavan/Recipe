import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ChefHat, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', position: 'sticky', top: '1rem', zIndex: 50 }}>
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none', color: 'white' }}>
          <ChefHat size={32} color="var(--accent-primary)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            RecipeRealm
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="btn btn-secondary" style={{textDecoration: 'none'}}>Admin</Link>
              )}
              <Link to="/dashboard" className="btn btn-secondary" style={{textDecoration: 'none'}}>
                <User size={18} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={{textDecoration: 'none'}}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{textDecoration: 'none'}}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
