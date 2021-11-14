import { useState } from "react";
import { styles } from "@/public/js/styles";

export default function Onoff() {
  const [on, setOn] = useState(false);
  return (
    <>
      <div className="toggle" onClick={() => setOn(!on)}>
        {on ? (
          <>
            <div className="circle on"></div>
            <div className="ontxt">on</div>
          </>
        ) : (
          <>
            <div className="offtxt">off</div>
            <div className="circle off"></div>
          </>
        )}
      </div>
      <style jsx>{`
        .toggle {
          width: 4.2rem;
          ${styles.flexAligncenter}
          -webkit-box-pack:space-between;
          -ms-flex-pack: space-between;
          justify-content: space-between;
          border-radius: 10rem;
          cursor: pointer;
          ${styles.boxshadow}
        }
        .circle {
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 10rem;
        }

        .on {
          background: ${styles.secondaryColor};
        }

        .ontxt {
          padding-right: 0.5rem;
        }

        .off {
          background: ${styles.grey};
        }

        .offtxt {
          padding-left: 0.3rem;
        }
      `}</style>
    </>
  );
}
