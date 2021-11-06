import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import ProductImage from "./ProductImage";

export default function Modal({
  openModal,
  setOpenModal,
  currentProduct,
  businessCode,
  setRefreshProducts
}) {
  const [state, setState] = useState({});

  useEffect(() => {
    setState({});
    setState(currentProduct);
  }, [currentProduct]);

  return (
    <>
      <div className={`modal ${openModal && "show"}`}>
        <div className="X" onClick={() => setOpenModal(false)}>
          x
        </div>
        <div>
          <div className="pImg">
            <ProductImage uploading={true} />
          </div>
          <Label title={"product name"} />
          <Input
            value={state?.name}
            onchange={(e) => setState({ ...state, name: e.target.value })}
            font={"1.2rem"}
          />
        </div>
        <div>
          <Label title={"description"} />
          <Input
            value={state?.description || ""}
            onchange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            font={"1.2rem"}
          />
        </div>
        <div>
          <Label title={"price"} />
          <Input
            value={state?.price}
            type={"number"}
            onchange={(e) => setState({ ...state, price: e.target.value })}
            font={"1.2rem"}
          />
        </div>
        <div className="btnCont">
          <Button
            content={"save changes"}
            onclick={() =>
              axios
                .put(
                  "/api/products",
                  {
                    businessCode,
                    productID: currentProduct._id,
                    state
                  },
                  { "content-type": "application/json" }
                )
                .then((res) => {
                  res.data === "done" &&
                    setRefreshProducts((refresh) => !refresh);
                  res.data === "done" && setOpenModal(false);
                })
            }
            color={styles.secondaryColor}
          />
        </div>

        <div className="remove">
          <div className="trash">
            <FaTrashAlt />
          </div>
          <div>remove product</div>
        </div>
      </div>

      <style jsx>{`
        .modal {
          width: 100vw;
          max-width: 30rem;
          height: 100vh;
          background: white;
          position: fixed;
          top: 100vh;
          right: 0;
          border-left: 1px solid ${styles.secondaryColor};
          z-index: 100;
          padding: 1rem;
          transition: all 0.5s ease-out;
          font-size: 1.2rem;
        }
        .modal.show {
          top: 0vh;
          transition: all 0.5s ease-out;
        }
        .pImg {
          ${styles.flexJustifycenter}
        }
        .X {
          text-align: right;
          font-size: 1.6rem;
          line-height: 0;
          padding-bottom: 0.4rem;
          cursor: pointer;
        }
        .btnCont {
          text-align: center;
        }
        .remove {
          color: ${styles.secondaryColor};
          padding-top: 2rem;
          cursor: pointer;
          ${styles.flexBothcenter}
          gap:.6rem;
          font-size: 1rem;
        }

        .trash {
          padding-top: 0.3rem;
        }
      `}</style>
    </>
  );
}
