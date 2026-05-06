import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Sparkles, BookOpen, CheckCircle, ClipboardList, Info } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function SchemeDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const scheme = state?.scheme;
  const [explanation, setExplanation] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState('');

  if (!scheme) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header variant="full" />
        <div className="detail-page"><div className="empty-results"><h3>Scheme not found</h3><p>Please go back and select a scheme.</p>
          <button className="back-btn" style={{ marginTop: '1rem' }} onClick={() => navigate('/schemes')}><ArrowLeft size={16} /> Back to Schemes</button>
        </div></div>
        <Footer />
      </div>
    );
  }

  const isState = scheme.state.includes('State') && !scheme.state.includes('Central');

  const handleExplain = async () => {
    if (explanation) return;
    setLoadingAI(true); setAiError('');
    try {
      const res = await axios.post(`${API_URL}/api/explain-scheme`, {
        schemeName: scheme.name,
        schemeDetails: (scheme.benefit || '') + ' ' + (scheme.eligibility || ''),
      });
      if (res.data.success) setExplanation(res.data.explanation);
      else setAiError(res.data.message || 'Failed to explain');
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.message?.includes('API Key'))
        setAiError('Hugging Face API Key is missing on the server.');
      else setAiError('Failed to connect to the explainer service.');
    } finally { setLoadingAI(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header variant="full" />
      <div className="detail-page">
        <button className="back-btn anim-fade" onClick={() => navigate('/schemes')}><ArrowLeft size={16} /> Back to Schemes</button>

        <div className="detail-header anim-fade-up">
          <h1>{scheme.name}</h1>
          <div className="detail-badges">
            <span className={`card-badge ${isState ? 'badge-state' : 'badge-central'}`}>{isState ? 'State Govt' : 'Central Govt'}</span>
            {scheme.category.map((c) => <span key={c} className="card-tag">{c}</span>)}
          </div>
        </div>

        <div className="detail-section anim-fade-up d1">
          <div className="detail-meta">
            <div className="meta-item"><label>Income Limit</label><span>{scheme.income_limit !== null ? `₹${scheme.income_limit.toLocaleString('en-IN')}` : 'No limit'}</span></div>
            <div className="meta-item"><label>Minimum Age</label><span>{scheme.age_min !== null ? `${scheme.age_min} years` : 'No restriction'}</span></div>
          </div>
        </div>

        {scheme.benefit && (
          <div className="detail-section anim-fade-up d2">
            <h2><BookOpen size={18} /> Key Benefit</h2>
            <p>{scheme.benefit}</p>
          </div>
        )}

        {scheme.eligibility && (
          <div className="detail-section anim-fade-up d3">
            <h2><CheckCircle size={18} /> Eligibility</h2>
            <p>{scheme.eligibility}</p>
          </div>
        )}

        {scheme.apply_steps?.length > 0 && (
          <div className="detail-section anim-fade-up d4">
            <h2><ClipboardList size={18} /> How to Apply</h2>
            <ol>{scheme.apply_steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
          </div>
        )}

        <div className="detail-section anim-fade-up d5">
          <h2><Info size={18} /> AI Explanation</h2>
          {!explanation && !aiError && (
            <button className="btn-explain" onClick={handleExplain} disabled={loadingAI}>
              {loadingAI ? <><div className="spinner spinner-sm" /> Generating...</> : <><Sparkles size={16} /> Explain in Simple Terms</>}
            </button>
          )}
          {aiError && <div className="ai-box ai-error"><p>{aiError}</p></div>}
          {explanation && <div className="ai-box"><h4><Sparkles size={14} /> Simple Explanation</h4><p>{explanation}</p></div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SchemeDetailPage;
