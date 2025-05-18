import React from 'react';
import './Factsheets.css'; // Import the CSS file

function Factsheets() {
  
  // Function to handle navigation when a card is clicked
  const navigateToPdf = (pdfFileName) => {
    window.open(require(`../assets/${pdfFileName}`), "_blank");
  };

  return (
    <div>
      {/* Header Navigation */}
      <div className="header">
        <h2>Navigation</h2>
        <ul>
            <li><a href="/">Home</a></li>
        </ul>
      </div>

      <div className="factsheets-container">
      
      <div className="section">
        <h2 className="section-title">Both Sexes Fact Sheets</h2>
        <div className="cards-container">
          <div className="card" onClick={() => navigateToPdf('lip.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>LIP, TONGUE & MOUTH CANCERS</h3>
            </div>
          </div>
          <div className="card" onClick={() => navigateToPdf('Lung.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>LUNG CANCERS</h3>
            </div>
          </div>
          <div className="card" onClick={() => navigateToPdf('Colon.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>COLON & RECTUM CANCERS</h3>
            </div>
          </div>
          <div className="card" onClick={() => navigateToPdf('Oeso.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>OESOPHAGUS</h3>
            </div>
          </div>
          <div className="card" onClick={() => navigateToPdf('Thyroid.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>THYROID CANCERS</h3>
            </div>
          </div>
          <div className="card" onClick={() => navigateToPdf('Overall.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>OVERALL CANCERS</h3>
            </div>
          </div>
          <div className="card" onClick={() => navigateToPdf('Pedia.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>PAEDIATRIC CANCERS</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Female Fact Sheets</h2>
        <div className="cards-container">
          <div className="card" onClick={() => navigateToPdf('Breast.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>BREAST CANCERS</h3>
            </div>
          </div>
          <div className="card" onClick={() => navigateToPdf('Cervix.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>CERVIX CANCERS</h3>
            </div>
          </div>
          <div className="card" onClick={() => navigateToPdf('FemaleOverall.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>OVERALL FEMALE ASR/CR CANCERS</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Male Fact Sheets</h2>
        <div className="cards-container">
          <div className="card" onClick={() => navigateToPdf('MaleOverall.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>OVERALL MALE ASR/CR CANCERS</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">General Fact Sheets</h2>
        <div className="cards-container">
          <div className="card" onClick={() => navigateToPdf('Overall.pdf')}>
            <div className="card-icon">
              {/* Insert an appropriate icon here */}
            </div>
            <div className="card-content">
              <h3>POPULATION BASED CANCER REGISTRY - COLOMBO DISTRICT</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Factsheets;
