import { styles } from "@/public/js/styles";
import {
  FaHistory,
  FaQrcode,
  FaQuestion,
  FaRegClock,
  FaSeedling,
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
  { name: "subscribe", icon: <FaSeedling />, selected: "Subscribe" },
  { name: "support", icon: <FaQuestion />, selected: "Support" }
];

export default function More({ setSelected }) {
  return (
    <>
      <div className="more">
        {more.map((item, i) => (
          <div
            key={i}
            style={{
              transition: `${
                i * 0.15
              }s all cubic-bezier(0.76, -0.48, 0.61, 1.5)`
            }}
            onClick={() => setSelected(item.selected)}
            className="more-item"
          >
            <div className="more-icon">{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .more {
          padding: 1rem 1.5rem;
        }
        .more-item {
          ${styles.flexAligncenter}
          padding:.5rem;
          font-size: 1.5rem;
          gap: 1rem;
          cursor: pointer;
        }
        .more-icon {
          color: ${styles.secondaryColor};
          padding-top: 0.6rem;
        }
      `}</style>
    </>
  );
}
