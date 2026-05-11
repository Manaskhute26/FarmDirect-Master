import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Leaf, UploadCloud, UserPlus, ShieldCheck, Mail, Lock, Tractor } from 'lucide-react';

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    farmName: '',
  });
  const [idDocument, setIdDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setIdDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!idDocument) {
      setError("Please upload a Government ID or Land Ownership Proof.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('farmName', formData.farmName);
      data.append('idDocument', idDocument); // Append the actual file

      // Using FormData means we don't send standard JSON headers
      await axios.post('http://localhost:5000/api/auth/register/farmer', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMsg("Registration successful! Your account is pending admin approval.");
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Server Error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
            <Tractor className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-900 tracking-tight">
          Join FarmDirect as a Farmer
        </h2>
        <p className="mt-2 text-md text-emerald-700 font-medium">
          Sell directly to consumers, earn better margins, and grow your business.
        </p>
      </div>

      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-green-500 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <UserPlus size={20} /> Create Your Seller Account
          </h3>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm shadow-sm border border-white/20">
            Step 1 of 1
          </span>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm text-sm" role="alert">
              <p className="font-bold flex items-center gap-2"><ShieldCheck size={16}/> Registration Failed</p>
              <p>{error}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 p-4 rounded shadow-sm text-sm" role="alert">
              <p className="font-bold flex items-center gap-2"><ShieldCheck size={16}/> Success!</p>
              <p>{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-lg border border-slate-300 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-lg border border-slate-300 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-colors"
                    placeholder="john@farm.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-lg border border-slate-300 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Farm Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Farm Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Leaf className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="farmName"
                    required
                    value={formData.farmName}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-lg border border-slate-300 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-colors"
                    placeholder="Green Valley Organics"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="mt-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Verification Document <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-3">Upload a Government ID (Aadhaar/PAN) or Land Ownership Proof for verification.</p>
              
              <div className="flex justify-center rounded-xl border-2 border-dashed border-emerald-300 px-6 py-8 hover:bg-emerald-50 transition-colors bg-slate-50">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-emerald-500 mb-3" />
                  <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                    <label
                      htmlFor="idDocument"
                      className="relative cursor-pointer rounded-md font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="idDocument"
                        name="idDocument"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png, application/pdf"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-slate-500 mt-1">PNG, JPG, PDF up to 5MB</p>
                  
                  {idDocument && (
                    <div className="mt-4 px-3 py-2 bg-white rounded-md shadow-sm border border-emerald-200 inline-block text-sm font-medium text-emerald-700">
                      📄 {idDocument.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 mt-8">
              <button
                type="submit"
                disabled={loading || successMsg}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Registration...
                  </>
                ) : 'Submit Registration For Approval'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-500 hover:underline transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmerRegistration;
