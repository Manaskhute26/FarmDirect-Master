import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, ShieldCheck, Package, MessageSquare, LogOut, Menu, X, Leaf
} from 'lucide-react';

// --- Admin Page Components ---
import Dashboard from '../pages/admin/pages/Dashboard.jsx';
import VerifyFarmers from '../pages/admin/VerifyFarmers.jsx';
import Products from '../pages/admin/pages/Products.jsx';
import Complaints from '../pages/admin/pages/Complaints.jsx';
import Accounts from '../pages/admin/pages/Accounts.jsx';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Verify Farmers', path: '/admin/verify-farmers', icon: ShieldCheck },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Complaints', path: '/admin/complaints', icon: MessageSquare },
  { label: 'Accounts', path: '/admin/accounts', icon: Users },
];

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white flex flex-col z-30 transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-700/60 flex items-center gap-3">
          <div className="h-9 w-9 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Leaf size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-white tracking-tight">FarmDirect</p>
            <p className="text-xs text-slate-400">Admin Control Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-700/60">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

const AdminApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar (mobile only) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>
          <span className="text-sm font-bold text-slate-800">Admin Panel</span>
          <div className="w-9" />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="verify-farmers" element={<VerifyFarmers />} />
            <Route path="products" element={<Products />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminApp;