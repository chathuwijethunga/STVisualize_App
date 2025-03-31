import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './HomeScreen';  // Import HomeScreen
import FileUpload from './components/FileUpload';
import ScatterPlotPage from './components/ScatterPlotPage';
import UmapPage from './components/UmapPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />  {/* Home Screen Route */}
          <Route path="/file-upload" element={<FileUpload />} />  {/* File Upload Route */}
          <Route path="/scatterplot" element={<ScatterPlotPage />} />  {/* Scatter Plot Page */}
          <Route path="/umap" element={<UmapPage />} />  {/* UMAP Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
