// MarkerPage.js
import React, { useState } from 'react';
import axios from 'axios';

const MarkerPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [markerPlotUrl, setMarkerPlotUrl] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/markers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const markerPlotUrl = URL.createObjectURL(response.data);
      setMarkerPlotUrl(markerPlotUrl);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  return (
    <div>
      <h2>Upload .h5ad File to Generate Marker Plot</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {markerPlotUrl && <img src={markerPlotUrl} alt="Marker Plot" />}
    </div>
  );
};

export default MarkerPage;
