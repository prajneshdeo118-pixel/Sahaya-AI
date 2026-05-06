import { Search, SlidersHorizontal } from 'lucide-react';

const STATES = [
  'All States',
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra',
  'Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim',
  'Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu',
  'Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry',
];

function FilterBar({ filters, onChange, onApply }) {
  return (
    <div className="filter-bar">
      <div className="filter-group" style={{ flex: 2 }}>
        <label>Search Schemes</label>
        <div className="filter-search-wrap">
          <Search size={16} />
          <input
            className="filter-input"
            type="text"
            placeholder="e.g., Housing, Scholarship..."
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>State</label>
        <select
          className="filter-input"
          value={filters.state}
          onChange={(e) => onChange('state', e.target.value)}
        >
          {STATES.map((s) => (
            <option key={s} value={s === 'All States' ? 'All' : s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="filter-group" style={{ flex: 0.5, minWidth: 80 }}>
        <label>Age</label>
        <input
          className="filter-input"
          type="number"
          placeholder="Years"
          min="1"
          value={filters.age}
          onChange={(e) => onChange('age', e.target.value)}
        />
      </div>

      <button className="btn-apply" onClick={onApply}>
        <SlidersHorizontal size={16} />
        Apply Filters
      </button>
    </div>
  );
}

export default FilterBar;
