import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    // --- New: Access marker data and gene info ---
    const topMarkersData = state?.top_markers; // Should be an array of objects (from DataFrame records)
    const geneInfoData = state?.gene_info;     // Should be a dictionary { group: [gene_info_objects] }


    // Check if data was received. If not, redirect back to upload page.
    // Keep the check primarily based on plot data, but you could add checks for marker data if desired.
    // If plots are missing but marker data exists, the page will show marker data.
    // If marker data is missing but plots exist, the page will show plots.
    useEffect(() => {
        // Consider adding more robust data checks here if needed,
        // but checking if *any* expected data is present might suffice.
        if (!state || (!scatterPlotBase64 && !umapPlotBase64 && !markersPlotBase64 && !topMarkersData && !geneInfoData)) {
             console.warn("No analysis data received. Redirecting to upload page.");
             navigate('/file-upload', { replace: true }); // *** Make sure '/file-upload' is your upload route ***
        }
    }, [state, navigate, scatterPlotBase64, umapPlotBase64, markersPlotBase64, topMarkersData, geneInfoData]); // Add all dependencies

    // Show a loading/redirecting message if no data is available yet
    // This check is now slightly more comprehensive
    if (!state || (!scatterPlotBase64 && !umapPlotBase64 && !markersPlotBase64 && !topMarkersData && !geneInfoData)) {
        return (
            <div className="umap-page">
                <video autoPlay loop muted className="bg-vid">
                    <source src={BgVideo} type="video/mp4" />
                </video>
                <div className="box-container">
                    <p>Loading analysis data or redirecting...</p>
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
                </ul>
            </div>

            {/* Content Area */}
            <div className="box-container">
                {/* Scatter and UMAP in one row */}
                <div className="plot-row">
                    {/* Scatter Plot */}
                    <div className="plot-box">
                        <div className="plot-text">
                            <h1>Scatter Plot</h1>
                        </div>
                        <div className="plot-image">
                            {scatterPlotBase64 ? (
                                <img src={`data:image/png;base64,${scatterPlotBase64}`} alt="Scatter Plot" />
                            ) : (
                                <p>Scatter Plot not available (data missing or error).</p>
                            )}
                        </div>
                    </div>

                    {/* UMAP Plot */}
                    <div className="plot-box">
                        <div className="plot-text">
                            <h1>UMAP Plot</h1>
                        </div>
                        <div className="plot-image">
                            {umapPlotBase64 ? (
                                <img src={`data:image:png;base64,${umapPlotBase64}`} alt="UMAP Plot" />
                            ) : (
                                <p>UMAP Plot not available (data missing or error).</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Marker Plot Full Width */}
                <div className="plot-section-long">
                    <div className="plot-text">
                        <h1>Marker Plot</h1>
                    </div>
                    <div className="plot-image-markers">
                        {markersPlotBase64 ? (
                            <img src={`data:image/png;base64,${markersPlotBase64}`} alt="Marker Plot" style={{ maxWidth: '100%' }} />
                        ) : (
                            <p>Marker Plot not available (data missing or error).</p>
                        )}
                    </div>
                </div>

                {/* --- New: Marker Gene Data Section --- */}
                {/* Only render this section if either top markers data or gene info data is available */}
                {(topMarkersData && topMarkersData.length > 0) || (geneInfoData && Object.keys(geneInfoData).length > 0) ? (
                    <div > {/* Add a CSS class for styling */}
                        <h2>Marker Gene Analysis Results</h2>

                        {/* Section for Top Markers Table */}
                        <div className="top-markers-section"> {/* Add a CSS class */}
                            <h3>Top Markers per Group</h3>
                            {topMarkersData && topMarkersData.length > 0 ? (
                                <table className="marker-table"> {/* Add a CSS class */}
                                    <thead>
                                        <tr>
                                            {/* Dynamically create headers from the keys of the first object in the array */}
                                            {/* Add a check if topMarkersData[0] exists */}
                                            {topMarkersData[0] && Object.keys(topMarkersData[0]).map(header => (
                                                <th key={header}>{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Loop through each marker object (row) */}
                                        {topMarkersData.map((marker, index) => (
                                            <tr key={index}> {/* Using index as key; better to use a unique ID if available */}
                                                {/* Loop through each key/value pair in the marker object */}
                                                {Object.keys(marker).map(key => (
                                                    <td key={key}>{marker[key]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No top marker data available.</p>
                            )}
                        </div>

                        {/* Section for Gene Information */}
                        <div className="gene-info-section"> {/* Add a CSS class */}
                            <h3>Gene Information (MyGeneInfo)</h3>
                            {geneInfoData && Object.keys(geneInfoData).length > 0 ? (
                                // Loop through each group in the geneInfoData dictionary
                                Object.keys(geneInfoData).map(group => (
                                    <div key={group}>
                                        <h4>Group {group}</h4>
                                        {/* Check if the group has gene info results (is an array and not empty) */}
                                        {geneInfoData[group] && Array.isArray(geneInfoData[group]) && geneInfoData[group].length > 0 ? (
                                            <ul>
                                                {/* Loop through each gene's info object in the group */}
                                                {geneInfoData[group].map((gene, index) => (
                                                    <li key={`${group}-${index}`}> {/* More unique key */}
                                                        <strong>{gene.query || 'N/A'}:</strong> {/* Display the gene symbol (the query) */}
                                                        {' '} {/* Add a space */}
                                                        {gene.error ? ( // Check for error from backend query
                                                            <em>Error fetching info: {gene.error}</em>
                                                        ) : (
                                                            <> {/* Use a fragment to group multiple elements */}
                                                                Name: {gene.name || 'N/A'},
                                                                Entrez: {gene.entrezgene || 'N/A'},
                                                                UniProt: {gene.uniprot?.SwissProt || 'N/A'} {/* Use optional chaining */}
                                                                {/* Display summary if available and not null/empty */}
                                                                {gene.summary && <p>Summary: {gene.summary}</p>}
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No gene information available for Group {group}.</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No detailed gene information available.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    // Optional: Display a message if no marker data was available at all
                    <div className="marker-data-container">
                         <h2>Marker Gene Analysis Results</h2>
                         <p>Marker gene analysis results not available (missing data or error).</p>
                    </div>
                )}

            </div> {/* End of box-container */}

        </div> // End of umap-page
    );
}

export default UmapPage;