import { QRCode } from "react-qr-svg";

export default function QrCode({ value, width }) {
  return (
    <QRCode
      bgColor="#FFFFFF"
      fgColor="black"
      level="Q"
      style={{ width: width }}
      value={value}
    />
  );
}
