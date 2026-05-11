import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute — Role-based Security Wrapper
 *
 * @param {Object}   props
 * @param {string[]} props.allowedRoles - Roles permitted to access the wrapped routes.
 * @param {React.ReactNode} props.children - The protected component tree.
 *
 * Behavior:
 *   1. No token  → redirect to /login (preserving the attempted URL so
 *      the login page could redirect back after authentication).
 *   2. Token exists but role is NOT in allowedRoles → redirect to /unauthorized.
 *   3. Everything checks out → render children.
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();

  // ── Read auth state from localStorage ──
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const verificationStatus = localStorage.getItem('verificationStatus');

  // ── Guard 1: Not authenticated ──
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // ── Guard 2: Authenticated but wrong role ──
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ── Guard 3: Farmer with pending verification ──
  if (role === 'farmer' && verificationStatus !== 'approved') {
    return <Navigate to="/pending-approval" replace />;
  }

  // ── Authorized ──
  return children;
};

export default ProtectedRoute;
