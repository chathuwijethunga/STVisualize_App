import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Viewer.css';

function Viewer() {
  const { pdfName } = useParams();
  const navigate = useNavigate();

  // Reference the PDF using a direct path from the public folder
  // Assuming PDFs are in public/assets
  const pdfPath = `./assets/${pdfName}`;

  if (!pdfName) {
    return (
      <div className="viewer-container">
        <h2>Error</h2>
        <p>No PDF specified.</p>
        <button onClick={() => navigate('/factsheets')}>Go to Factsheets</button>
      </div>
    );
  }

  // You might want to add a check here to see if the pdfName is valid
  // before rendering the iframe, e.g., by having a list of valid PDF names.

  return (
    <div className="viewer-container">
      {/* Header Navigation */}
      <div className="header">
          <h2>Factsheet Viewer</h2>
          <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/factsheets">Back to Factsheets</a></li>
          </ul>
      </div>

      <div className="pdf-content">
        <h3>Viewing: {pdfName}</h3>
        <iframe
          src={pdfPath} // Use the direct path from the public folder
          title={`Factsheet: ${pdfName}`}
          width="100%"
          height="700px"
          style={{ border: 'none' }}
        >
          Your browser does not support PDFs. Please download the PDF to view it: <a href={pdfPath}>Download PDF</a>
        </iframe>
      </div>
    </div>
  );
}

export default Viewer;