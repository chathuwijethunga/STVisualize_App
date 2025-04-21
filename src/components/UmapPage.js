import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './UmapPage.css';  // Import the CSS file
import BgVideo from '../assets/background_video.mp4';  // Import the video file

function UmapPage() {
  const { state } = useLocation(); // Getting the passed state
  const { scatterPlot, umapPlot } = state || {}; // Extracting images
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [markerPlotUrl, setMarkerPlotUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);  // Reset error state before upload

    try {
      // Make the POST request to the backend for markers
      const response = await axios.post('http://localhost:5000/markers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',  // Expecting an image as a blob
      });

      // Create an object URL for the marker image
      const markerPlotUrl = URL.createObjectURL(response.data);
      setMarkerPlotUrl(markerPlotUrl);  // Set the URL for the marker plot
    } catch (error) {
      console.error('Error fetching marker plot:', error);
      setError("Failed to load marker plot. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <li><a href="/file-upload">Back to Upload</a></li>
          <li><a href="/markers">Markers Plot</a></li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="box-container">
        <div className="plot-text">
          <h1>UMAP Plot</h1>
        </div>
        <div className="plot-image">
          {umapPlot && <img src={umapPlot} alt="UMAP Plot" />}
        </div>

        <div className="plot-text">
          <h1>Scatter Plot</h1>
        </div>
        <div className="plot-image">
          {scatterPlot && <img src={scatterPlot} alt="Scatter Plot" />}
        </div>

        {/* File upload section */}
        <div>
          <h2>Upload .h5ad File to Generate Marker Plot</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload File'}
          </button>

          {/* Displaying the marker plot image */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {markerPlotUrl && (
            <div>
              <h3>Marker Plot:</h3>
              <img src={markerPlotUrl} alt="Marker Plot" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UmapPage;