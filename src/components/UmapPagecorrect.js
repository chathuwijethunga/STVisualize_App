import React, { useEffect, useState } from 'react';
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
    const topMarkersData = state?.top_markers; // Should be an array of objects (from DataFrame records)
    const geneInfoData = state?.gene_info;     // Should be a dictionary { group: [gene_info_objects] }

    const [activeTab, setActiveTab] = useState(0); // Track active tab for Marker Genes and Gene Info

    // Check if data was received. If not, redirect back to upload page.
    useEffect(() => {
        // Consider adding more robust data checks here if needed,
        // but checking if *any* expected data is present might suffice.
        if (!state || (!scatterPlotBase64 && !umapPlotBase64 && !markersPlotBase64 && !topMarkersData && !geneInfoData)) {
            console.warn("No analysis data received. Redirecting to upload page.");
            navigate('/file-upload', { replace: true }); // *** Make sure '/file-upload' is your upload route ***
        }
    }, [state, scatterPlotBase64, umapPlotBase64, markersPlotBase64, topMarkersData, geneInfoData, navigate]); // Add all dependencies
    

    // Show a loading/redirecting message if no data is available yet
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
                    <li><a href="/file-upload">Upload New File</a></li>
                </ul>
            </div>

            {/* Content Area */}
            <div className="box-container">
                {/* Scatter and UMAP in one row */}
                <div className="plot-row">
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
                                <img src={`data:image/png;base64,${umapPlotBase64}`} alt="UMAP Plot" />
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

                {/* --- Marker Gene Analysis Results with Tabs --- */}
                {(topMarkersData && topMarkersData.length > 0) || (geneInfoData && Object.keys(geneInfoData).length > 0) ? (
                    <div className='plot-box-des'>
                        <h2 className='plot-headline-text'>Marker Gene Analysis Results</h2>

                        {/* Tab Navigation */}
                        <ul className="nav nav-tabs" id="geneAnalysisTabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(0)}
                                    type="button"
                                >
                                    Top Markers
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(1)}
                                    type="button"
                                >
                                    Gene Information
                                </button>
                            </li>
                        </ul>

                        {/* Tab Content */}
                        <div className="tab-content mt-3" id="geneAnalysisTabsContent">
                            {/* Top Markers Tab Content */}
                            {activeTab === 0 && (
                                <div className="tab-pane fade show active">
                                    <h3>Top Markers per Group</h3>
                                    {topMarkersData && topMarkersData.length > 0 ? (
                                        <table className="marker-table">
                                            <thead>
                                                <tr>
                                                    {topMarkersData[0] && Object.keys(topMarkersData[0]).map(header => (
                                                        <th key={header}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {topMarkersData.map((marker, index) => (
                                                    <tr key={index}>
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
                            )}

                            {/* Gene Information Tab Content */}
                            {activeTab === 1 && (
                                <div className="tab-pane fade show active">
                                    <h3>Gene Information</h3>
                                    {geneInfoData && Object.keys(geneInfoData).length > 0 ? (
                                        Object.keys(geneInfoData).map(group => (
                                            <div key={group}>
                                                <h4>Group {group}</h4>
                                                {geneInfoData[group] && Array.isArray(geneInfoData[group]) && geneInfoData[group].length > 0 ? (
                                                    <ul>
                                                        {geneInfoData[group].map((gene, index) => (
                                                            <li key={`${group}-${index}`}>
                                                                <strong>{gene.query || 'N/A'}:</strong>
                                                                {gene.error ? (
                                                                    <em>Error fetching info: {gene.error}</em>
                                                                ) : (
                                                                    <>
                                                                        Name: {gene.name || 'N/A'},
                                                                        Entrez: {gene.entrezgene || 'N/A'},
                                                                        UniProt: {gene.uniprot?.SwissProt || 'N/A'}
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
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="marker-data-container">
                        <h2>Marker Gene Analysis Results</h2>
                        <p>Marker gene analysis results not available (missing data or error).</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UmapPage;
