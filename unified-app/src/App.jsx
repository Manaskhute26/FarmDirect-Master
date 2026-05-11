import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import apps
import AdminApp from './apps/AdminApp';
import ConsumerApp from './apps/ConsumerApp';
import FarmerApp from './apps/FarmerApp';

// Import pages
import Login from './pages/Login';
import FarmerRegistration from './pages/FarmerRegistration';
import ConsumerRegistration from './pages/ConsumerRegistration';
import PendingApproval from './pages/PendingApproval';
import Unauthorized from './pages/Unauthorized';

const ProtectedRoute = ({ children, allowedRoles, requireApprovedStatus }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    
    // Check if user role is allowed
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    // Special check for farmer status
    if (requireApprovedStatus && user.role === 'farmer' && user.status !== 'approved') {
      return <Navigate to="/pending-approval" replace />;
    }

    return children;
  } catch (error) {
    console.error("Invalid user data in local storage", error);
    return <Navigate to="/login" replace />;
  }
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register/farmer" element={<FarmerRegistration />} />
      <Route path="/register/consumer" element={<ConsumerRegistration />} />
      <Route path="/pending-approval" element={<PendingApproval />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminApp />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/*" 
        element={
          <ProtectedRoute allowedRoles={['farmer']} requireApprovedStatus={true}>
            <FarmerApp />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/consumer/*" 
        element={
          <ProtectedRoute allowedRoles={['consumer']}>
            <ConsumerApp />
          </ProtectedRoute>
        } 
      />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
