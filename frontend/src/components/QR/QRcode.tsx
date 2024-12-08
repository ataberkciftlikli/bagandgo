import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import "./QRcode.css";
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const QRcode: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [data, setData] = useState<string | null>(null);

  const handleScan = (result: string | null) => {
    if (result) {
      setData(result);
    }
  };

  const handleError = (error: Error) => {
    console.warn("QR Scanner Error: ", error.message);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="qr-wrapper">
    <div className="qr-container">
        <Header toggleSidebar={toggleSidebar} />
      <h1 className="qr-title">QR Code Scanner</h1>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="qr-reader">
        <QrScanner
          delay={300}
          style={previewStyle}
          onScan={handleScan}
          onError={handleError}
        />
      </div>
      <div className="qr-output">
        {data ? <p>Scanned Data: {data}</p> : <p>No QR code scanned yet.</p>}
      </div>
    </div>
    </div>
  );
};

export default QRcode;
