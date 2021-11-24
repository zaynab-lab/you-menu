import { styles } from "@/public/js/styles";
import { FaMotorcycle, FaStore } from "react-icons/fa";
import Onoff from "@/components/Onoff";

export default function Accept({ on, setOn, delivery }) {
  return (
    <>
      <div className="accept-container">
        <div className="title">
          <div className="icon">
            {delivery ? <FaMotorcycle /> : <FaStore />}
          </div>
          <div>accept {delivery ? "delivery " : "dine in "} orders</div>
        </div>
        <Onoff on={on} setOn={setOn} />
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

        .title {
          color: ${styles.secondaryColor};
          ${styles.flexAligncenter};
          gap: 1rem;
        }
        .icon {
          line-height: 0;
        }
      `}</style>
    </>
  );
}
