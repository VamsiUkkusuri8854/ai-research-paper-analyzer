import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, AlertCircle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    // Simulate API call for registration
    setTimeout(() => {
      setLoading(false);
      // In a real app, you'd save the token and navigate to dashboard
      // For this demo, we'll just redirect to login on success
      navigate('/login', { state: { message: 'Registration successful! Please login.', registeredName: formData.name } });
    }, 1500);
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <div className="nav-brand" style={{ justifyContent: 'center', marginBottom: '1.5rem', display: 'flex' }}>
            <div className="insights-icon-glow">
              <Layers size={24} />
            </div>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the professional research community</p>
        </div>

        {error && (
          <div className="error-toast animate-slide-up">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="glass-input"
              placeholder="Dr. Jane Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="glass-input"
              placeholder="name@institution.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="glass-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2.5rem' }}>
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="glass-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="glass-button" style={{ width: '100%' }} disabled={loading}>
            {loading ? <div className="loader-spinner" /> : 'Get Started'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
