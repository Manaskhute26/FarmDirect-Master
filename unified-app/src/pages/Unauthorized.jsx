import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';

/**
 * Unauthorized — Shown when a user tries to access a route
 * their role doesn't have permission for.
 */
const Unauthorized = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const dashboardMap = {
    admin: '/admin',
    farmer: '/farmer',
    consumer: '/consumer',
  };

  const handleGoBack = () => {
    const home = dashboardMap[role] || '/login';
    navigate(home, { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center px-4 relative overflow-hidden">
      {/* ── Decorative Orbs ── */}
      <div className="floating-orb w-80 h-80 bg-red-500/20 -top-28 -right-28" />
      <div className="floating-orb w-64 h-64 bg-indigo-500/20 -bottom-20 -left-20" style={{ animationDelay: '8s' }} />

      <div className="glass-card rounded-2xl p-10 max-w-md w-full text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 mb-6">
          <ShieldAlert className="w-8 h-8 text-red-400" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          You don&apos;t have permission to view this page. If you believe this is an
          error, please contact your administrator.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGoBack}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white bg-white/10 border border-white/10 hover:bg-white/15 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            My Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
