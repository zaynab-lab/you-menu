import Onoff from "@/components/Onoff";
import { styles } from "@/public/js/styles";

export default function Payment({ user }) {
  return (
    <>
      <div className="payfrom">
        <div>payment method</div>

        <select className="selectMethod">
          <option>cash</option>
          <option disabled>online</option>
        </select>
      </div>
      <div className="payfrom">
        <div>use credit</div>
        <Onoff />
      </div>
      <div className="payfrom">
        <div>credit remained</div>
        <div>{user?.credit + "$"}</div>
      </div>
      <style jsx>{`
        .payfrom {
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
