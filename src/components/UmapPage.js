import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ScatterPlotPage.css';  // Import the CSS file

function UmapPage() {
  const { state } = useLocation(); // Getting the passed state
  const { scatterPlot, umapPlot } = state || {}; // Extracting images

  return (
    <div className="umap-page">
      {/* Header Navigation */}
      <div className="header">
        <h2>Navigation</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/file-upload">Back to Upload</Link></li>
          <li><Link to="/scatterplot" state={{ scatterPlot, umapPlot }}>Go to Scatter Plot</Link></li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        <div className="box-container">
          <div className="plot-text">
            <h1>UMAP Plot</h1>
            {/* {umapPlot} */}
          </div>
          <div className="plot-image">
            {umapPlot && <img src={umapPlot} alt="UMAP Plot" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UmapPage;
