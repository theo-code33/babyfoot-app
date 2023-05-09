import { QrScanner } from "@yudiel/react-qr-scanner";
const QrCodeReader = () => {
  const handleDecode = (data: string) => {
    console.log(data);
  };
  return (
    <QrScanner
      onDecode={handleDecode}
      onError={(err: any) => console.error(err)}
    />
  );
};

export default QrCodeReader;
