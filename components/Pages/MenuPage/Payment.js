import Onoff from "@/components/Onoff";
import { styles } from "@/public/js/styles";
import { useState } from "react";

export default function Payment({ total, user }) {
  const [on, setOn] = useState(false);
  return (
    <>
      <div className="paySection">
        <div className="payItem">
          <div>payment method</div>

          <select className="selectMethod">
            <option>cash</option>
            <option disabled>online</option>
          </select>
        </div>
        <div className="payItem">
          <div>use credit</div>
          <Onoff setOn={setOn} on={on} />
        </div>
        <div className="payItem">
          <div>credit remained</div>
          <div>{(on ? user?.credit - total : user?.credit) + "$"}</div>
        </div>
      </div>
      <style jsx>{`
        .paySection {
          padding-top: 1rem;
        }
        .payItem {
          padding: 0.4rem 0;
          ${styles.flexAligncenter};
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .selectMethod {
          background: white;
          font-size: 1.2rem;
          padding: 0rem 0.5rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
}
