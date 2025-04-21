import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import { Upload } from 'lucide-react';
import BgVideo from '../assets/background_video.mp4';  // Import the video file

function FileUpload() {
    const [file, setFile] = useState(null);
    const [scatterPlot, setScatterPlot] = useState(null);
    const [umapPlot, setUmapPlot] = useState(null);
    const [markerPlot, setMarkerPlot] = useState(null);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onDrop = (acceptedFiles) => {
        if (file) return;
        setFile(acceptedFiles[0]);
    };

    const handleFileChange = (e) => {
        if (file) return;
        setFile(e.target.files[0]);
    };

    const handleDelete = () => {
        setFile(null);
        setUploadComplete(false);
        setScatterPlot(null);
        setUmapPlot(null);
        setMarkerPlot(null);
        navigate('/file-upload');
    };

    const handleSubmit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Logging the response to check the data
            console.log(response.data);  // Check response in console

            setScatterPlot(`data:image/png;base64,${response.data.scatter_plot}`);
            setUmapPlot(`data:image/png;base64,${response.data.umap_plot}`);
            setMarkerPlot(`data:image/png;base64,${response.data.marker_plot}`);

            setUploadComplete(true);

        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: '.h5ad',
    });

    // Automatically redirect to UMAP page when upload is complete
    useEffect(() => {
        if (uploadComplete) {
            navigate('/umap', { state: { scatterPlot, umapPlot, markerPlot } });  // Pass all plot images to UmapPage
        }
    }, [uploadComplete, navigate, scatterPlot, umapPlot, markerPlot]);

    return (
        <div className='file-upload-page'>
            <video autoPlay loop muted className="bg-vid">
                <source src={BgVideo} type="video/mp4" />
            </video>
            <div className="file-upload-container">
                <div className='upload-box'>
                    <h1>Upload File for Visualization</h1>
                    {!file ? (
                        <div className="dropzone" {...getRootProps()}>
                            <input {...getInputProps()} onChange={handleFileChange} />
                            <Upload />
                            <p>
                                <span className="odds-number-x">Click here</span> to upload your file or drag.
                            </p>
                            <p className="file-format">Supported Format: h5ad</p>
                        </div>
                    ) : (
                        <div className="file-preview">
                            <div className="uploaded-file-box">
                                <p>{file.name}</p>
                                <button onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    )}

                    {!uploadComplete && file && !loading && (
                        <button onClick={handleSubmit}>
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    )}

                    {uploadComplete && (
                        <div className="upload-buttons">
                            <p>Redirecting...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileUpload;
