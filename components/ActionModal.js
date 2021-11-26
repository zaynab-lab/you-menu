import Button from "@/components/Button";
import { styles } from "@/public/js/styles";

export default function ActionModal({
  setRemoveModal,
  removeModal,
  title,
  action
}) {
  return (
    <>
      <div className={`removeModal ${removeModal && "showRemoveModal"}`}>
        <div className="removeContainer">
          <div className="Xheader">
            <div>{title}</div>
          </div>

          <div className="btnsContainer">
            <Button
              content="cancel"
              onclick={() => {
                setRemoveModal(false);
              }}
            />

            <Button
              content="confirm"
              onclick={() => action()}
              color={styles.secondaryColor}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .removeModal {
          position: fixed;
          top: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          opacity: 0;
          ${styles.flexBothcenter}
          ${styles.flexColumn}
          -webkit-transition: opacity 0.5s ease-in-out;
          -o-transition: opacity 0.5s ease-in-out;
          transition: opacity 0.5s ease-in-out;
          background: #2222;
        }

        .showRemoveModal {
          opacity: 100;
          z-index: 100;
          -webkit-transition: opacity 0.5s ease-in-out;
          -o-transition: opacity 0.5s ease-in-out;
          transition: opacity 0.5s ease-in-out;
        }

        .removeContainer {
          border: 1px solid ${styles.secondaryColor};
          background: white;
          border-radius: 0.7rem;
          padding: 0.5rem;
          ${styles.boxshadow}
        }

        .Xheader {
          text-align: right;
          width: 100%;
          background: white;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          justify-content: space-between;
          padding: 0 0.5rem;
          border-radius: 0.7rem 0.7rem 0 0;
          padding-bottom: 0.5rem;
        }
        .btnsContainer {
          padding: 0rem 1rem;
          ${styles.flexAligncenter}
          gap:1rem;
        }
      `}</style>
    </>
  );
}
