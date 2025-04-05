import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    standard: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your backend
    if (!isLogin && !formData.standard) {
      alert('Please select your standard');
      return;
    }
    
    // After successful authentication, navigate to assessment
    if (!isLogin) {
      navigate('/assessment');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="standard">Select Your Standard</label>
              <select
                id="standard"
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                required
              >
                <option value="">Select Standard</option>
                {[1, 2, 3, 4, 5].map(grade => (
                  <option key={grade} value={grade}>{grade}st Standard</option>
                ))}
              </select>
            </div>
          )}
          <button type="submit" className="submit-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage; 