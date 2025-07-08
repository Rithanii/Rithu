import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/react.svg'; // Use your own logo if available

const Login: React.FC = () => {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '', remember: false });
  const [errors, setErrors] = useState<{ usernameOrEmail?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const validate = () => {
    const newErrors: { usernameOrEmail?: string; password?: string } = {};
    if (!form.usernameOrEmail) newErrors.usernameOrEmail = 'Username or Email is required';
    if (!form.password) newErrors.password = 'Password is required';
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
        // Example: always fail for now
        setMessage({ type: 'error', text: 'Invalid credentials. Please try again.' });
      }, 1200);
    }
  };

  return (
    <div className="auth-bg flex items-center justify-center">
      <div className="auth-card">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h2 className="auth-title">Login</h2>
        {message && (
          <div className={message.type === 'error' ? 'auth-error' : 'auth-success'}>{message.text}</div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-label="Login form">
          <div>
            <label htmlFor="usernameOrEmail" className="block text-gray-700 font-medium">Username or Email</label>
            <input
              id="usernameOrEmail"
              type="text"
              name="usernameOrEmail"
              value={form.usernameOrEmail}
              onChange={handleChange}
              className="auth-input"
              aria-required="true"
              aria-invalid={!!errors.usernameOrEmail}
              autoComplete="username"
            />
            {errors.usernameOrEmail && <p className="auth-error">{errors.usernameOrEmail}</p>}
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
                autoComplete="current-password"
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
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">Remember Me</span>
            </label>
            <Link to="/forgot-password" className="auth-link text-sm">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className={`auth-btn flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <span className="animate-spin mr-2">🔄</span> : null}
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="auth-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 