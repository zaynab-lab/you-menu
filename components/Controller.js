import { styles } from "@/public/js/styles";
import { FaEyeSlash, FaDoorOpen, FaStore } from "react-icons/fa";

export default function Controller({ appear, exist }) {
  return (
    <>
      <div className="controllerContainer">
        <div className="appear">{appear ? "👀" : <FaEyeSlash />}</div>
        <div>
          <div className="exist">{exist ? <FaStore /> : <FaDoorOpen />}</div>
        </div>
      </div>
      <style jsx>{`
        .controllerContainer {
          font-size: 1.1rem;
          ${styles.flexColumn};
        }
        .appear {
          cursor: pointer;
          padding: 0.4rem 0;
          color: ${!appear && styles.secondaryColor};
        }

        .exist {
          cursor: pointer;
          padding: 0.4rem 0;
          color: ${!exist && styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
