import { styles } from "@/public/js/styles";
import { useState } from "react";

export default function OptionListSelecting() {
  const [optionList, setOptionList] = useState([]);

  const changeText = (selectedText, index) => {
    let text = [...optionList];
    text[index] = selectedText;
    setOptionList([...text]);
  };
  return (
    <>
      <div className="optionListContainer">
        {optionList.map((optionItem, k) => (
          <div key={k} className="optionItem" style={{ width: "fit-content" }}>
            <input
              value={optionItem}
              onChange={(e) => changeText(e.target.value, k)}
              style={{ maxWidth: "100%", border: "none", textAlign: "center" }}
            />
          </div>
        ))}
        <div
          className="addOption"
          onClick={() => setOptionList([...optionList, " "])}
        >
          +
        </div>
      </div>
      <style jsx>{`
        .optionListContainer {
          ${styles.flexAligncenter};
          flex-wrap: wrap;
          gap: 0.2rem;
        }
        .addOption {
          width: 2.4rem;
          height: 1.8rem;
          font-size: 1.6rem;
          ${styles.flexBothcenter}
          border: 1px dashed gray;
          border-radius: 0.3rem;
          cursor: pointer;
        }
        .optionItem {
          width: 2.4rem;
          height: 1.8rem;
          font-size: 1.6rem;
          ${styles.flexBothcenter}
          border: 1px solid gray;
          border-radius: 0.3rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
