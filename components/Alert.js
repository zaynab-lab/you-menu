import { useEffect } from "react";
import { styles } from "@/public/js/styles";

export default function Alert({ alert, setAlert }) {
  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setAlert("");
    }, 2500);
    return () => clearTimeout(clearMessage);
  }, [alert, setAlert]);

  return (
    <>
      {
        <div className={`alertContainer ${!alert && "hide"}        `}>
          <div className="alert">{alert}</div>
        </div>
      }
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
          z-index: 300;
          opacity: 1;
          background: ${styles.lineargradeint};
          font-size: 1.2rem;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }
        .hide {
          opacity: 0;
          z-index: -1;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
