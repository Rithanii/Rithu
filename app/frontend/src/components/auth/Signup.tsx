import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/react.svg'; // Use your own logo if available

const Signup: React.FC = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm_password: '' });
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirm_password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string; confirm_password?: string } = {};
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!form.confirm_password) newErrors.confirm_password = 'Please confirm your password';
    else if (form.password !== form.confirm_password) newErrors.confirm_password = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setMessage({ type: 'success', text: 'Signup successful! You can now log in.' });
      }, 1200);
    }
  };

  return (
    <div className="auth-bg flex items-center justify-center">
      <div className="auth-card">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h2 className="auth-title">Sign Up</h2>
        {message && (
          <div className={message.type === 'error' ? 'auth-error' : 'auth-success'}>{message.text}</div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-label="Signup form">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="auth-input"
              aria-required="true"
              aria-invalid={!!errors.username}
              autoComplete="username"
            />
            {errors.username && <p className="auth-error">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="auth-input"
              aria-required="true"
              aria-invalid={!!errors.email}
              autoComplete="email"
            />
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="auth-input pr-10"
                aria-required="true"
                aria-invalid={!!errors.password}
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p className="auth-error">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirm_password" className="block text-gray-700 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                id="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                className="auth-input pr-10"
                aria-required="true"
                aria-invalid={!!errors.confirm_password}
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirm_password && <p className="auth-error">{errors.confirm_password}</p>}
          </div>
          <button
            type="submit"
            className={`auth-btn flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <span className="animate-spin mr-2">🔄</span> : null}
            Signup
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 