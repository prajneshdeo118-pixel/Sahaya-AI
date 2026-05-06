import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';

function Header({ variant = 'full' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#' + hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-logo" onClick={() => { navigate('/'); setMenuOpen(false); }}>
          <Home size={22} />
          <span>Sahayak Ai</span>
        </div>

        {variant === 'full' && (
          <>
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <nav className={`header-nav${menuOpen ? ' open' : ''}`}>
              <a href="/schemes" className={location.pathname === '/schemes' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('/schemes'); setMenuOpen(false); }}>Find Schemes</a>
              <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')}>How it Works</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
              <a href="#resources" onClick={(e) => handleNavClick(e, 'resources')}>Resources</a>
            </nav>
          </>
        )}

        <button className="btn-try-now" onClick={() => { navigate('/schemes'); setMenuOpen(false); }}>
          Try Now
        </button>
      </div>
    </header>
  );
}

export default Header;
