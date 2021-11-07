import { useState } from "react";
import { styles } from "@/public/js/styles";
import { FaMotorcycle, FaStore } from "react-icons/fa";

export default function Accept({ delivery }) {
  const [on, setOn] = useState(false);
  return (
    <>
      <div className="accept-container">
        <div className="title">
          <div className="icon">
            {delivery ? <FaMotorcycle /> : <FaStore />}
          </div>
          <div>accept {delivery ? "delivery " : "dine in "} orders</div>
        </div>
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
      </div>
      <style jsx>{`
        .accept-container {
          width: 100%;
          font-size: 1.2rem;
          ${styles.flexAligncenter}
          -webkit-box-pack:justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 0.8rem 1.2rem;
          border-bottom: 1px solid ${styles.secondaryColor};
        }
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
        .title {
          color: ${styles.secondaryColor};
          ${styles.flexAligncenter};
          gap: 1rem;
        }
        .icon {
          line-height: 0;
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
