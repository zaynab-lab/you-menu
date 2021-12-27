import { styles } from "@/public/js/styles";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="accordionContainer">
        <div className="accordionTitle" onClick={() => setOpen(!open)}>
          <div>{title}</div>
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <div className={`accordionBody ${open && "showAccordion"}`}>
          {children}
        </div>
      </div>

      <style jsx>{`
        .accordionContainer {
          padding: 0 0.4rem;
          overflow: hidden;
          background: white;
        }
        .accordionTitle {
          width: 100%;
          color: #555;
          padding: 0.6rem;
          border-bottom: 1px solid lightgray;
          ${styles.flexAligncenter};
          ${styles.justifyBetween};
          white-space: nowrap;
          cursor: pointer;
          background: white;
        }
        .accordionBody {
          ${open && "border-bottom: 1px solid lightgray;"};
          height: 0;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }

        .showAccordion {
          height: fit-content;
          display: block;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
