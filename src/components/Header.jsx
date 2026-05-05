import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="SmartReads" className="logo-img" />
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/esports" 
                className={`nav-link ${isActive('/esports') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Esports
              </Link>
            </li>
            <li>
              <Link 
                to="/food" 
                className={`nav-link ${isActive('/food') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Food
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`nav-link ${isActive('/history') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                History
              </Link>
            </li>
            <li>
              <Link 
                to="/culture" 
                className={`nav-link ${isActive('/culture') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Culture
              </Link>
            </li>
            <li>
              <Link 
                to="/entertainment" 
                className={`nav-link ${isActive('/entertainment') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Entertainment
              </Link>
            </li>
            <li>
              <Link 
                to="/health" 
                className={`nav-link ${isActive('/health') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Health
              </Link>
            </li>
            <li>
              <Link 
                to="/money" 
                className={`nav-link ${isActive('/money') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Money
              </Link>
            </li>
            <li>
              <Link 
                to="/travel" 
                className={`nav-link ${isActive('/travel') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Travel
              </Link>
            </li>
            <li>
              <Link 
                to="/tech" 
                className={`nav-link ${isActive('/tech') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tech
              </Link>
            </li>
            <li>
              <Link 
                to="/war" 
                className={`nav-link ${isActive('/war') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                War
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}

export default Header;
