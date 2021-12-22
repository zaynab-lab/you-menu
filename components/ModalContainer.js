import { styles } from "@/public/js/styles";

export default function TransactionModal({
  showModal,
  setShowModal,
  title,
  children
}) {
  return (
    <>
      <div className={`modal ${showModal && "showModal"}`}>
        <div className="modalContainer">
          <div className="Xheader">
            <div>{title}</div>
            <div
              className="X"
              onClick={() => {
                setShowModal(false);
              }}
            >
              x
            </div>
          </div>
          <div className="modalBody">{children}</div>
        </div>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          opacity: 0;
          ${styles.flexBothcenter}
          ${styles.flexColumn}
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }

        .showModal {
          opacity: 100;
          z-index: 100;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
          background: #8888;
        }

        .Xheader {
          text-align: right;
          min-width: 22rem;
          background: white;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          ${styles.justifyBetween}
          padding: 0.8rem;
          padding-bottom: 0.2rem;
          border-radius: 0.7rem 0.7rem 0 0;
        }

        .X {
          font-size: 1.6rem;
          line-height: 0;
          cursor: pointer;
        }

        .modalContainer {
          border: 1px solid ${styles.secondaryColor};
          border-radius: 0.7rem;
          z-index: 101;
          background: white;
        }

        .modalBody {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
