import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Route based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'consumer') {
        navigate('/consumer');
      } else if (user.role === 'farmer') {
        if (user.status === 'pending') {
          navigate('/pending-approval');
        } else if (user.status === 'approved') {
          navigate('/farmer');
        } else {
          setError('Your account is not approved.');
        }
      } else {
        navigate('/unauthorized');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid credentials or server error.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
          FarmDirect Login
        </h2>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm text-sm" role="alert">
            <p className="font-bold">Login Failed</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors shadow-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors shadow-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 flex flex-col space-y-3 text-center text-sm text-gray-600 border-t border-gray-100 pt-6">
          <p>
            New Farmer? <Link to="/register/farmer" className="font-semibold text-green-600 hover:text-green-500 hover:underline transition-colors">Register here</Link>
          </p>
          <p>
            New Consumer? <Link to="/register/consumer" className="font-semibold text-green-600 hover:text-green-500 hover:underline transition-colors">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
