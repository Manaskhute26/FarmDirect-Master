import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, FileText, User, MapPin, Loader2, Search } from 'lucide-react';

const VerifyFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPendingFarmers();
  }, []);

  const fetchPendingFarmers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/farmers/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFarmers(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pending farmers.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/farmers/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Remove the approved farmer from the list
      setFarmers(farmers.filter(farmer => farmer._id !== id));
    } catch (err) {
      alert('Failed to approve farmer.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this application?")) return;
    
    setActionLoading(id);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/farmers/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Remove the rejected farmer from the list
      setFarmers(farmers.filter(farmer => farmer._id !== id));
    } catch (err) {
      alert('Failed to reject farmer.');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredFarmers = farmers.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.farmName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading pending applications...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Pending Approvals</h2>
          <p className="text-sm text-slate-500 mt-1">Review and verify new farmer registrations.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error ? (
        <div className="p-6 text-center text-red-600 bg-red-50">
          {error}
        </div>
      ) : filteredFarmers.length === 0 ? (
        <div className="p-12 text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">All caught up!</h3>
          <p className="text-slate-500 mt-1">There are no pending farmer applications at this time.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Farmer Details</th>
                <th className="px-6 py-4 font-semibold">Verification Document</th>
                <th className="px-6 py-4 font-semibold">Date Applied</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFarmers.map((farmer) => (
                <tr key={farmer._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold">
                        {farmer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{farmer.name}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <MapPin size={12} />
                          {farmer.farmName || 'Independent Farmer'}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{farmer.email}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {farmer.documents && farmer.documents.length > 0 ? (
                      <a 
                        href={`http://localhost:5000${farmer.documents[0].url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors border border-blue-100"
                      >
                        <FileText size={16} />
                        View ID
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                        <XCircle size={16} />
                        No Document
                      </span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(farmer.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleReject(farmer._id)}
                        disabled={actionLoading === farmer._id}
                        className="px-3 py-1.5 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(farmer._id)}
                        disabled={actionLoading === farmer._id}
                        className="px-4 py-1.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-2 transition-all hover:shadow disabled:opacity-70"
                      >
                        {actionLoading === farmer._id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <CheckCircle size={16} />
                        )}
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerifyFarmers;
