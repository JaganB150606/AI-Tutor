import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1>Welcome to EduBot</h1>
        <p>Your personal AI-powered learning companion</p>
        <div className="cta-buttons">
          <Link to="/auth" className="cta-button primary">Sign Up</Link>
          <Link to="/auth" className="cta-button secondary">Log In</Link>
        </div>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <h3>Personalized Learning</h3>
          <p>Get customized study materials based on your grade level</p>
        </div>
        <div className="feature-card">
          <h3>AI Chatbot</h3>
          <p>Ask questions and get instant help from our AI assistant</p>
        </div>
        <div className="feature-card">
          <h3>Video Resources</h3>
          <p>Access curated educational videos for better understanding</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 