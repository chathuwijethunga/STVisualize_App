// src/UmapPage.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UmapPage.css';  // Import the CSS file

function UmapPage() {
  const { state } = useLocation(); // Getting the passed state
  const { scatterPlot, umapPlot } = state || {}; // Extracting images

  return (
    <div className="umap-container">
      <h1>UMAP Plot</h1>
      {umapPlot && <img src={umapPlot} alt="UMAP Plot" />}
      <br />
      <Link to="/">Back to Home</Link>
      <br />
      <Link to="/file-upload">Back to Upload</Link>
      <br />
      <Link to="/scatterplot" state={{ scatterPlot, umapPlot }}>Go to Scatter Plot</Link>
    </div>
  );
}

export default UmapPage;
