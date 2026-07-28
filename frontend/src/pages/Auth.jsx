import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      // Mock login process
      onLogin({ username, avatar: 'https://i.pravatar.cc/150?img=11' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left Side: Form */}
        <div className="auth-left">
          <div className="auth-logo-container">
            <h1 className="auth-brand">Hey</h1>
          </div>
          
          <h2 className="auth-title">Welcome to Hey</h2>
          <p className="auth-subtitle">
            {isLogin ? "Please login to your account" : "Create your new account"}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
            <button type="submit" className="auth-submit-btn">
              {isLogin ? "LOG IN" : "SIGN UP"}
            </button>
          </form>

          {isLogin && <a href="#" className="auth-forgot">Forgot password?</a>}

          <div className="auth-switch">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button 
              type="button" 
              className="auth-switch-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "CREATE NEW" : "SIGN IN"}
            </button>
          </div>
        </div>

        {/* Right Side: Gradient Banner */}
        <div className="auth-right">
          <h2 className="auth-right-title">Connecting communities with a Hey</h2>
          <p className="auth-right-text">
            Join a vibrant global community of creators, thinkers, and explorers. Share your moments, discover new conversations, and connect with the people who matter most to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
