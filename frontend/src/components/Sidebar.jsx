import { LayoutGrid, Sprout, GraduationCap, HeartPulse, Users } from 'lucide-react';

const categories = [
  { label: 'All Schemes', value: 'All', icon: LayoutGrid },
  { label: 'Agriculture', value: 'Agriculture', icon: Sprout },
  { label: 'Education', value: 'Education & Learning', icon: GraduationCap },
  { label: 'Health', value: 'Health & Wellness', icon: HeartPulse },
  { label: 'Social Welfare', value: 'Social welfare & Empowerment', icon: Users },
];

function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      <h3>Categories</h3>
      <p className="sidebar-sub">Filter by sector</p>
      <ul className="sidebar-list">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <li
              key={cat.value}
              className={`sidebar-item${active === cat.value ? ' active' : ''}`}
              onClick={() => onSelect(cat.value)}
            >
              <Icon size={18} />
              {cat.label}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
