import { useEffect } from "react";
import { styles } from "@/public/js/styles";

export default function Alert({ alert, setAlert }) {
  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setAlert("");
    }, 2000);
    return () => clearTimeout(clearMessage);
  }, [alert, setAlert]);

  return (
    <>
      {alert !== "" && (
        <div className="alertContainer">
          <div className="alert">{alert}</div>
        </div>
      )}
      <style jsx>{`
        .alertContainer {
          width: 100%;
          ${styles.flexJustifycenter}
        }
        .alert {
          width: 70vw;
          position: fixed;
          padding: 0.3rem;
          text-align: center;
          top: 0.6rem;
          margin: auto;
          border-radius: 10rem;
          color: #fff;
          z-index: 100;
          background: ${styles.lineargradeint};
          font-size: 1.2rem;
        }
      `}</style>
    </>
  );
}
