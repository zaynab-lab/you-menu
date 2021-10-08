import { QRCode } from "react-qr-svg";
import { styles } from "@/public/js/styles";

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
