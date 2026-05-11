import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, Trash2, PowerOff, ShieldCheck } from 'lucide-react';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call - Replace with actual axios call
    // axios.get('http://localhost:5000/api/admin/accounts')
    const fetchAccounts = async () => {
      try {
        setTimeout(() => {
          setAccounts([
            { id: 10, name: 'Michael Brown', email: 'michael@example.com', joined: '2025-11-15', status: 'active', listings: 12 },
            { id: 11, name: 'Emily Davis', email: 'emily@example.com', joined: '2026-01-22', status: 'suspended', listings: 0 },
            { id: 12, name: 'William Wilson', email: 'william@example.com', joined: '2026-03-05', status: 'active', listings: 5 },
            { id: 13, name: 'James Taylor', email: 'james@example.com', joined: '2026-04-10', status: 'active', listings: 8 },
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleToggleSuspend = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    const confirmMessage = currentStatus === 'active' 
      ? 'Are you sure you want to suspend this account? They will be blocked from logging in.' 
      : 'Are you sure you want to reactivate this account?';

    if (window.confirm(confirmMessage)) {
      // try {
      //   await axios.patch(`http://localhost:5000/api/admin/accounts/${id}/status`, { status: newStatus });
      // } catch (error) { ... }
      
      setAccounts(accounts.map(a => a.id === id ? { ...a, status: newStatus } : a));
    }
  };

  const handleDeleteAccount = async (id) => {
    if (window.confirm('WARNING: Are you absolutely sure you want to PERMANENTLY delete this account? This action cannot be undone and will delete all associated products and data.')) {
      // try {
      //   await axios.delete(`http://localhost:5000/api/admin/accounts/${id}`);
      // } catch (error) { ... }
      
      setAccounts(accounts.filter(a => a.id !== id));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading accounts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Account Control</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <ShieldAlert size={16} className="text-amber-500" />
          High Privilege Actions
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Farmer Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold">Active Listings</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No active accounts found.
                  </td>
                </tr>
              ) : (
                accounts.map((account) => (
                  <tr key={account.id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${account.status === 'suspended' ? 'bg-red-50/30' : ''}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{account.name}</td>
                    <td className="px-6 py-4">{account.email}</td>
                    <td className="px-6 py-4">{account.joined}</td>
                    <td className="px-6 py-4">{account.listings}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        account.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {account.status === 'active' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button 
                        onClick={() => handleToggleSuspend(account.id, account.status)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors border shadow-sm ${
                          account.status === 'active'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                        }`}
                      >
                        <PowerOff size={14} />
                        {account.status === 'active' ? 'Suspend' : 'Reactivate'}
                      </button>
                      <button 
                        onClick={() => handleDeleteAccount(account.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors shadow-sm"
                      >
                        <Trash2 size={14} />
                        Delete Account
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
