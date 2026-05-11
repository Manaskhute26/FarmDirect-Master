import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Leaf,
  User,
  Mail,
  Lock,
  MapPin,
  Hash,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/auth';

/**
 * ConsumerRegistration — Simple consumer sign-up
 *
 * Fields: Full Name, Email, Password, Delivery Address, Pin Code.
 * Posts JSON to /api/auth/register/consumer.
 * On success, redirects to /login with a success message.
 */
const ConsumerRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    pinCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_BASE}/register/consumer`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        pinCode: formData.pinCode,
      });

      navigate('/login', {
        replace: true,
        state: { message: 'Account created successfully! Please sign in.' },
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* ── Decorative Orbs ── */}
      <div className="floating-orb w-96 h-96 bg-indigo-500/30 -top-36 -left-36" />
      <div className="floating-orb w-72 h-72 bg-primary-500/25 -bottom-20 -right-20" style={{ animationDelay: '6s' }} />
      <div className="floating-orb w-48 h-48 bg-violet-400/20 top-1/3 right-1/4" style={{ animationDelay: '11s' }} />

      <div className="w-full max-w-md relative z-10">
        {/* ── Brand Header ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 mb-4">
            <Leaf className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Farm<span className="text-primary-400">Direct</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Register as a Consumer — Buy fresh produce
          </p>
        </div>

        {/* ── Registration Card ── */}
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-8 space-y-5"
          id="consumer-register-form"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">Create your account</h2>
            <p className="text-slate-400 text-sm mt-1">Start shopping farm-fresh produce today</p>
          </div>

          {/* ── Error Banner ── */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm flex items-start gap-2">
              <span className="shrink-0 mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* ── Full Name ── */}
          <div className="space-y-2">
            <label htmlFor="consumer-name" className="text-sm font-medium text-slate-300">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="consumer-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Priya Sharma"
                value={formData.name}
                onChange={handleChange}
                className="input-field w-full rounded-xl py-3 pl-11 pr-4 text-sm"
              />
            </div>
          </div>

          {/* ── Email ── */}
          <div className="space-y-2">
            <label htmlFor="consumer-email" className="text-sm font-medium text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="consumer-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="priya@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full rounded-xl py-3 pl-11 pr-4 text-sm"
              />
            </div>
          </div>

          {/* ── Password ── */}
          <div className="space-y-2">
            <label htmlFor="consumer-password" className="text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="consumer-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="input-field w-full rounded-xl py-3 pl-11 pr-11 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* ── Delivery Address ── */}
          <div className="space-y-2">
            <label htmlFor="consumer-address" className="text-sm font-medium text-slate-300">
              Delivery Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <textarea
                id="consumer-address"
                name="address"
                required
                rows={2}
                placeholder="123 Green Lane, Sector 5, Pune"
                value={formData.address}
                onChange={handleChange}
                className="input-field w-full rounded-xl py-3 pl-11 pr-4 text-sm resize-none"
              />
            </div>
          </div>

          {/* ── Pin Code ── */}
          <div className="space-y-2">
            <label htmlFor="consumer-pinCode" className="text-sm font-medium text-slate-300">
              Location Pin Code
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="consumer-pinCode"
                name="pinCode"
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]{5,6}"
                maxLength={6}
                placeholder="411001"
                value={formData.pinCode}
                onChange={handleChange}
                className="input-field w-full rounded-xl py-3 pl-11 pr-4 text-sm"
              />
            </div>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={loading}
            id="consumer-register-submit-btn"
            className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account…
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* ── Footer Link ── */}
          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Sign in →
            </Link>
          </p>
        </form>

        {/* ── Subtle Footer ── */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} FarmDirect · Empowering farmers, feeding communities.
        </p>
      </div>
    </div>
  );
};

export default ConsumerRegistration;
