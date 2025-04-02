import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ScatterPlotPage.css';  // Import the CSS file

function ScatterPlotPage() {
  const { state } = useLocation(); // Getting the passed state
  const { scatterPlot, umapPlot } = state || {}; // Extracting images

  return (
    <div className="scatterplot-page">
      {/* Header Navigation */}
      <div className="header">
        <h2>Navigation</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/file-upload">Back to Upload</Link></li>
          <li><Link to="/umap" state={{ scatterPlot, umapPlot }}>Go to UMAP Plot</Link></li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        <div className="box-container">
          <div className="plot-text">
            <h1>Scatter Plot</h1>
            {/* {scatterPlot} */}
          </div>
          <div className="plot-image">
            {scatterPlot && <img src={scatterPlot} alt="Scatter Plot" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScatterPlotPage;
