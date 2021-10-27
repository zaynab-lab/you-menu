import { styles } from "@/public/js/styles";
import {
  FaHistory,
  FaQrcode,
  FaQuestion,
  FaRegClock,
  FaStore
} from "react-icons/fa";

const more = [
  { name: "business info", icon: <FaStore />, selected: "BusinessInfo" },
  { name: "qr generator", icon: <FaQrcode />, selected: "Qr" },
  {
    name: "time - schadual",
    icon: <FaRegClock />,
    selected: "Time"
  },
  {
    name: "order history",
    icon: <FaHistory />,
    selected: "History"
  },
  { name: "support", icon: <FaQuestion />, selected: "Support" }
];

export default function More({ setSelected }) {
  return (
    <>
      <div className="more">
        {more.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelected(item.selected)}
            className="more-item"
          >
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
