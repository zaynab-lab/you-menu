import { styles } from "@/public/js/styles";

export default function Onoff({ setOn, on, noText }) {
  return (
    <>
      <div className="toggle" onClick={setOn}>
        {on ? (
          <>
            <div className="ontxt">{!noText && "on"}</div>
            <div className="circle on"></div>
          </>
        ) : (
          <>
            <div className="circle off"></div>
            <div className="offtxt">{!noText && "off"}</div>
          </>
        )}
      </div>
      <style jsx>{`
        .toggle {
          width: 4rem;
          ${styles.flexAligncenter}
          -webkit-box-pack:space-between;
          -ms-flex-pack: space-between;
          justify-content: space-between;
          border-radius: 10rem;
          cursor: pointer;
          ${styles.boxshadow}
          ${styles.userSelect}
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
          padding-left: 0.6rem;
        }

        .off {
          background: ${styles.grey};
        }

        .offtxt {
          padding-right: 0.5rem;
        }
      `}</style>
    </>
  );
}
