import { styles } from "@/public/js/styles";
import Button from "@/components/Button";
import { useState } from "react";
import Image from "next/image";
import { firebaseLink } from "@/util/links";
import { steps } from "./Orders";
import dateChanger, { timeChanger } from "@/util/dateChanger";

export default function OrderCard({ order, businessCode, businessPage }) {
  const [time, setTime] = useState(10);
  return (
    <>
      <div className="orderCard">
        <div className="orderCard-item">
          <div className="orderType">{order?.orderType}</div>
          <div>{order?.table && "table " + order?.table}</div>
          <div className="orderItems">
            {order?.products
              ?.map((product, i) => (
                <div key={i} className="product">
                  {product?.hasImg ? (
                    <div className="productPartImg">
                      <Image
                        height="100"
                        width="100"
                        loader={({ src, width }) =>
                          `${
                            firebaseLink +
                            src +
                            `%2F${
                              product?.defaultID + product?.imgLink
                            }.png?alt=media&tr=w-${width}`
                          }`
                        }
                        src={businessCode || "noImg"}
                        alt={product?.name}
                      />
                    </div>
                  ) : (
                    <div>product</div>
                  )}
                  <div>x{product?.quantity}</div>
                  <div>{product?.name}</div>
                </div>
              ))
              .reverse()}
          </div>
        </div>
        <div className="information">
          <div className="infoRow">
            <div>total: {order?.total?.amount} $</div>
            {businessPage && <div>should pay: {order?.shouldPay} $</div>}
          </div>
          <div className="infoRow">
            <div>time: {timeChanger(order.date)}</div>
            <div>date: {dateChanger(order.date)}</div>
          </div>

          {businessPage && (
            <div className="preperationTime">
              <div>prepration time </div>
              <div className="timeControlar">
                <div
                  className="cbtn min"
                  onClick={() => time > 5 && setTime(time - 5)}
                >
                  -
                </div>
                <div>{time}</div>
                <div
                  className="cbtn plus"
                  onClick={() => time < 90 && setTime(time + 5)}
                >
                  +
                </div>
                <div>min</div>
              </div>
            </div>
          )}
        </div>
        {businessPage ? (
          <div className="buttonContainer">
            <Button
              content={"decline"}
              onclick={() => {
                alert("removed");
              }}
            />

            <Button color={styles.secondaryColor} content={"confirm"} />
          </div>
        ) : (
          <ProcessBar />
        )}
      </div>

      <style jsx>{`
        .orderCard {
          border-radius: 0.5rem;
          ${styles.boxshadow};
          margin: 0.8rem;
        }
        .orderCard-item {
          padding: 0.5rem;
        }
        .orderItems {
          overflow: auto;
          ${styles.flexAligncenter};
          gap: 0.5rem;
        }
        .orderItem {
          white-space: nowrap;
        }
        .buttonContainer {
          ${styles.flexJustifycenter};
          gap: 0.8rem;
        }
        .information {
          border: solid ${styles.secondaryColor};
          border-width: 1px 0;
          padding: 0.5rem;
        }
        .preperationTime {
          justify-content: space-between;
          ${styles.flexAligncenter};
        }
        .timeControlar {
          ${styles.flexAligncenter};
          gap: 0.5rem;
        }
        .cbtn {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 10rem;
          font-size: 1.6rem;
          ${styles.flexBothcenter};
          padding-bottom: 0.2rem;
          cursor: pointer;
          ${styles.userSelect}
        }
        .plus {
          color: white;
          background: ${styles.secondaryColor};
        }
        .min {
          color: ${styles.secondaryColor};
          border: 1px solid ${styles.secondaryColor};
        }
        .infoRow {
          ${styles.flexAligncenter}
          gap:2rem;
        }
      `}</style>
    </>
  );
}

export function ProcessBar() {
  return (
    <>
      <div className="processBar">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step ${step.state === "confirmation" && "activeStep"}`}
          >
            <div
              className={`processCircle ${
                step.state === "confirmation" && "activeCircle"
              }
                ${step.state === "payment" && "pendingCircle"}`}
            >
              {step.icon}
            </div>
            <div className="stepName">{step.name}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .processBar {
          padding: 1rem;
          ${styles.flexAligncenter}
          gap:1rem;
          overflow: auto;
        }
        .processCircle {
          width: 2.6rem;
          height: 2.6rem;
          font-size: 1.4rem;
          ${styles.flexBothcenter}
          border: 1px dashed;
          border-radius: 50%;
        }
        .step {
          ${styles.flexAligncenter}
          ${styles.flexColumn}
          width:6rem;
        }
        .stepName {
          white-space: nowrap;
          font-size: 0.8rem;
        }
        .activeStep {
          color: green;
        }
        .activeCircle {
          border: none;
          background: green;
          color: white;
        }
        .pendingCircle {
          border: none;
          background: orange;
          color: white;
        }
      `}</style>
    </>
  );
}
