import { useState, useEffect } from 'react';
import axios from 'axios';
import SchemeForm from './components/SchemeForm';
import SchemeCard from './components/SchemeCard';
import { Moon, Sun, ArrowRight, ShieldCheck } from 'lucide-react';
import './index.css';

function App() {
  const [schemes, setSchemes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showApp, setShowApp] = useState(false); // Controls Landing Page vs Main App
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      root.classList.add('dark');
    } else {
      setTheme('light');
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = async (profile) => {
    setLoading(true);
    setHasSearched(true);
    setCurrentPage(1);
    try {
      const response = await axios.post('http://localhost:5000/api/find-schemes', profile);
      if (response.data.success) {
        setSchemes(response.data.schemes);
      } else {
        setSchemes([]);
      }
    } catch (error) {
      console.error("Failed to fetch schemes:", error);
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  // --- LANDING PAGE ---
  if (!showApp) {
    return (
      <div className="app-wrapper landing-wrapper">
        <header className="app-header header-floating fade-in">
          <div className="logo-container">
            <ShieldCheck size={28} color="var(--primary)" />
            <h1>SahayakAI</h1>
          </div>
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Dark Mode">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </header>

        <main className="hero-section fade-in-up">
          <h1 className="hero-title">
            Discover Government Schemes <br />
            <span className="text-gradient">Tailored For You.</span>
          </h1>
          <p className="hero-subtitle">
            Our intelligent AI platform securely matches your profile with hundreds of financial and social benefits in seconds.
          </p>
          <button className="btn btn-primary btn-large pulse-hover" onClick={() => setShowApp(true)}>
            Get Started <ArrowRight size={20} className="arrow-icon" />
          </button>
        </main>
      </div>
    );
  }

  // --- MAIN APP ---
  const totalPages = Math.ceil(schemes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedSchemes = schemes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="app-wrapper fade-in">
      <div className="container">
        <header className="app-header fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="logo-container" onClick={()=>{
            setShowApp(false)
          }}>
            <ShieldCheck size={28} color="var(--primary)" />
            <div>
              <h1>SahayakAI</h1>
              <p className="subtitle">Government Scheme Finder</p>
            </div>
          </div>
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Dark Mode">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </header>

        <div className="content-grid">
          {/* Left Panel: Filters */}
          <aside className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <SchemeForm onSearch={handleSearch} loading={loading} />
          </aside>

          {/* Right Panel: Results */}
          <main className="fade-in-up" style={{ animationDelay: '0.3s' }}>
            {!hasSearched ? (
              <div className="empty-state panel">
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                </div>
                <h3>Fill your profile to begin</h3>
                <p style={{ color: 'var(--text-muted)' }}>Enter your details on the left to discover financial and social benefits suitable for you.</p>
              </div>
            ) : loading ? (
              <div className="empty-state panel">
                <div className="loading-spinner large-spinner"></div>
                <p className="loading-text">Analyzing eligibility criteria...</p>
              </div>
            ) : schemes.length > 0 ? (
              <div className="schemes-container">
                <div className="schemes-list">
                  {displayedSchemes.map((scheme, index) => (
                    <div key={scheme.id} className="fade-in-up" style={{ animationDelay: `${0.1 * (index % ITEMS_PER_PAGE)}s` }}>
                      <SchemeCard scheme={scheme} />
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', marginBottom: '2rem' }}>
                    <button 
                      className="btn" 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{ 
                        opacity: currentPage === 1 ? 0.5 : 1, 
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      Previous
                    </button>
                    <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      style={{ 
                        opacity: currentPage === totalPages ? 0.5 : 1, 
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' 
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-state panel" style={{ border: '1px solid var(--danger)', backgroundColor: 'var(--danger-bg)' }}>
                <div className="icon-wrapper danger-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <h3 style={{ color: 'var(--danger)' }}>No schemes found</h3>
                <p style={{ color: 'var(--text-muted)' }}>We couldn't find any exact matches for your criteria. Try loosening your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;