import { styles } from "@/public/js/styles";
import { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { FaCheck } from "react-icons/fa";

export default function ColorListSelecting() {
  const [colorModal, setColorModal] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [selected, setSelected] = useState("#fff");
  const [index, setIndex] = useState(0);

  const changeColor = (selectedColor, index) => {
    console.log(selectedColor);
    let colors = [...colorList];
    colors[index] = selectedColor;
    setColorList([...colors]);
  };
  return (
    <>
      <div className="colorListContainer">
        {colorList.map((color, i) => (
          <div
            key={i}
            className="colorItem"
            style={{ background: color }}
            onClick={() => {
              setIndex(i);
              setColorModal(true);
            }}
          ></div>
        ))}
        <div
          className="addColor"
          onClick={() => setColorList([...colorList, "#fff"])}
        >
          +
        </div>
      </div>
      <ColorModal
        selected={selected}
        index={index}
        colorModal={colorModal}
        setColorModal={setColorModal}
        changeColor={changeColor}
      />
      <style jsx>{`
        .colorListContainer {
          ${styles.flexAligncenter};
          flex-wrap: wrap;
          gap: 0.2rem;
        }
        .addColor {
          width: 1.8rem;
          height: 1.8rem;
          font-size: 1.6rem;
          ${styles.flexBothcenter}
          border: 1px dashed gray;
          border-radius: 50%;
          cursor: pointer;
        }
        .colorItem {
          width: 1.8rem;
          height: 1.8rem;
          font-size: 1.6rem;
          ${styles.flexBothcenter}
          border: 1px solid gray;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
export function ColorModal({
  setColorModal,
  colorModal,
  selected,
  index,
  changeColor
}) {
  const [color, setColor] = useColor("hex", selected || "white");

  return (
    <>
      <div
        className={`productColorModal ${colorModal && "showProductColorModal"}`}
      >
        <div className="productColorContainer">
          <div className="Xheader">
            <div>select color</div>
            <div
              className="check"
              onClick={() => {
                changeColor(color.hex, index);
                setColorModal(false);
              }}
            >
              <FaCheck />
            </div>

            <div
              className="X"
              onClick={() => {
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
        .productColorModal {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          z-index: -10;
          opacity: 0;
          ${styles.flexBothcenter};
          ${styles.flexColumn};
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }

        .showProductColorModal {
          opacity: 100;
          z-index: 100;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }

        .Xheader {
          text-align: right;
          width: 256px;
          background: white;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          ${styles.justifyBetween};
          padding: 0 0.5rem;
          border-radius: 0.7rem 0.7rem 0 0;
        }

        .X {
          font-size: 1.6rem;
          line-height: 0;
          padding-bottom: 0.4rem;
          cursor: pointer;
        }

        .productColorContainer {
          border: 1px solid ${styles.secondaryColor};
          border-radius: 0.7rem;
          z-index: 101;
        }
        .check {
          padding: 0.3rem;
          border-radius: 2rem;
          line-height: 0;
          color: ${color.rgb.r * 0.299 +
            color.rgb.g * 0.587 +
            color.rgb.b * 0.114 >
          186
            ? "gray"
            : "white"};
          background: ${color.hex};
          cursor: pointer;
          font-size: 0.8rem;
          border: 1px solid lightgray;
        }
      `}</style>
    </>
  );
}
