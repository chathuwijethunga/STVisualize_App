import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './HomeScreen';  // Import HomeScreen
import FileUpload from './components/FileUpload';
import UmapPage from './components/UmapPage';
import Cancercare from './components/CancerCare';
import MarkerPage from './components/MarkerPage';  
import Factsheets from './components/Factsheets';
// import Viewer from './components/Viewer';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />  {/* Home Screen Route */}
          <Route path="/file-upload" element={<FileUpload />} />  {/* File Upload Route */}
          <Route path="/umap" element={<UmapPage />} />  {/* UMAP Page */}
          <Route path="/care-guidelines" element={<Cancercare />} />
          <Route path="/markers" element={<MarkerPage />} />  {/* New Route for Markers */}
          <Route path="/factsheets" element={<Factsheets />}/>
          {/* <Route path="/factsheets/:pdfName" element={<Viewer />} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
