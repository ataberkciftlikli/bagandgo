declare module 'react-qr-scanner' {
    import React from 'react';
  
    interface QrScannerProps {
      delay?: number;
      style?: React.CSSProperties;
      onError?: (error: any) => void;
      onScan?: (data: string | null) => void;
      facingMode?: 'user' | 'environment';
      legacyMode?: boolean;
      resolution?: number;
    }
  
    const QrScanner: React.FC<QrScannerProps>;
    export default QrScanner;
  }
  