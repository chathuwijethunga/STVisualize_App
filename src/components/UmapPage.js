import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UmapPage.css'; // Import the CSS file
import BgVideo from '../assets/background_video.mp4'; // Import the video file

function UmapPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const scatterPlotBase64 = state?.scatter_plot;
    const umapPlotBase64 = state?.umap_plot;
    const markersPlotBase64 = state?.markers_plot;
    const topMarkersData = state?.top_markers;
    const geneInfoData = state?.gene_info;

    const [activeTab, setActiveTab] = useState(0); // Track active tab (0: Top Markers, 1: Gene Info)
    const [selectedCluster, setSelectedCluster] = useState('0'); // Default to cluster 0

    useEffect(() => {
        if (!state || (!scatterPlotBase64 && !umapPlotBase64 && !markersPlotBase64 && !topMarkersData && !geneInfoData)) {
            console.warn("No analysis data received. Redirecting to upload page.");
            navigate('/file-upload', { replace: true });
        }
    }, [state, scatterPlotBase64, umapPlotBase64, markersPlotBase64, topMarkersData, geneInfoData, navigate]);

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

    // Filter top markers data based on the selected cluster
    const filteredTopMarkers = topMarkersData ? topMarkersData.filter(marker => marker.group === selectedCluster) : [];

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

                {/* --- Marker Gene Analysis Results with Tabs and Cluster Input Box --- */}
                {(topMarkersData && topMarkersData.length > 0) || (geneInfoData && Object.keys(geneInfoData).length > 0) ? (
                    <div className='plot-box-des'>
                        <h2 className='plot-headline-text'>Marker Gene Analysis Results</h2>

                        {/* Cluster Input Box */}
                        <div className="cluster-input-box">
                            <label htmlFor="clusterInput">Select Cluster: </label>
                            <input
                                type="number"
                                id="clusterInput"
                                min="0"
                                max="9"
                                value={selectedCluster}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[0-9]?$/.test(value)) { // Allow only digits 0-9 (adjust max if needed)
                                        setSelectedCluster(value);
                                    }
                                }}
                            />
                        </div>

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
                                    <h3>Top Markers for Cluster {selectedCluster}</h3>
                                    {filteredTopMarkers && filteredTopMarkers.length > 0 ? (
                                        <table className="marker-table">
                                            <thead>
                                                <tr>
                                                    {filteredTopMarkers[0] && Object.keys(filteredTopMarkers[0]).map(header => (
                                                        <th key={header}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredTopMarkers.map((marker, index) => (
                                                    <tr key={index}>
                                                        {Object.keys(marker).map(key => (
                                                            <td key={key}>{marker[key]}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No top marker data available for cluster {selectedCluster}.</p>
                                    )}
                                </div>
                            )}

                            {/* Gene Information Tab Content */}
                            {activeTab === 1 && (
                                <div className="tab-pane fade show active">
                                    <h3>Gene Information for Cluster {selectedCluster}</h3>
                                    {geneInfoData && geneInfoData[selectedCluster] && geneInfoData[selectedCluster].length > 0 ? (
                                        <ul>
                                            {geneInfoData[selectedCluster].map((gene, index) => (
                                                <li key={`${selectedCluster}-${index}`}>
                                                    <strong>{gene.query || 'N/A'}:</strong>
                                                    {gene.error ? (
                                                        <em>Error fetching info: {gene.error}</em>
                                                    ) : (
                                                        <>
                                                            {gene.name && (
                                                                <>
                                                                    <br /><strong>Name:</strong> {gene.name}
                                                                </>
                                                            )}
                                                            {gene.summary && (
                                                                <>
                                                                    <br /><em>{gene.summary}</em>
                                                                </>
                                                            )}
                                                            {gene.entrezgene && (
                                                                <>
                                                                    <br /><strong>Entrez ID:</strong>
                                                                    <a
                                                                        href={`https://www.ncbi.nlm.nih.gov/gene/${gene.entrezgene}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {gene.entrezgene}
                                                                    </a>
                                                                </>
                                                            )}
                                                            {gene.uniprot?.SwissProt && (
                                                                <>
                                                                    <br /><strong>UniProt ID (Swiss-Prot):</strong>
                                                                    <a
                                                                        href={`https://www.uniprot.org/uniprot/${gene.uniprot.SwissProt}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {gene.uniprot.SwissProt}
                                                                    </a>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No detailed gene information available for cluster {selectedCluster}.</p>
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