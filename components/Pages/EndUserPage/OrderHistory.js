import axios from "axios";
import { useEffect, useState } from "react";
import UPLayout from "./UPLayout";

import OrderCard from "@/components/Pages/BusinessPage/OrderCard";
import { styles } from "@/public/js/styles";

export default function OrderHistory() {
  const [orderList, setOrderList] = useState([0]);
  const [ordersType, setOrderType] = useState("current");
  useEffect(() => {
    axios.get("/api/order/userGetOrder").then((res) => setOrderList(res.data));
  }, []);
  return (
    <>
      <UPLayout className="pageContainer">
        <div className="orderTypes">
          <div
            className={`orderType ${ordersType === "current" && "activetype"}`}
            onClick={() => {
              setOrderType("current");
            }}
          >
            current orders
          </div>
          <div
            className={`orderType ${ordersType === "previous" && "activetype"}`}
            onClick={() => {
              setOrderType("previous");
            }}
          >
            previous orders
          </div>
        </div>
        <div className="orderList">
          {orderList
            ?.filter(
              (order) =>
                ordersType === "current" && order?.status?.cancel?.done !== true
            )
            .map((order, i) => (
              <div key={i} className="order">
                <OrderCard order={order} businessCode={order?.businessCode} />
              </div>
            ))}
        </div>
      </UPLayout>
      <style jsx>{`
        .orderList {
          width: 100%;
          padding-top: 0.5rem;
          max-width: 40rem;
        }
        .order {
          padding: 0.2rem 0.6rem;
        }
        .orderTypes {
          ${styles.flexBothcenter}
          width: 100%;
          font-size: 1.2rem;
          border: 1px solid lightgray;
          max-width: 30rem;
          position: fixed;
          top: 0.3rem;
          background: white;
          z-index: 90;
        }
        .orderType {
          padding: 0.5rem 2rem;
          flex: 1 1 100%;
          padding-top: 0.3rem;
          cursor: pointer;
          white-space: nowrap;
        }
        .activetype {
          border: 1px solid ${styles.secondaryColor};
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
