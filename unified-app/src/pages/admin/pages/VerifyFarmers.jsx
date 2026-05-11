import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

export default function FarmerVerification() {
  const [pendingFarmers, setPendingFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/farmers/pending')
      .then((response) => {
        setPendingFarmers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching farmers:", error);
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    axios.put(`http://localhost:5000/api/admin/farmers/${id}/approve`)
      .then(() => {
        setPendingFarmers((prev) => prev.filter((farmer) => farmer._id !== id));
      })
      .catch((error) => {
        console.error("Error approving farmer:", error);
      });
  };

  const handleReject = (id) => {
    axios.put(`http://localhost:5000/api/admin/farmers/${id}/reject`)
      .then(() => {
        setPendingFarmers((prev) => prev.filter((farmer) => farmer._id !== id));
      })
      .catch((error) => {
        console.error("Error rejecting farmer:", error);
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Farmer Verification Requests</h1>

      {loading ? (
        <p className="text-gray-600">Loading requests from database...</p>
      ) : pendingFarmers.length === 0 ? (
        <p className="text-gray-600">No pending farmers found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingFarmers.map((farmer) => (
                <tr key={farmer._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {farmer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {farmer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {farmer.documents && farmer.documents.length > 0 ? (
                      <a
                        href={farmer.documents[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center hover:underline"
                      >
                        <FileText className="w-4 h-4 mr-1" /> View ID
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">No documents</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                    <button
                      onClick={() => handleApprove(farmer._id)}
                      className="text-green-600 hover:text-green-900 flex items-center cursor-pointer"
                    >
                      <CheckCircle className="w-5 h-5 mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(farmer._id)}
                      className="text-red-600 hover:text-red-900 flex items-center cursor-pointer"
                    >
                      <XCircle className="w-5 h-5 mr-1" /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}