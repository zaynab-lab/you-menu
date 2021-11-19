import { useEffect, useState } from "react";
import { styles } from "@/public/js/styles";
import Addremove from "./Addremove";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Questions from "./Questions";
// import dynamic from "next/dynamic";

// const QrReader = dynamic(() => import("react-qr-reader"));

export default function Cart({
  business,
  cartItems,
  products,
  currency,
  exRate,
  action
}) {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [camera, setCamera] = useState(false);
  const [url, setUrl] = useState("");
  const [state, setState] = useState({});
  const router = useRouter();
  const { table } = router.query;

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      const tot = products
        ?.filter((product) => cartItems[product._id] !== undefined)
        ?.map((product) => cartItems[product._id] * product?.price)
        .reduce((a, b) => a + b);
      setTotal(tot);
    }
    //   const map = cartItems.reduce(
    //     (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    //     new Map()
    //   );
    //   setCartItems([...map.entries()]);
    // }
  }, [products, cartItems]);

  return (
    <>
      {Object.keys(cartItems).length > 0 && (
        <div className="cartContainer">
          <div className="cartTitle" onClick={() => setOpen(!open)}>
            <div>Total</div>
            <div>
              {currency === "$" ? total : Number((total * exRate).toFixed(2))}
              {currency}
            </div>
          </div>

          <div className={`closeBox ${open && "openBox"}`}>
            <div className="cartBox">
              {products
                ?.filter((product) => cartItems[product._id] !== undefined)
                .map((product, index) => (
                  <div key={index} className="row">
                    <div className="name">{product?.name}</div>
                    <div className="control">
                      <Addremove
                        id={product?._id}
                        count={cartItems[product._id]}
                        action={action}
                      />
                    </div>
                    <div className="price">
                      {currency === "$"
                        ? Number(
                            (product?.price * cartItems[product._id]).toFixed(2)
                          )
                        : Number(
                            (
                              product?.price *
                              cartItems[product._id] *
                              exRate
                            ).toFixed(2)
                          )}
                      {currency}
                    </div>
                  </div>
                ))}

              {/* ///////////////////////////////// */}

              {state[1] === undefined && (
                <Questions
                  content={`are you in the ${business?.businessType} shop or near to the seller ?`}
                  setState={setState}
                  Q={1}
                />
              )}
              {state[1] === "yes" &&
                (table ? (
                  <Questions
                    content={`are you on the table ${table} ?`}
                    setState={setState}
                    Q={2}
                  />
                ) : (
                  <>Scan</>
                ))}
              {state[1] === "no" && !business.acceptDelivery && (
                <div className="note">No delivery in this business</div>
              )}
              {state[2] === "no" && <>Scan</>}
              {state[2] === "yes" && <>login</>}
              {/* {camera && (
                <>
                  <div>scan qr code to make sure on which table</div>
                  <QrReader
                    delay={300}
                    onError={(err) => console.error(err)}
                    onScan={(data) => {
                      data && setUrl(data);
                      data === url && setCamera(false);
                      data === url && console.log(url);
                    }}
                    style={{ width: "100%" }}
                  />
                </>
              )} */}
              {/* ///////////////////////////////// */}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .cartContainer {
          width: 100%;
          max-width: 30rem;
          font-size: 1.2rem;
          color: white;
          position: fixed;
          bottom: 0;
          ${styles.flexColumn}
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          ${styles.boxshadow}
          border-radius: 1rem 1rem 0 0;
          z-index: 100;
        }

        .cartTitle {
          width: 100%;
          font-size: 1.2rem;
          padding: 0.5rem 2rem;
          background: ${styles.lineargradeint};
          border-bottom: 1px solid ${styles.secondaryColor};
          color: white;
          ${styles.flexAligncenter};
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          border-radius: 1rem 1rem 0 0;
          cursor: pointer;
          height: 8vh;
        }
        .closeBox {
          height: 0px;
          overflow-y:auto;
          transition: all 0.5s ease-out;
        }
        .openBox {
          height: 91vh;
          transition: all 0.5s ease-out;
        }

        .cartBox {
          min-height: 91vh;
          width: 100%;
          max-width: 30rem;
          font-size: 1rem;
          padding: 0.2rem 2rem;
          background: white;
          color: ${styles.secondaryColor};
          overflow:hidden
          overflow-y: scroll;
          ${styles.flexColumn}
        }

        .cartBtn {
          width: 100%;
          background: white;
          color: ${styles.secondaryColor};
          border: none;
          border-top: 1px solid ${styles.secondaryColor};
          font-size: 1rem;
          padding: 0.4rem;
          cursor: pointer;
        }

        .row {
          font-size: 1rem;
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          padding: 0.2rem 0;
        }

        .name {
          -webkit-box-flex: 1;
          -ms-flex: 1 1 100%;
          flex: 1 1 100%;
          white-space:nowrap;
        }

        .control {
          text-align: right;
          -webkit-box-flex: 1;
          -ms-flex: 1 1 100%;
          flex: 1 1 100%;
        }

        .price {
          text-align: right;
          padding: 0 0.2rem;
          -webkit-box-flex: 1;
          -ms-flex: 1 1 100%;
          flex: 1 1 100%;
        }

        .details {
          font-size: 0.9rem;
          color: ${styles.secondaryColor};
        }
        .btns{
          ${styles.flexBothcenter}
          gap:1rem;
        }
        .note{
          color:black;
          text-align:center;
          padding-top:2rem;
        }

      `}</style>
    </>
  );
}
