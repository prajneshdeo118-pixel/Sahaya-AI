import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sprout, GraduationCap, HeartPulse, Users, Landmark, Home as HomeIcon, Briefcase, FileText } from 'lucide-react';

const CARD_COLORS = [
  { border: '#0d9488', bg: 'rgba(13,148,136,0.08)', text: '#0d9488' },   // teal
  { border: '#6366f1', bg: 'rgba(99,102,241,0.08)', text: '#6366f1' },   // indigo
  { border: '#ec4899', bg: 'rgba(236,72,153,0.08)', text: '#ec4899' },   // pink
  { border: '#f59e0b', bg: 'rgba(245,158,11,0.08)', text: '#f59e0b' },   // amber
  { border: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', text: '#8b5cf6' },   // violet
  { border: '#06b6d4', bg: 'rgba(6,182,212,0.08)', text: '#06b6d4' },    // cyan
  { border: '#10b981', bg: 'rgba(16,185,129,0.08)', text: '#10b981' },   // emerald
  { border: '#e8634a', bg: 'rgba(232,99,74,0.08)', text: '#e8634a' },    // coral
  { border: '#3b82f6', bg: 'rgba(59,130,246,0.08)', text: '#3b82f6' },   // blue
  { border: '#d946ef', bg: 'rgba(217,70,239,0.08)', text: '#d946ef' },   // fuchsia
];

function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h + id.charCodeAt(i)) | 0;
  return Math.abs(h) % CARD_COLORS.length;
}

const ICON_MAP = {
  'Agriculture': Sprout,
  'Education & Learning': GraduationCap,
  'Health & Wellness': HeartPulse,
  'Social welfare & Empowerment': Users,
  'Banking': Landmark,
  'Housing & Shelter': HomeIcon,
  'Business & Entrepreneurship': Briefcase,
};

function getSchemeIcon(categories) {
  for (const cat of categories) {
    if (ICON_MAP[cat]) return ICON_MAP[cat];
  }
  return FileText;
}

function getCardTags(scheme) {
  const tags = [];
  if (scheme.category?.length > 0) tags.push(scheme.category[0]);
  if (scheme.age_min !== null) tags.push(`Age ${scheme.age_min}+`);
  else tags.push('All Ages');
  if (scheme.income_limit !== null) {
    const f = scheme.income_limit >= 100000
      ? `₹${(scheme.income_limit / 100000).toFixed(1)}L`
      : `₹${scheme.income_limit.toLocaleString('en-IN')}`;
    tags.push(`Income < ${f}`);
  }
  return tags.slice(0, 3);
}

function SchemeCard({ scheme, index }) {
  const navigate = useNavigate();
  const isState = scheme.state.includes('State') && !scheme.state.includes('Central');
  const Icon = getSchemeIcon(scheme.category);
  const tags = getCardTags(scheme);
  const color = CARD_COLORS[hashId(scheme.id)];
  const delay = `${0.05 * (index % 9)}s`;

  return (
    <div
      className="scheme-card anim-fade-up"
      style={{ borderLeftColor: color.border, animationDelay: delay }}
    >
      <div className="card-top">
        <div className="card-icon" style={{ background: color.bg, color: color.text }}>
          <Icon size={20} />
        </div>
        <span className={`card-badge ${isState ? 'badge-state' : 'badge-central'}`}>
          {isState ? 'State Govt' : 'Central Govt'}
        </span>
      </div>

      <h3 title={scheme.name}>{scheme.name}</h3>
      <p className="card-desc">{scheme.benefit}</p>

      <div className="card-tags">
        {tags.map((tag) => (
          <span key={tag} className="card-tag">{tag}</span>
        ))}
      </div>

      <button className="view-details" style={{ color: color.text }} onClick={() => navigate(`/scheme/${scheme.id}`, { state: { scheme } })}>
        View Details <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default SchemeCard;