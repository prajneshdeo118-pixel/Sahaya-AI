import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import FilterBar from '../components/FilterBar';
import SchemeCard from '../components/SchemeCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const PER_PAGE = 9;

function SchemesPage() {
  const [schemes, setSchemes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sector, setSector] = useState('All');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ search: '', state: 'All', age: '' });
  const [animKey, setAnimKey] = useState(0);

  const fetchSchemes = useCallback(async (sectorVal, stateVal, ageVal) => {
    setLoading(true);
    try {
      const body = { sector: sectorVal || 'All', state: stateVal || 'All', category: 'All' };
      if (ageVal) body.age = ageVal;
      const res = await axios.post(`${API_URL}/api/find-schemes`, body);
      if (res.data.success) setSchemes(res.data.schemes);
      else setSchemes([]);
    } catch { setSchemes([]); }
    finally { setLoading(false); setAnimKey((k) => k + 1); }
  }, []);

  useEffect(() => { fetchSchemes(sector, filters.state, filters.age); }, []);

  useEffect(() => {
    if (!filters.search.trim()) setFiltered(schemes);
    else {
      const q = filters.search.toLowerCase();
      setFiltered(schemes.filter((s) => s.name.toLowerCase().includes(q) || (s.benefit && s.benefit.toLowerCase().includes(q))));
    }
    setPage(1);
  }, [schemes, filters.search]);

  const handleSectorChange = (val) => { setSector(val); fetchSchemes(val, filters.state, filters.age); };
  const handleFilterChange = (key, value) => setFilters((p) => ({ ...p, [key]: value }));
  const handleApply = () => fetchSchemes(sector, filters.state, filters.age);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const changePage = (p) => { setPage(p); setAnimKey((k) => k + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const getPageNumbers = () => {
    const p = [];
    if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) p.push(i); }
    else {
      p.push(1);
      if (page > 3) p.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) p.push(i);
      if (page < totalPages - 2) p.push('...');
      p.push(totalPages);
    }
    return p;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header variant="full" />
      <div className="schemes-layout">
        <Sidebar active={sector} onSelect={handleSectorChange} />
        <main>
          <div className="anim-fade-up"><FilterBar filters={filters} onChange={handleFilterChange} onApply={handleApply} /></div>
          <div className="results-header anim-fade-up d2">
            <h2>Available Schemes</h2>
            <span>Showing {filtered.length} results</span>
          </div>
          {loading ? (
            <div className="loading-center"><div className="spinner" /><p>Loading schemes...</p></div>
          ) : displayed.length > 0 ? (
            <>
              <div className="schemes-grid" key={animKey}>
                {displayed.map((scheme, i) => (
                  <SchemeCard key={scheme.id} scheme={scheme} index={i} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="pagination anim-fade-up">
                  <button className="page-btn" disabled={page === 1} onClick={() => changePage(page - 1)}><ChevronLeft size={16} /></button>
                  {getPageNumbers().map((p, i) => p === '...' ? <span key={`e${i}`} className="page-ellipsis">...</span> : (
                    <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => changePage(p)}>{p}</button>
                  ))}
                  <button className="page-btn" disabled={page === totalPages} onClick={() => changePage(page + 1)}><ChevronRight size={16} /></button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-results anim-fade-up"><h3>No schemes found</h3><p>Try adjusting your filters or search terms.</p></div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default SchemesPage;
