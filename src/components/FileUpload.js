import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import { Upload } from 'lucide-react';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [scatterPlot, setScatterPlot] = useState(null);
    const [umapPlot, setUmapPlot] = useState(null);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle file drop (drag-and-drop)
    const onDrop = (acceptedFiles) => {
        if (file) return;  // If a file is already uploaded, don't accept new ones
        setFile(acceptedFiles[0]);
    };

    // Handle file input
    const handleFileChange = (e) => {
        if (file) return;  // If a file is already uploaded, don't accept new ones
        setFile(e.target.files[0]);
    };

    // Handle file deletion and navigate to file upload page
    const handleDelete = () => {
        setFile(null);
        setUploadComplete(false);
        setScatterPlot(null);  // Clear scatter plot
        setUmapPlot(null);  // Clear UMAP plot
        navigate('/file-upload');  // Navigate to the upload page
    };

    // File upload handling
    const handleSubmit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true); // Show loading

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Corrected the template literals for Base64 images
            setScatterPlot(`data:image/png;base64,${response.data.scatter_plot}`);
            setUmapPlot(`data:image/png;base64,${response.data.umap_plot}`);
            // setScatterPlot(scatterPlot);
            // setUmapPlot(umapPlot);

            setUploadComplete(true); // File uploaded successfully
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false); // Hide loading
        }
    };

    // Dropzone for drag and drop
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: '.h5ad',
    });

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
            {!file ? (
                <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} onChange={handleFileChange} />
                    <Upload />
                    <p>
                        <span className="odds-number">Click here</span> to upload your file or drag.
                    </p>
                    <p className="file-format">Supported Format: h5ad</p>
                </div>
            ) : (
                <div className="file-preview">
                    <div className="uploaded-file-box">
                        <p>{file.name}</p>
                        {/* Delete button after file is uploaded */}
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}

            {/* Conditional rendering of upload button */}
            {/* Only show the upload button if a file is selected and not uploaded */}
            {!uploadComplete && file && !loading && (
                <button onClick={handleSubmit}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            )}

            {uploadComplete && (
                <div className="upload-buttons">
                    {/* Navigating to Scatter Plot */}
                    <button onClick={navigateToScatterPlot}>Go to Scatter Plot</button>
                    <button onClick={navigateToUmap}>Go to UMAP Plot</button>
                </div>
            )}
        </div>
    );
}

export default FileUpload;
