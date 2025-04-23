import React, { useState } from 'react';
import axios from 'axios'; // Assuming you are using axios
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import { Upload } from 'lucide-react'; // Assuming you are using lucide-react for icons
import BgVideo from '../assets/background_video.mp4'; // Import the video file

function FileUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    // Dropzone configuration
    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const acceptedFile = acceptedFiles[0];
            // Optional: Basic file type validation here as a frontend check
            if (!acceptedFile.name.toLowerCase().endsWith('.h5ad')) {
                 setError("Invalid file type. Only .h5ad files are allowed.");
                 setFile(null); // Clear file if invalid
            } else {
                setFile(acceptedFile);
                setError(null); // Clear previous errors on new valid file selection
            }
        }
    };

    // Dropzone props
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false, // Only allow one file
        accept: {
             // Define accepted MIME types and extensions.
             // .h5ad is often octet-stream or a custom type.
             'application/octet-stream': ['.h5ad'],
             'application/x-hdf5': ['.h5ad'], // Another common type
             'application/vnd.anndata+h5ad': ['.h5ad'] // More specific type if applicable
        },
        disabled: loading // Disable dropzone while loading
    });

    // Handler for manual file input (if you use one, dropzone handles input internally)
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
             const selectedFile = e.target.files[0];
             if (!selectedFile.name.toLowerCase().endsWith('.h5ad')) {
                 setError("Invalid file type. Only .h5ad files are allowed.");
                 setFile(null);
             } else {
                setFile(selectedFile);
                setError(null);
             }
        }
    };


    // Handle file deletion (reset state)
    const handleDelete = () => {
        setFile(null);
        setLoading(false);
        setError(null);
    };

    // Handle file submission
    const handleSubmit = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // 'file' must match the backend's expected form key

        setLoading(true);
        setError(null); // Clear previous errors before submitting

        try {
            // Make the POST request to the backend upload endpoint
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    // Axios automatically sets Content-Type for FormData, but good to be aware
                    // 'Content-Type': 'multipart/form-data'
                },
                // Optional: track upload progress
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload progress: ${percentCompleted}%`);
                    // You could update a state variable here to show a progress bar
                }
            });

            // Log the successful response data (helpful for debugging)
            console.log("Upload successful, response data:", response.data);

            // *** Navigate to the UMAP page, passing the entire response.data object in state ***
            // react-router-dom will handle making this data available via useLocation on the destination page
            navigate('/umap', { state: response.data }); // *** Ensure '/umap' is your UmapPage route path ***

            // No need to set local state for plots or uploadComplete here as we navigate directly

        } catch (error) {
            console.error("Error uploading file:", error);
            setLoading(false); // Ensure loading state is reset

            // Display error message from backend if available, otherwise a generic one
            if (error.response && error.response.data && error.response.data.error) {
                 // Backend sent a JSON error response
                 setError(`Upload failed: ${error.response.data.error}`);
            } else if (error.message) {
                 // Network error or other request setup error
                 setError(`Request error: ${error.message}`);
            }
             else {
                setError("An unexpected error occurred during upload.");
            }
        } finally {
            // Loading state is reset in catch block if error occurs.
            // If navigation happens in try block, component unmounts, so finally might not be needed here.
            // But keeping it is harmless.
             setLoading(false); // Ensure loading is false even if navigation didn't happen due to error
        }
    };

    // No useEffect needed for navigation anymore, as navigation happens directly in handleSubmit

    return (
        <div className='file-upload-page'>
            {/* Background Video */}
            <video autoPlay loop muted className="bg-vid">
                <source src={BgVideo} type="video/mp4" />
            </video>

            {/* File Upload Container */}
            <div className="file-upload-container">
                <div className='upload-box'>
                    <h1>Upload File for Visualization</h1>

                    {!file ? (
                        // Dropzone area when no file is selected
                        <div className={`dropzone ${loading ? 'disabled' : ''}`} {...getRootProps()}>
                            {/* The actual file input is hidden and managed by dropzone */}
                            <input {...getInputProps()} onChange={handleFileChange} disabled={loading} />
                            <Upload size={34} /> {/* Assuming you want a larger icon */}
                            <p>
                                <span className="odds-number-x">Click here</span> to select your file or drag and drop.
                            </p>
                            <p className="file-format">Supported Format: .h5ad</p>
                        </div>
                    ) : (
                        // File preview area when a file is selected
                        <div className="file-preview">
                            <div className="uploaded-file-box">
                                <p>Selected File: <strong>{file.name}</strong></p>
                                {/* Show delete button */}
                                {!loading && <button onClick={handleDelete}>Delete</button>}
                            </div>
                        </div>
                    )}

                    {/* Display error message */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Upload/Process button - conditional rendering */}
                    {file && !loading && !error && ( // Show button if file selected, not loading, and no validation error
                        <button onClick={handleSubmit} className="upload-buttons">
                            Upload & Visualize
                        </button>
                    )}

                    {/* Loading indicator */}
                    {loading && (

                          <div className="loading-container">
                            <div className="loader"></div>
                            <p className="processing-text">Processing file and generating analysis results...</p>
                          </div>


                    )}

                    {/* Removed uploadComplete check */}

                </div> {/* End of upload-box */}
            </div> {/* End of file-upload-container */}
        </div> 
    );
}

export default FileUpload;