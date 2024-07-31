import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginSignup.css';
import { useAuth } from '../components/AuthContext';

const LoginSignup = () => {
  const navigate = useNavigate();
  const { user, login, loginAsAdmin } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    newPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');

    const backend = 'https://capstone-project-shop-verse.onrender.com';
    const endpoint = `${backend}/api/auth/forgot-password`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, newPassword: formData.newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    const backend = 'https://capstone-project-shop-verse.onrender.com';
    const endpoint = isLogin ? `${backend}/api/auth/login` : `${backend}/api/auth/register`;
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        if (isLogin) {
          login(data.user);
          if (data.user?.isAdmin) {
            loginAsAdmin(data.user);
            return navigate("/addproducts");
          }

          navigate('/');
        }
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit} className="form-login">
        <ul className="login-nav">
          <li className={`login-nav__item ${isLogin ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); setIsForgotPassword(false); }}>Sign In</a>
          </li>
          <li className={`login-nav__item ${!isLogin ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); setIsForgotPassword(false); }}>Sign Up</a>
          </li>
        </ul>
        {isForgotPassword ? (
          <>
            <label htmlFor="forgot-input-email" className="login__label">
              Email
            </label>
            <input
              id="forgot-input-email"
              className="login__input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="forgot-input-new-password" className="login__label">
              New Password
            </label>
            <input
              id="forgot-input-new-password"
              className="login__input"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <button className="login__submit">Reset Password</button>
          </>
        ) : isLogin ? (
          <>
            <label htmlFor="login-input-email" className="login__label">
              Email
            </label>
            <input
              id="login-input-email"
              className="login__input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="login-input-password" className="login__label">
              Password
            </label>
            <input
              id="login-input-password"
              className="login__input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="login-sign-up" className="login__label--checkbox">
              <input id="login-sign-up" type="checkbox" className="login__input--checkbox" />
              Keep me Signed in
            </label>
            <button className="login__submit">Sign in</button>
          </>
        ) : (
          <>
            <label htmlFor="signup-input-user" className="login__label">
              Username
            </label>
            <input
              id="signup-input-user"
              className="login__input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="signup-input-email" className="login__label">
              Email
            </label>
            <input
              id="signup-input-email"
              className="login__input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="signup-input-password" className="login__label">
              Password
            </label>
            <input
              id="signup-input-password"
              className="login__input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="signup-confirm-password" className="login__label">
              Confirm Password
            </label>
            <input
              id="signup-confirm-password"
              className="login__input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button className="login__submit">Sign Up</button>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
      </form>
      <ToastContainer />
      {!isForgotPassword && (
        <a href="#" className="login__forgot" onClick={(e) => { e.preventDefault(); setIsForgotPassword(true); }}>Forgot Password?</a>
      )}
    </div>
  );
};

export default LoginSignup;
