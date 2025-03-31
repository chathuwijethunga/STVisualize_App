// src/ScatterPlotPage.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ScatterPlotPage.css';  // Import the CSS file

function ScatterPlotPage() {
  const { state } = useLocation(); // Getting the passed state
  const { scatterPlot, umapPlot } = state || {}; // Extracting images

  return (
    <div className="scatterplot-container">
      <h1>Scatter Plot</h1>
      {scatterPlot && <img src={scatterPlot} alt="Scatter Plot" />}
      <br />
      <Link to="/">Back to Home</Link>
      <br />
      <Link to="/file-upload">Back to Upload</Link>
      <br />
      <Link to="/umap" state={{ scatterPlot, umapPlot }}>Go to UMAP Plot</Link>
    </div>
  );
}

export default ScatterPlotPage;
