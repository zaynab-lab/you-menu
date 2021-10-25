import { styles } from "@/public/js/styles";
import { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

export default function Color() {
  const [modal, setModal] = useState(false);
  const [titleBColor, setTitleBColor] = useState("white");
  const [defaultColor, setDefColor] = useState("white");

  return (
    <>
      <div className="colorsControl">
        <div className="colorContainer">
          <div
            className="colorCircul"
            style={{ background: styles.secondaryColor }}
          ></div>
          <div>top bar title</div>
        </div>
        <div className="colorContainer">
          <div className="colorCircul" style={{ background: "white" }}></div>
          <div>body background</div>
        </div>
        <div className="colorContainer">
          <div
            className="colorCircul"
            style={{ background: styles.secondaryColor }}
          ></div>
          <div>title</div>
        </div>
        <div onClick={() => setModal(true)} className="colorContainer">
          <div
            className="colorCircul"
            style={{ background: titleBColor }}
          ></div>
          <div>title background</div>
        </div>
        {modal && (
          <ColorModal
            defaultColor={defaultColor}
            setTitleBColor={setTitleBColor}
            setModal={setModal}
          />
        )}
      </div>
      <style jsx>{`
        .colorsControl {
          padding: 0.8rem;
          ${styles.flexAligncenter}
          gap: 1rem;
          flex-wrap: wrap;
          border-bottom: 1px solid ${styles.secondaryColor};
        }

        .colorContainer {
          ${styles.flexBothcenter}
          gap:.5rem;
          cursor: pointer;
        }

        .colorCircul {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 10rem;
          border: 2px solid lightgrey;
        }
      `}</style>
    </>
  );
}
export function ColorModal({ setModal, defaultColor, setTitleBColor }) {
  const [color, setColor] = useColor("hex", defaultColor);

  return (
    <>
      <div className="modal">
        <div className="colorContainer">
          <div className="Xheader">
            <div>select color</div>
            <div
              className="X"
              onClick={() => {
                setTitleBColor(color.hex);
                setModal(false);
              }}
            >
              X
            </div>
          </div>
          <ColorPicker
            width={256}
            height={150}
            color={color}
            onChange={setColor}
            hideHSV
            hideRGB
          />
        </div>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          width: 96vw;
          height: 100vh;
          z-index: 100;
          ${styles.flexBothcenter}
          ${styles.flexColumn}
        }
        .Xheader {
          text-align: right;
          width: 256px;
          background: white;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          justify-content: space-between;
          padding: 0 0.5rem;
          border-radius: 0.7rem 0.7rem 0 0;
        }
        .X {
          cursor: pointer;
        }
        .colorContainer {
          border: 1px solid ${styles.secondaryColor};
          border-radius: 0.7rem;
          z-index: 101;
        }
      `}</style>
    </>
  );
}
