// src/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FileUpload.css';  // Import the CSS file

function FileUpload() {
    const [file, setFile] = useState(null);
    const [scatterPlot, setScatterPlot] = useState(null);
    const [umapPlot, setUmapPlot] = useState(null);
    const [uploadComplete, setUploadComplete] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Get the Base64 images from the response
            setScatterPlot(`data:image/png;base64,${response.data.scatter_plot}`);
            setUmapPlot(`data:image/png;base64,${response.data.umap_plot}`);

            // Set upload as complete
            setUploadComplete(true);
            alert('Upload complete!');
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    // Navigation to scatterplot page
    const navigateToScatterPlot = () => {
        navigate('/scatterplot', { state: { scatterPlot, umapPlot } });
    };

    // Navigation to umap page
    const navigateToUmap = () => {
        navigate('/umap', { state: { scatterPlot, umapPlot } });
    };

    return (
        <div className="file-upload-container">
            <h1>Upload File for Visualization</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>

            {uploadComplete && (
                <div className="upload-buttons">
                    {/* Buttons to navigate to scatterplot and umap */}
                    <button onClick={navigateToScatterPlot}>Go to Scatter Plot</button>
                    <button onClick={navigateToUmap}>Go to UMAP Plot</button>
                </div>
            )}

            {/* Render scatter plot and UMAP plot only after clicking respective buttons */}
            {/* {scatterPlot && <img src={scatterPlot} alt="Scatter Plot" />} */}
            {/* {umapPlot && <img src={umapPlot} alt="UMAP Plot" />} */}
        </div>
    );
}

export default FileUpload;
