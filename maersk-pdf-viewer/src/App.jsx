import React, { useState } from "react";
import PdfViewer from "./components/PdfViewer";
import Sidebar from "./components/Sidebar";
import "./App.css"; // import the CSS below

function App() {
  const [phrase, setPhrase] = useState("");

  return (
    <div className="app-container">
      <div className="pdf-section">
        <PdfViewer
          pdfUrl="/Maersk-Q2-2025-InterimReport.pdf"
          highlightPhrase={phrase}
        />
      </div>
      <div className="sidebar-section">
        <Sidebar onClickHighlight={(p) => setPhrase(p)} />
      </div>
    </div>
  );
}

export default App;
