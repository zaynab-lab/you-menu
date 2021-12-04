import axios from "axios";
import { useEffect, useState } from "react";
import UPLayout from "./UPLayout";

import OrderCard from "@/components/Pages/BusinessPage/OrderCard";
import { styles } from "@/public/js/styles";

export default function OrderHistory() {
  const [orderList, setOrderList] = useState([0]);
  const [ordersTab, setOrderTab] = useState("current");
  useEffect(() => {
    axios.get("/api/order/userGetOrder").then((res) => setOrderList(res.data));
  }, []);
  return (
    <>
      <UPLayout className="pageContainer">
        <div className="orderTabs">
          <div
            className={`orderTab ${ordersTab === "current" && "activetype"}`}
            onClick={() => {
              setOrderTab("current");
            }}
          >
            current orders
          </div>
          <div
            className={`orderTab ${ordersTab === "previous" && "activetype"}`}
            onClick={() => {
              setOrderTab("previous");
            }}
          >
            previous orders
          </div>
        </div>
        <div className="orderList">
          {orderList
            ?.filter(
              (order) =>
                ordersTab === "current" && order?.status?.cancel?.done !== true
            )
            .map((order, i) => (
              <div key={i} className="order">
                <OrderCard order={order} businessCode={order?.businessCode} />
              </div>
            ))
            .reverse()}
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
        .orderTabs {
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
        .orderTab {
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
