import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

function SchemeCard({ scheme }) {
  const [explanation, setExplanation] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState('');

  const handleExplain = async () => {
    if (explanation) return;

    setLoadingAI(true);
    setAiError('');

    try {
      const response = await axios.post('http://localhost:5000/api/explain-scheme', {
        schemeName: scheme.name,
        schemeDetails: scheme.benefit + ' ' + scheme.eligibility
      });

      if (response.data.success) {
        setExplanation(response.data.explanation);
      } else {
        setAiError(response.data.message || 'Failed to explain');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message.includes('API Key')) {
        setAiError("Hugging Face API Key is missing on the server. Please manually add it to test this feature.");
      } else {
        setAiError("Failed to connect to the explainer service.");
      }
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="panel scheme-card">
      <div className="card-header">
        <h3 title={scheme.name || 'Government Scheme'}>{scheme.name || 'Government Scheme'}</h3>
        <div className="tag-container">
          {scheme.category.map(cat => (
            <span key={cat} className="tag">{cat === 'All' ? 'All Categories' : cat}</span>
          ))}
          {scheme.state.map(st => (
            <span key={st} className="tag">{st === 'All' ? 'Central' : st}</span>
          ))}
        </div>
      </div>

      <div className="card-body">
        {scheme.benefit && scheme.benefit.trim() !== '' && (
          <div className="card-info">
            <strong>Key Benefit</strong>
            <p>{scheme.benefit}</p>
          </div>
        )}

        {scheme.eligibility && scheme.eligibility.trim() !== '' && (
          <div className="card-info" style={{ marginBottom: '1.5rem' }}>
            <strong>Eligibility Focus</strong>
            <p>{scheme.eligibility}</p>
          </div>
        )}

        {scheme.apply_steps && scheme.apply_steps.length > 0 && (
          <div className="apply-steps">
            <strong>How to Apply</strong>
            <ol>
              {scheme.apply_steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {!explanation && !aiError && (
        <button
          onClick={handleExplain}
          className="btn btn-outline"
          disabled={loadingAI}
        >
          {loadingAI ? <div className="loading-spinner btn-spinner" /> : <><Sparkles size={18} /> Explain in Simple Terms</>}
        </button>
      )}

      {aiError && (
        <div className="ai-explain-box error-box">
          <p>{aiError}</p>
        </div>
      )}

      {explanation && (
        <div className="ai-explain-box">
          <strong className="ai-title"><Sparkles size={16} /> AI Explanation</strong>
          <p style={{ color: 'var(--text-main)' }}>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default SchemeCard;