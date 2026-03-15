import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layers, AlertCircle, CheckCircle } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    // Simulate API call for login
    setTimeout(() => {
      setLoading(false);
      
      // Generic email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailRegex.test(formData.email)) {
        // Successful login for any valid email
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        const userName = location.state?.registeredName || formData.email.split('@')[0];
        localStorage.setItem('userName', userName);
        navigate('/dashboard');
      } else {
        setError('Please enter a valid email address.');
      }
    }, 1200);
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
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your research</p>
        </div>

        {error && (
          <div className="error-toast animate-slide-up">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {successMsg && (
          <div className="error-toast animate-slide-up" style={{ background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)', color: '#86efac' }}>
            <CheckCircle size={18} />
            {successMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>
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

          <div className="form-group" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
              <a href="#" className="auth-link" style={{ fontSize: '0.85rem' }}>Forgot password?</a>
            </div>
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

          <button type="submit" className="glass-button" style={{ width: '100%' }} disabled={loading}>
            {loading ? <div className="loader-spinner" /> : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
