import { styles } from "@/public/js/styles";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function OptionListSelecting({ withPrice }) {
  const [optionList, setOptionList] = useState([]);

  const changeText = (name, selectedText, index) => {
    let text = [...optionList];
    if (name) {
      text[index] = { ...text[index], name: selectedText };
    } else {
      text[index] = { ...text[index], price: selectedText };
    }
    setOptionList([...text]);
  };
  return (
    <>
      <div className="optionListContainer">
        {optionList.map((optionItem, k) => (
          <div key={k} className="optionItem">
            <input
              value={optionItem.name}
              placeholder="name"
              autoComplete="none"
              onChange={(e) => changeText(true, e.target.value, k)}
              style={{
                maxWidth: withPrice ? "30%" : "70%",
                textAlign: "center",
                border: "none"
              }}
            />
            {withPrice && (
              <input
                value={optionItem.price}
                placeholder="price"
                type="number"
                autoComplete="none"
                onChange={(e) => changeText(false, e.target.value, k)}
                style={{
                  maxWidth: "30%",
                  textAlign: "center",
                  border: "none"
                }}
              />
            )}
            <div
              className="removeIcon"
              onClick={() => {
                setOptionList((optionList) =>
                  optionList.filter((a, i) => i !== k)
                );
              }}
            >
              <FaTrashAlt />
            </div>
          </div>
        ))}
        <div
          className="addOption"
          onClick={() => setOptionList([...optionList, ""])}
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
          ${styles.userSelect}
          cursor: pointer;
        }
        .optionItem {
          min-width: 2.4rem;
          height: 1.8rem;
          flex: 1 1 ${withPrice ? "10rem" : "6rem"};
          font-size: 1.6rem;
          ${styles.flexAligncenter}
          ${styles.justifyBetween}
          border: 1px solid gray;
          border-radius: 0.3rem;
          cursor: pointer;
          overflow: hidden;
        }
        .removeIcon {
          font-size: 1rem;
          line-height: 0;
          padding: 0.6rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
