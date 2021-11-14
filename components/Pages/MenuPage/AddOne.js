import { useEffect } from "react";

import { styles } from "@/public/js/styles";

export default function AddOne({ addOne, setAddOne }) {
  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setAddOne("");
    }, 1000);

    return () => clearTimeout(clearMessage);
  }, [addOne, setAddOne]);

  return (
    <>
      {
        <div className="alertContainer">
          <div className={`addOne ${addOne !== "" && "showAddOne"}`}>
            {addOne}
          </div>
        </div>
      }

      <style jsx>{`
        .alertContainer {
          width: 100%;
          ${styles.flexJustifycenter}
        }

        .addOne {
          position: fixed;
          text-align: center;
          left: 30vw;
          top: 40vh;
          margin: auto;
          border-radius: 10rem;
          color: ${styles.secondaryColor};
          font-size: 6rem;
          opacity: 1;
        }
        .showAddOne {
          top: 20vh;
          opacity: 0;
          transition: all 1s ease-out;
        }
      `}</style>
    </>
  );
}
