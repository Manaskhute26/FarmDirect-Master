import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, LogOut, Leaf } from 'lucide-react';

/**
 * PendingApproval — Shown to farmers whose verificationStatus is "pending".
 *
 * This is a limbo screen that tells the farmer their documents are under
 * review by an admin. They can log out or wait.
 */
const PendingApproval = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('verificationStatus');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center px-4 relative overflow-hidden">
      {/* ── Decorative Orbs ── */}
      <div className="floating-orb w-80 h-80 bg-amber-500/20 -top-28 -left-28" />
      <div className="floating-orb w-64 h-64 bg-primary-500/20 -bottom-20 -right-20" style={{ animationDelay: '8s' }} />

      <div className="w-full max-w-lg relative z-10">
        {/* ── Brand ── */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-500/20 border border-primary-400/30 mb-3">
            <Leaf className="w-7 h-7 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Farm<span className="text-primary-400">Direct</span>
          </h1>
        </div>

        {/* ── Card ── */}
        <div className="glass-card rounded-2xl p-10 text-center">
          {/* Animated Clock Icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/15 border border-amber-500/25 mb-6">
            <Clock className="w-9 h-9 text-amber-400 animate-pulse" />
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-400/40 animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Verification In Progress
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto mb-2">
            Your documents are under review by our Admin team. This process
            typically takes <span className="text-white font-medium">24–48 hours</span>.
          </p>

          <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto mb-8">
            You&apos;ll receive an email once your account has been approved.
            After that, you can log in and start listing your produce.
          </p>

          {/* Status Timeline */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary-500 shadow-lg shadow-primary-500/40" />
              <span className="text-[10px] text-primary-400 font-medium uppercase tracking-wider">Registered</span>
            </div>
            <div className="w-10 h-0.5 bg-amber-500/40 rounded-full" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/40 animate-pulse" />
              <span className="text-[10px] text-amber-400 font-medium uppercase tracking-wider">Under Review</span>
            </div>
            <div className="w-10 h-0.5 bg-white/10 rounded-full" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/15" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Approved</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* ── Subtle Footer ── */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} FarmDirect · Empowering farmers, feeding communities.
        </p>
      </div>
    </div>
  );
};

export default PendingApproval;
