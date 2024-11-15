import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import "./QRcode.css";

const QRcode: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  return (
    <div className="qr-container">
      <h1 className="qr-title">QR Code Scanner</h1>
      <div className="qr-reader">
        <QrReader
          onResult={(result: { getText: () => string } | null, error: Error | null) => {
            if (result) {
              setData(result.getText());
            }
            if (error) {
              console.warn("QR Reader Error: ", error.message);
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
      <div className="qr-output">
        {data ? <p>Scanned Data: {data}</p> : <p>No QR code scanned yet.</p>}
      </div>
    </div>
  );
};

export default QRcode;
