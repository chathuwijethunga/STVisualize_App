// src/LayoutWithSidebar.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';  // Import Sidebar component

function LayoutWithSidebar() {
  return (
    <div className="app-container">
      {/* Sidebar will be displayed on these pages */}
      <Sidebar />

      {/* This will render the child components (FileUpload, ScatterPlotPage, UmapPage) */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutWithSidebar;
