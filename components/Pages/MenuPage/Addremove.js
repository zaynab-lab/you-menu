import { styles } from "@/public/js/styles";

export default function Addremove({ id, count, action }) {
  return (
    <>
      <div className="Controlar">
        <div className="cbtn plus" onClick={() => action(id, true)}>
          +
        </div>

        <div className="count">{count}</div>
        <div className="cbtn min" onClick={() => action(id, false)}>
          -
        </div>
      </div>
      <style jsx>{`
        .Controlar {
          ${styles.flexAligncenter}
          gap:.5rem
        }

        .cbtn {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 10rem;
          font-size: 1.6rem;
          ${styles.flexBothcenter};
          padding-bottom: 0.2rem;
          cursor: pointer;
          ${styles.userSelect}
        }

        .plus {
          color: white;
          background: ${styles.secondaryColor};
        }

        .min {
          color: ${styles.secondaryColor};
          border: 1px solid ${styles.secondaryColor};
        }
        .count {
          width: 2rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}
