import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/dashboard" className="navbar-brand">
                    <span className="brand-icon">📔</span>
                    Life Logger
                </Link>

                <div className="navbar-links">
                    <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                        Dashboard
                    </Link>
                    <Link to="/journals" className={isActive('/journals') ? 'active' : ''}>
                        Journals
                    </Link>
                    <Link to="/memories" className={isActive('/memories') ? 'active' : ''}>
                        Memories
                    </Link>
                    <Link to="/tastes" className={isActive('/tastes') ? 'active' : ''}>
                        Tastes
                    </Link>
                    <Link to="/places" className={isActive('/places') ? 'active' : ''}>
                        Places
                    </Link>
                    <Link to="/photos" className={isActive('/photos') ? 'active' : ''}>
                        Photos
                    </Link>
                    <Link to="/phases" className={isActive('/phases') ? 'active' : ''}>
                        Life Phases
                    </Link>
                </div>

                <div className="navbar-user">
                    <span className="username">👤 {user?.username}</span>
                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
