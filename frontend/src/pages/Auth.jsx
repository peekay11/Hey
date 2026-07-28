import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = import.meta.env.VITE_AWS_API_ENDPOINT;
      const action = isLogin ? 'login' : 'signup';
      const url = `${endpoint}auth/${action}`;
      
      const payload = isLogin 
        ? { username, password }
        : { username, email, password };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (!res.ok || data.status === 'ERROR') {
        throw new Error(data.message || 'Authentication failed');
      }

      if (isLogin) {
        // Successful login
        localStorage.setItem('hey_token', data.token);
        onLogin({ 
          username, 
          avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
          token: data.token
        });
      } else {
        // Successful signup, switch to login
        setIsLogin(true);
        setError("Account created! Please log in.");
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            {error && (
              <div style={{ backgroundColor: 'rgba(255, 51, 51, 0.1)', color: '#ff3333', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              required
            />
            {!isLogin && (
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
            )}
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
            <button type="submit" className="auth-submit-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "PLEASE WAIT..." : isLogin ? "LOG IN" : "SIGN UP"}
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
