import { useState } from "react";
import { styles } from "@/public/js/styles";

export default function Addremove() {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <div className="Controlar">
        <div
          className="cbtn plus"
          onClick={() => quantity < 5 && setQuantity(quantity + 1)}
        >
          +
        </div>

        <div>{quantity}</div>
        <div
          className="cbtn min"
          onClick={() => quantity > 0 && setQuantity(quantity - 1)}
        >
          -
        </div>
      </div>
      <style jsx>{`
        .Controlar {
          ${styles.flexAligncenter}
          gap:.5rem
        }

        .cbtn {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 10rem;
          font-size: 1.6rem;
          ${styles.flexBothcenter};
          padding-bottom: 0.2rem;
          cursor: pointer;
        }

        .plus {
          color: ${styles.secondaryColor};
        }

        .min {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
