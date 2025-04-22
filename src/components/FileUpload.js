import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import { Upload } from 'lucide-react';
import BgVideo from '../assets/background_video.mp4';   // Import the video file

function FileUpload() {
    const [file, setFile] = useState(null);
    // Removed local state for plot images, they will be passed directly to UmapPage
    // const [scatterPlot, setScatterPlot] = useState(null);
    // const [umapPlot, setUmapPlot] = useState(null);
    // const [markerPlot, setMarkerPlot] = useState(null);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Add state for error messages
    const navigate = useNavigate();

    const onDrop = (acceptedFiles) => {
       // Allow replacing the file if one is already selected
       // if (file) return; // Removed this line
       if (acceptedFiles.length > 0) {
             setFile(acceptedFiles[0]);
             setError(null); // Clear previous errors on new file selection
        }
    };

    // This handler is only needed if you also have a manual input button,
    // but dropzone handles it. Keeping for robustness if needed.
    const handleFileChange = (e) => {
       // if (file) return; // Removed this line
         if (e.target.files && e.target.files.length > 0) {
             setFile(e.target.files[0]);
             setError(null); // Clear previous errors
         }
    };

    const handleDelete = () => {
       setFile(null);
       setUploadComplete(false);
       // No plot state to clear locally anymore
       // setScatterPlot(null);
       // setUmapPlot(null);
       // setMarkerPlot(null);
       // Navigating back to the same page after delete is redundant, just reset state
       // navigate('/file-upload');
         setError(null); // Clear any error message
    };

    // const handleSubmit = async () => {
    //    if (!file) {
    //         setError("Please select a file first.");
    //         return;
    //     }

    //    const formData = new FormData();
    //    formData.append('file', file);

    //    setLoading(true);
    //     setError(null); // Clear previous errors before submitting

    //    try {
    //         // Call the backend endpoint that returns all plots
    //       const response = await axios.post('http://localhost:5000/upload', formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //       });

    //       // Log the response to check the data (good for debugging)
    //       console.log("Upload successful, response data:", response.data);

    //         // *** Pass the response data directly to the UmapPage via state ***
    //         // No need to set local state for plots or prepend base64 prefix here
    //         // setScatterPlot(`data:image/png;base64,${response.data.scatter_plot}`);
    //         // setUmapPlot(`data:image/png;base64,${response.data.umap_plot}`);
    //         // setMarkerPlot(`data:image/png;base64,${response.data.marker_plot}`); // Corrected key name

    //         // Set uploadComplete to true to trigger the useEffect for navigation
    //       setUploadComplete(true);

    //         // We will navigate inside the useEffect based on uploadComplete

    //    } catch (error) {
    //       console.error("Error uploading file:", error);
    //         // Display error message from backend if available
    //         if (error.response && error.response.data && error.response.data.error) {
    //             setError(`Upload failed: ${error.response.data.error}`);
    //         } else {
    //             setError("An unexpected error occurred during upload.");
    //         }
    //    } finally {
    //       setLoading(false);
    //    }
    // };

    const { getRootProps, getInputProps } = useDropzone({
       onDrop,
       multiple: false,
       accept: {
            'application/octet-stream': ['.h5ad'], // Correct Mime type for .h5ad is often octet-stream
            'application/x-hdf5': ['.h5ad'] // Sometimes this is used
        },
        // Disable click and keydown when a file is already selected to prevent dropping multiple
        // disabled: file !== null
    });

    // Navigate to UMAP page when upload is complete
    useEffect(() => {
       if (uploadComplete) {
            // Use the state passed from the try block's response
            // We need to store the response data temporarily to pass it here.
            // A better approach is to navigate directly inside the try block.
            // Let's refactor handleSubmit to navigate directly.

            // *** This useEffect approach is tricky because we need the response data.
            // Let's move the navigation logic into the handleSubmit's try block. ***
        }
    }, [uploadComplete]); // Simplified dependency

    // Refactored handleSubmit (alternative approach)
    const handleSubmitRefactored = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log("Upload successful, response data:", response.data);

            // Navigate to the UMAP page, passing the entire response.data object in state
            navigate('/umap', { state: response.data }); // Make sure your route is '/umap'

            // No need for setUploadComplete(true) here as we navigate directly

        } catch (error) {
            console.error("Error uploading file:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(`Upload failed: ${error.response.data.error}`);
            } else {
                setError("An unexpected error occurred during upload.");
            }
        } finally {
            setLoading(false);
        }
    };


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

                    {/* Display error message */}
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}


            {/* Use handleSubmitRefactored */}
            {file && !loading && ( // Show button if file selected and not loading
             <button onClick={handleSubmitRefactored}>
              {loading ? 'Processing...' : 'Upload & Visualize'}
             </button>
            )}

            {loading && ( // Show processing message when loading
             <div className="upload-buttons">
              <p>Processing file and generating plots...</p>
             </div>
            )}

                    {/* Removed uploadComplete check as navigation happens directly */}
                </div>
          </div>
       </div>
    );
}

export default FileUpload;