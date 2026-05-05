import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">BlogSpace</Link>
            <p className="footer-description">
              A platform dedicated to sharing powerful stories from the crossroads of history, war, and human experience. 
              Real narratives that shape our understanding of the world.
            </p>
            <div className="footer-social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/esports" className="footer-link">Esports</Link></li>
              <li><Link to="/food" className="footer-link">Food</Link></li>
              <li><Link to="/entertainment" className="footer-link">Entertainment</Link></li>
              <li><Link to="/health" className="footer-link">Health</Link></li>
              <li><Link to="/money" className="footer-link">Money</Link></li>
              <li><Link to="/travel" className="footer-link">Travel</Link></li>
              <li><Link to="/tech" className="footer-link">Tech</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>About</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Our Story</Link></li>
              <li><Link to="/" className="footer-link">Write for Us</Link></li>
              <li><Link to="/" className="footer-link">Partner With Us</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/" className="footer-link">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} BlogSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
