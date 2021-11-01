import { styles } from "@/public/js/styles";
import axios from "axios";
import { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { FaDeaf, FaHistory, FaRecycle, FaUndo } from "react-icons/fa";

const dfColors = {
  tbt: styles.secondaryColor,
  bbg: "white",
  t: styles.secondaryColor,
  tbg: "white"
};

export default function Color({ categoryID, colors, setColors, businessCode }) {
  const [colorModal, setColorModal] = useState(false);
  const [selected, setSelected] = useState("");

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
            style={{ background: colors?.tbt || dfColors.tbt }}
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
            style={{ background: colors?.bbg || dfColors.bbg }}
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
            style={{ background: colors?.t || dfColors.t }}
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
            style={{ background: colors?.tbg || dfColors.tbg }}
          ></div>
          <div>title background</div>
        </div>
        <div
          className="reset"
          onClick={() => {
            axios.put(
              "/api/categories/color",
              {
                colors: dfColors,
                selected,
                categoryID,
                businessCode
              },
              { "content-type": "application/json" }
            );
            setColors(dfColors);
          }}
        >
          <FaUndo />
          reset colors
        </div>

        <ColorModal
          selected={selected}
          colors={colors}
          setColors={setColors}
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
        .reset {
          color: ${styles.secondaryColor};
          cursor: pointer;
          ${styles.flexBothcenter}
          gap:.6rem
        }
      `}</style>
    </>
  );
}

export function ColorModal({
  setColorModal,
  colorModal,
  selected,
  colors,
  setColors,
  businessCode,
  categoryID
}) {
  const [color, setColor] = useColor(
    "hex",
    (colors && colors[selected]) || dfColors[selected] || "white"
  );

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
                  {
                    colors: { ...colors, [selected]: color.hex },
                    selected,
                    categoryID,
                    businessCode
                  },
                  { "content-type": "application/json" }
                );
                setColors({ ...colors, [selected]: color.hex });
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
