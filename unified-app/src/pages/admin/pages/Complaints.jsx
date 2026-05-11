import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle2, Clock, User, Tractor } from 'lucide-react';

const ComplaintsManager = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/complaints')
      .then((response) => {
        setComplaints(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
        setLoading(false);
      });
  }, []);

  const handleMarkResolved = (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, status: 'resolved' } : c
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-lg">Loading complaints...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Complaints Manager</h1>

      {complaints.length === 0 ? (
        <div className="py-16 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          <CheckCircle2 className="mx-auto mb-3 text-green-400" size={40} />
          <p className="text-lg font-medium">No complaints found. Great job!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200"
            >
              {/* Card Header — colored by status */}
              <div className={`p-4 border-b ${
                complaint.status === 'open'
                  ? 'bg-red-50/50 border-red-100'
                  : 'bg-green-50/50 border-green-100'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    #{complaint._id}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                    complaint.status === 'open'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {complaint.status === 'open'
                      ? <AlertCircle size={12} />
                      : <CheckCircle2 size={12} />
                    }
                    {complaint.status === 'open' ? 'Open' : 'Resolved'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Customer & Farmer */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-700">
                    <User size={14} className="text-blue-500" />
                    <span className="font-medium">{complaint.customer}</span>
                  </span>
                  <span className="text-gray-300">→</span>
                  <span className="flex items-center gap-1 text-gray-700">
                    <Tractor size={14} className="text-green-600" />
                    <span className="font-medium">{complaint.farmer}</span>
                  </span>
                </div>

                {/* Issue */}
                <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
                  {complaint.issue}
                </p>

                {/* Date */}
                <div className="flex items-center text-xs text-gray-400 mb-4">
                  <Clock size={12} className="mr-1" />
                  {complaint.date}
                </div>

                {/* Action Button */}
                {complaint.status === 'open' ? (
                  <button
                    onClick={() => handleMarkResolved(complaint._id)}
                    className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                  >
                    Mark as Resolved
                  </button>
                ) : (
                  <span className="w-full py-2 px-4 rounded-lg text-sm font-medium text-center bg-gray-100 text-gray-400 block">
                    ✓ Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintsManager;
