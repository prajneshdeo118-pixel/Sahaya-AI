import { useState } from 'react';
import { User, Banknote, Users, MapPin, Search } from 'lucide-react';

function SchemeForm({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    category: 'All',
    state: 'All'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="panel form-panel">
      <div className="form-header">
        <h2>Your Profile</h2>
        <p>Update details to refine your results</p>
      </div>

      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <div className="input-with-icon">
            <User className="input-icon" size={18} />
            <input
              type="number"
              id="age"
              name="age"
              className="form-control has-icon"
              placeholder="e.g. 25"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="income">Annual Income (₹)</label>
          <div className="input-with-icon">
            <Banknote className="input-icon" size={18} />
            <input
              type="number"
              id="income"
              name="income"
              className="form-control has-icon"
              placeholder="e.g. 300000"
              value={formData.income}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <div className="input-with-icon">
            <Users className="input-icon" size={18} />
            <select
              id="category"
              name="category"
              className="form-control has-icon"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="All">All Categories</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Banking">Banking</option>
              <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
              <option value="Education & Learning">Education & Learning</option>
              <option value="Financial Services and Insurance">Financial Services and Insurance</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Housing & Shelter">Housing & Shelter</option>
              <option value="IT & Communications">IT & Communications</option>
              <option value="Law & Justice">Law & Justice</option>
              <option value="Public Safety">Public Safety</option>
              <option value="Rural & Environment">Rural & Environment</option>
              <option value="Science">Science</option>
              <option value="Skills & Employment">Skills & Employment</option>
              <option value="Social welfare & Empowerment">Social welfare & Empowerment</option>
              <option value="Sports & Culture">Sports & Culture</option>
              <option value="Transport & Infrastructure">Transport & Infrastructure</option>
              <option value="Travel & Tourism">Travel & Tourism</option>
              <option value="Utility & Sanitation">Utility & Sanitation</option>
              <option value="Women and Child">Women and Child</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <div className="input-with-icon">
            <MapPin className="input-icon" size={18} />
            <select
              id="state"
              name="state"
              className="form-control has-icon"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="All">All Levels</option>
              <option value="Central">Central</option>
              <option value="State">State</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
          {loading ? (
            <div className="loading-spinner btn-spinner" />
          ) : (
            <>
              <Search size={18} /> Find Schemes
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default SchemeForm;