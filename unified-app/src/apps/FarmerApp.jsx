import React from 'react';
import FarmerPortal from '../pages/farmer/FarmerPortal';
// Import the farmer-specific styles
import '../pages/farmer/farmer.index.css';

/**
 * FarmerApp — The Grand Merge Adapter for the Farmer Portal.
 * 
 * This component acts as the main entry point for the farmer-specific
 * micro-frontend. It initializes the FarmerProvider and renders the
 * FarmerPortal which contains all the 3D-accelerated views and
 * dashboard logic.
 */
const FarmerApp = () => {
  return (
    <div className="farmer-portal-container min-h-screen bg-[#050505]">
      {/* 
          FarmerPortal already includes:
          1. FarmerProvider (State management, API services)
          2. AppRoutes (Dashboard, Products, Orders, Earnings, etc.)
          3. Layout (GlassLayout with background video)
      */}
      <FarmerPortal />
    </div>
  );
};

export default FarmerApp;
