import { styles } from "@/public/js/styles";
import axios from "axios";
import { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const dfColors = {
  tbt: styles.secondaryColor,
  bbg: "white",
  t: styles.secondaryColor,
  tbg: "white"
};

export default function Color({ categoryID, colors, businessCode }) {
  const [colorModal, setColorModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [colorState, setColorState] = useState(colors || dfColors);
  return (
    <>
      <div className="colorsControl">
        <div
          onClick={() => {
            setSelected("tbt");
            setColorModal(true);
          }}
          className="colorContainer"
        >
          <div
            className="colorCircul"
            style={{ background: colorState.tbt }}
          ></div>
          <div>top bar title</div>
        </div>
        <div
          onClick={() => {
            setSelected("bbg");
            setColorModal(true);
          }}
          className="colorContainer"
        >
          <div
            className="colorCircul"
            style={{ background: colorState.bbg }}
          ></div>
          <div>body background</div>
        </div>
        <div
          onClick={() => {
            setSelected("t");

            setColorModal(true);
          }}
          className="colorContainer"
        >
          <div
            className="colorCircul"
            style={{ background: colorState.t }}
          ></div>
          <div>title</div>
        </div>
        <div
          onClick={() => {
            setSelected("tbg");
            setColorModal(true);
          }}
          className="colorContainer"
        >
          <div
            className="colorCircul"
            style={{ background: colorState.tbg }}
          ></div>
          <div>title background</div>
        </div>

        <ColorModal
          selected={selected}
          colorState={colorState}
          setColorState={setColorState}
          setColorModal={setColorModal}
          colorModal={colorModal}
          categoryID={categoryID}
          businessCode={businessCode}
        />
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

export function ColorModal({
  setColorModal,
  colorModal,
  selected,
  colorState,
  setColorState,
  businessCode,
  categoryID
}) {
  const [color, setColor] = useColor("hex", colorState[selected] || "white");

  return (
    <>
      <div className={`colorModal ${colorModal && "showColorModal"}`}>
        <div className="colorContainer">
          <div className="Xheader">
            <div>select color</div>
            <div
              className="X"
              onClick={() => {
                axios.put(
                  "/api/categories/color",
                  { color: color.hex, selected, categoryID, businessCode },
                  { "content-type": "application/json" }
                );
                setColorState({ ...colorState, [selected]: color.hex });
                setColorModal(false);
              }}
            >
              x
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
        .colorModal {
          position: fixed;
          top: 0;
          width: 96vw;
          height: 100vh;
          z-index: -1;
          opacity: 0;
          ${styles.flexBothcenter}
          ${styles.flexColumn}
          transition: all 0.5s ease-out;
        }
        .showColorModal {
          opacity: 100;
          z-index: 100;
          transition: all 0.5s ease-out;
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
          font-size: 1.6rem;
          line-height: 0;
          padding-bottom: 0.4rem;
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
