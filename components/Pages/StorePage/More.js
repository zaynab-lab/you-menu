import { styles } from "@/public/js/styles";
import {
  FaHistory,
  FaQrcode,
  FaQuestion,
  FaRegClock,
  FaStore
} from "react-icons/fa";

const more = [
  { name: "store info", icon: <FaStore /> },
  { name: "qr generator", icon: <FaQrcode /> },
  { name: "time - schadual", icon: <FaRegClock /> },
  { name: "order history", icon: <FaHistory /> },
  { name: "support", icon: <FaQuestion /> }
];

export default function More() {
  return (
    <>
      <div className="more">
        {more.map((item) => (
          <div className="more-item">
            <div className="more-icon">{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      <style>{`
      .more{
        padding:.8rem;
      }
      .more-item{
        ${styles.flexAligncenter}
        padding:.8rem;
        font-size:1.4rem;
        gap:1rem;
        cursor:pointer;
      }
      .more-icon{
        color:${styles.secondaryColor};
        padding-top:.6rem;
      }
    `}</style>
    </>
  );
}
