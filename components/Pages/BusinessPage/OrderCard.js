import { styles } from "@/public/js/styles";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { firebaseLink } from "@/util/links";
import { steps } from "./Orders";
import dateChanger, { timeChanger } from "@/util/dateChanger";
import {
  FaCalendarAlt,
  FaComment,
  FaMapMarkerAlt,
  FaPhone,
  FaRegClock
} from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

export default function OrderCard({ order, businessCode, businessPage }) {
  const [time, setTime] = useState(10);
  const [openOrder, setOpenOrder] = useState(true);
  const [business, setBusiness] = useState({
    defaultCurrency: "",
    currency: "",
    exRate: 1
  });

  useEffect(() => {
    !businessPage &&
      businessCode &&
      axios
        .get(`/api/business/getBusinessInfo?businessCode=${businessCode}`)
        .then((res) => {
          res?.data?.brand &&
            setBusiness((business) => Object({ ...business, ...res.data }));
        });
    businessPage && setOpenOrder(false);
  }, [businessCode, businessPage]);

  return (
    <>
      <div className="orderCard">
        <div className="topHead">
          {businessPage ? (
            <div
              className="businessBrand"
              onClick={() => setOpenOrder(!openOrder)}
            >
              {order.ownerName || order._id}
            </div>
          ) : (
            <Link href={`/menu/${businessCode}`}>
              <div className="businessBrand">{business?.brand?.name}</div>
            </Link>
          )}

          <div className="iconsContainer">
            <Link
              href={
                businessPage
                  ? `tel:${order.ownerNumber}`
                  : `tel:${business?.ownerNumber}`
              }
            >
              <div className="contactIcon">
                <FaComment />
              </div>
            </Link>

            <Link
              href={
                businessPage
                  ? `tel:${order.ownerNumber}`
                  : `tel:${business?.ownerNumber}`
              }
            >
              <div className="contactIcon">
                <FaPhone />
              </div>
            </Link>
          </div>
        </div>

        {openOrder && (
          <>
            <div className="orderCard-item">
              <div className="orderDetails">
                <div className="orderType">{order?.orderType}</div>
                <div className="orderMoreDetails">
                  <div>
                    <div className="orderTable">
                      {order?.address?.content && <FaMapMarkerAlt />}
                      {order?.address?.content && " " + order?.address?.content}
                      {order?.table && " table " + order?.table}
                    </div>
                    <div className="orderTable">{order?.code}</div>
                  </div>
                  <div className="orderDate">
                    <div className="orderDateItem">
                      <FaRegClock />
                      <div>{timeChanger(order.date)}</div>
                    </div>
                    <div className="orderDateItem">
                      <FaCalendarAlt />
                      <div>{dateChanger(order.date)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="orderProducts">
                {order?.products
                  ?.map((product, i) => (
                    <div key={i} className="product">
                      {product?.hasImg ? (
                        <div className="productPartImg">
                          <Image
                            height="70"
                            width="70"
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
                <div>
                  total: {order?.total?.amount + " " + order?.total?.currency}
                </div>
                {businessPage && (
                  <div>
                    should pay:{" "}
                    {order?.shouldPay + " " + order?.total?.currency}
                  </div>
                )}
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
          </>
        )}
      </div>

      <style jsx>{`
        .orderCard {
          border-radius: 0.5rem;
          ${styles.boxshadow};
          margin: 0.8rem;
        }

        .topHead {
          padding-top: 0.5rem;
          padding-bottom: 0.3rem;
          ${styles.flexAligncenter}
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .businessBrand {
          min-width: 5rem;
          font-size: 1.8rem;
          color: ${styles.secondaryColor};
          padding: 0 1rem;
          cursor: pointer;
          overflow: hidden;
        }

        .iconsContainer {
          padding: 0 1rem;
          ${styles.flexAligncenter}
          gap:1rem;
          background: white;
        }
        .contactIcon {
          width: 2.2rem;
          height: 2.2rem;
          border: 1px solid gray;
          border-radius: 50%;
          color: gray;
          ${styles.flexBothcenter};
          cursor: pointer;
        }
        .orderDetails {
          border-top: 1px solid lightgray;
          border-bottom: 1px solid lightgray;
          padding: 0.2rem 1rem;
        }

        .orderMoreDetails {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .orderCard-item {
          padding: 0.5rem;
        }
        .orderProducts {
          overflow: auto;
          ${styles.flexAligncenter};
          gap: 0.5rem;
          white-space: nowrap;
        }
        .orderType {
          font-size: 1rem;
          padding-bottom: 0.2rem;
          color: ${styles.secondaryColor};
        }
        .orderTable {
          color: gray;
          font-size: 0.9rem;
        }
        .orderDate {
          color: gray;
          font-size: 0.9rem;
        }
        .orderDateItem {
          ${styles.flexAligncenter};
          gap: 0.5rem;
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
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
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
