import { styles } from "@/public/js/styles";
import { useState } from "react";
import Accordion from "./Accordion";
import ColorListSelecting from "./ColorListSelecting";
import OptionListSelecting from "./OptionListSelecting";
import Input from "./Input";
import Label from "./Label";

const optionList = [
  { name: "unit", hasValue: true },
  { name: "quantity", hasValue: true },
  { name: "color", hasValue: false },
  { name: "size", hasValue: false },
  { name: "without", hasValue: false },
  { name: "extra", hasValue: false }
];

export default function ProductsAdditionalOptions({ state, setState }) {
  const [options, setOptions] = useState(["unit"]);
  return (
    <>
      <Accordion title="additional options">
        <div className="optionList">
          {optionList?.map((option, i) => (
            <div
              key={i}
              className={`option ${
                options.includes(option.name) && "activeOption"
              }`}
              onClick={() => setOptions([...options, option.name])}
            >
              {option.name}
            </div>
          ))}
        </div>
        {options?.includes("without") && (
          <div>
            <Label title={"without"} />

            <OptionListSelecting />
          </div>
        )}

        {options?.includes("extra") && (
          <div>
            <Label title={"extra"} />
            <Input
              value={state?.extra}
              placeholder={""}
              onchange={(e) => setState({ ...state, extra: e.target.value })}
              font={"1.2rem"}
            />
          </div>
        )}

        {options?.includes("unit") && (
          <div>
            <Label title={"unit"} />
            <Input
              value={state?.unit}
              placeholder={"kg,liter,..."}
              onchange={(e) => setState({ ...state, unit: e.target.value })}
              font={"1.2rem"}
            />
          </div>
        )}

        {options?.includes("quantity") && (
          <div>
            <Label title={"quantity"} />
            <Input
              value={state?.quantity}
              placeholder={"10,11,..."}
              onchange={(e) => setState({ ...state, quantity: e.target.value })}
              font={"1.2rem"}
            />
          </div>
        )}
        {options?.includes("color") && (
          <div>
            <Label title={"color"} />
            <ColorListSelecting />
          </div>
        )}
        {options?.includes("size") && (
          <div>
            <Label title={"size"} />
            <OptionListSelecting />
          </div>
        )}
        <div className="pdng"></div>
      </Accordion>
      <style jsx>{`
        .optionList {
          padding: 0.6rem 0.3rem;
          ${styles.flexAligncenter}
          gap:.3rem;
          flex-wrap: wrap;
          ${styles.userSelect}
        }
        .option {
          font-size: 0.9rem;
          border: 1px dashed gray;
          color: gray;
          padding: 0.1rem 0.4rem;
          border-radius: 2rem;
          cursor: pointer;
        }
        .activeOption {
          font-size: 0.9rem;
          border: 1px solid ${styles.secondaryColor};
          color: white;
          background: ${styles.secondaryColor};
          padding: 0.1rem 0.4rem;
          border-radius: 2rem;
          cursor: pointer;
        }
        .pdng {
          padding: 0.6rem;
        }
      `}</style>
    </>
  );
}
