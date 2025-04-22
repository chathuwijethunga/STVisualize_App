import React, { useEffect } from 'react'; // Removed useState
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
// axios is not needed on this page anymore
// import axios from 'axios';
import './UmapPage.css'; // Import the CSS file
import BgVideo from '../assets/background_video.mp4'; // Import the video file

function UmapPage() {
   // Getting the passed state from navigation
  const { state } = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  // **Access the state using the EXACT keys from the backend's JSON response**
  const scatterPlotBase64 = state?.scatter_plot; // Use optional chaining and backend key
  const umapPlotBase64 = state?.umap_plot;     // Use optional chaining and backend key
  const markersPlotBase64 = state?.markers_plot; // Use optional chaining and backend key

  // Check if data was received. If not, redirect back to upload page.
  useEffect(() => {
    // Check if state is empty or if none of the plot keys are present
    if (!state || (!scatterPlotBase64 && !umapPlotBase64 && !markersPlotBase64)) {
      console.warn("No plot data received. Redirecting to upload page.");
      // Use replace: true to prevent going back to an empty UMAP page
      navigate('/file-upload', { replace: true }); // *** Make sure '/file-upload' is your upload route ***
    }
  }, [state, navigate, scatterPlotBase64, umapPlotBase64, markersPlotBase64]); // Add dependencies

    // Show a loading/redirecting message if no data is available yet
    if (!state || (!scatterPlotBase64 && !umapPlotBase64 && !markersPlotBase64)) {
        return (
            <div className="umap-page">
                 <video autoPlay loop muted className="bg-vid">
                    <source src={BgVideo} type="video/mp4" />
                </video>
                <div className="box-container">
                    <p>Loading plot data or redirecting...</p>
                </div>
            </div>
        );
    }
  return (
    <div className="umap-page">
      {/* Background Video */}
      <video autoPlay loop muted className="bg-vid">
        <source src={BgVideo} type="video/mp4" />
      </video>

      {/* Header Navigation */}
      <div className="header">
        <h2>Navigation</h2>
        <ul>
          <li><a href="/">Home</a></li>
          {/* Link back to the page where the file upload happens */}
          <li><a href="/file-upload">Upload New File</a></li> {/* *** Make sure '/file-upload' is your upload route *** */}
          {/* 'Markers Plot' link is redundant here */}
        </ul>
       </div>

      {/* Content Area */}
    <div className="box-container">

        {/* Scatter Plot Section */}
        <div className="plot-section">
          <div className="plot-text">
            <h1>Scatter Plot</h1>
          </div>
          <div className="plot-image">
            {/* Check if data exists and prepend base64 prefix */}
            {scatterPlotBase64 ? (
              <img src={`data:image/png;base64,${scatterPlotBase64}`} alt="Scatter Plot" />
            ) : (
              <p>Scatter Plot not available (data missing).</p> // Handle missing data
            )}
          </div>
        </div>

        {/* UMAP Plot Section */}
        <div className="plot-section">
          <div className="plot-text">
            <h1>UMAP Plot</h1>
          </div>
          <div className="plot-image">
             {/* Check if data exists and prepend base64 prefix */}
            {umapPlotBase64 ? (
              <img src={`data:image/png;base64,${umapPlotBase64}`} alt="UMAP Plot" />
            ) : (
               <p>UMAP Plot not available (data missing).</p> // Handle missing data
            )}
          </div>
        </div>

        {/* Marker Plot Section */}
        <div className="plot-section">
          <div className="plot-text">
            <h1>Marker Plot</h1>
          </div>
          <div className="plot-image-markers">
            {/* Check if data exists and prepend base64 prefix */}
            {markersPlotBase64 ? (
              <img src={`data:image/png;base64,${markersPlotBase64}`} alt="Marker Plot" style={{ maxWidth: '100%' }} />
            ) : (
              <p>Marker Plot not available (data missing).</p> // Handle missing data
            )}
          </div>
        </div>

        {/* Removed the redundant file upload section */}
      </div>
   </div>
 );
}

export default UmapPage;