import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShieldCheck, GraduationCap, Users, ClipboardList, Search, Award, ExternalLink, Phone, BookOpen } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to hash section on mount
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [location.hash]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header variant="full" />

      {/* Hero */}
      <section className="landing-hero anim-fade-up">
        <h1>Find the Government Schemes You Are Eligible For</h1>
        <p>Access healthcare, education, and social welfare support with ease.</p>
        <button className="btn-get-started" onClick={() => navigate('/schemes')}>
          Getting Started
        </button>
      </section>

      {/* Feature Cards */}
      <div className="feature-cards">
        <div className="feature-card anim-fade-up d1">
          <div className="fc-icon"><ShieldCheck size={32} /></div>
          <h3>Healthcare</h3>
          <p>Discover medical assistance and health insurance programs tailored to your needs.</p>
        </div>
        <div className="feature-card anim-fade-up d2">
          <div className="fc-icon"><GraduationCap size={32} /></div>
          <h3>Education</h3>
          <p>Find scholarships, grants, and educational support for students of all ages.</p>
        </div>
        <div className="feature-card anim-fade-up d3">
          <div className="fc-icon"><Users size={32} /></div>
          <h3>Social Welfare</h3>
          <p>Explore pension, housing, and food security schemes designed to support your family.</p>
        </div>
      </div>

      {/* How it Works */}
      <section id="how-it-works" className="landing-section alt-bg">
        <div className="section-inner">
          <div className="anim-fade-up" style={{ textAlign: 'center' }}>
            <span className="section-tag">How it Works</span>
            <h2 className="section-title centered">Three Simple Steps</h2>
            <p className="section-sub centered">Our intelligent platform makes finding government schemes effortless.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card anim-fade-up d1">
              <div className="step-num">1</div>
              <h3>Enter Your Details</h3>
              <p>Fill in your age, income, state, and category to help us understand your profile.</p>
            </div>
            <div className="step-card anim-fade-up d2">
              <div className="step-num">2</div>
              <h3>Smart Matching</h3>
              <p>Our AI engine analyzes 3,000+ schemes and finds the ones you're eligible for instantly.</p>
            </div>
            <div className="step-card anim-fade-up d3">
              <div className="step-num">3</div>
              <h3>Get Detailed Results</h3>
              <p>View benefits, eligibility criteria, and step-by-step application instructions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="landing-section">
        <span className="section-tag anim-fade-up">About</span>
        <h2 className="section-title anim-fade-up">Empowering Citizens with Information</h2>
        <p className="section-sub anim-fade-up">SahayakAI bridges the gap between government welfare programs and the people who need them most.</p>
        <div className="about-content">
          <div className="about-text anim-slide-r">
            <h3>Our Mission</h3>
            <p>Millions of Indians miss out on government benefits simply because they don't know these schemes exist. SahayakAI uses artificial intelligence to match citizen profiles with the right schemes, making welfare accessible to everyone.</p>
            <h3>What We Cover</h3>
            <p>From agriculture subsidies and education scholarships to healthcare insurance and housing programs — we cover Central and State government schemes across every sector.</p>
          </div>
          <div className="about-stats anim-scale d2">
            <div className="stat-box"><span className="stat-num">3,400+</span><span className="stat-label">Schemes Listed</span></div>
            <div className="stat-box"><span className="stat-num">28+</span><span className="stat-label">States Covered</span></div>
            <div className="stat-box"><span className="stat-num">19</span><span className="stat-label">Sectors</span></div>
            <div className="stat-box"><span className="stat-num">AI</span><span className="stat-label">Powered Matching</span></div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="landing-section alt-bg">
        <div className="section-inner">
          <div className="anim-fade-up" style={{ textAlign: 'center' }}>
            <span className="section-tag">Resources</span>
            <h2 className="section-title centered">Helpful Links & Resources</h2>
            <p className="section-sub centered">Explore official portals and tools to learn more about government initiatives.</p>
          </div>
          <div className="resources-grid">
            <a href="https://www.myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="resource-card anim-fade-up d1">
              <h4><ExternalLink size={16} /> MyScheme Portal</h4>
              <p>Official Government of India portal for discovering and applying to welfare schemes.</p>
            </a>
            <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="resource-card anim-fade-up d2">
              <h4><BookOpen size={16} /> India.gov.in</h4>
              <p>National Portal of India with comprehensive information on all government services.</p>
            </a>
            <a href="https://www.digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="resource-card anim-fade-up d3">
              <h4><Award size={16} /> Digital India</h4>
              <p>Empowering citizens through digital infrastructure, governance, and services.</p>
            </a>
            <a href="https://pmjay.gov.in" target="_blank" rel="noopener noreferrer" className="resource-card anim-fade-up d4">
              <h4><ShieldCheck size={16} /> Ayushman Bharat</h4>
              <p>Health insurance coverage of ₹5 lakh per family for secondary and tertiary care.</p>
            </a>
            <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="resource-card anim-fade-up d5">
              <h4><GraduationCap size={16} /> National Scholarships</h4>
              <p>One-stop portal for scholarship schemes from Central and State governments.</p>
            </a>
            <div className="resource-card anim-fade-up d6">
              <h4><Phone size={16} /> Helpline: 1800-111-555</h4>
              <p>Toll-free government helpline for scheme-related queries and application support.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
