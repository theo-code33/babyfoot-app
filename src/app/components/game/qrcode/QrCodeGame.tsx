import React from 'react';
import { QRious } from 'qrious';

const QrCodeGame = () => {
  const [qrRef] = QRious({
    text: 'https://webisora.com',
    options: {
      level: 'H',
      margin: 10,
      scale: 8,
      width: 256,
      color: {
        dark: '#5868bfff',
        light: '#ffffffff',
      },
    },
  });
  
  return <canvas ref={qrRef} />;
};

export default QrCodeGame;