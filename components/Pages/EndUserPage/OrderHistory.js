import axios from "axios";
import { useEffect, useState } from "react";
import UPLayout from "./UPLayout";
import OrderCard, { withBtn } from "@/components/Pages/BusinessPage/OrderCard";
import { styles } from "@/public/js/styles";
import { FaBoxOpen } from "react-icons/fa";

export default function OrderHistory() {
  const [orderList, setOrderList] = useState([0]);
  const [selectedTab, setSelectedTab] = useState("current");
  useEffect(() => {
    axios.get("/api/order/userGetOrder").then((res) => setOrderList(res.data));
  }, []);
  return (
    <>
      <UPLayout>
        <OrderTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="orderList">
          {orderList?.filter((order) =>
            selectedTab === "current"
              ? [...withBtn, "received"].includes(order?.currentStatus)
              : ![...withBtn, "received"].includes(order?.currentStatus)
          ).length > 0 ? (
            orderList

              ?.filter((order) =>
                selectedTab === "current"
                  ? [...withBtn, "received"].includes(order?.currentStatus)
                  : ![...withBtn, "received"].includes(order?.currentStatus)
              )

              .map((order, i) => (
                <div key={i} className="order">
                  <OrderCard order={order} businessCode={order?.businessCode} />
                </div>
              ))
              .reverse()
          ) : (
            <div className="noOrder">
              <div className="empty">
                <FaBoxOpen />
              </div>

              <div>You have no orders here</div>
            </div>
          )}
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
        .noOrder {
          text-align: center;
          color: ${styles.secondaryColor};
        }

        .empty {
          font-size: 10rem;
          line-height: 0rem;
          padding-top: 5rem;
          color: ${styles.grey};
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}
export function OrderTabs({ selectedTab, setSelectedTab }) {
  return (
    <>
      <div className="tabContainer">
        <div className="tabs">
          <div
            className={`tab ${selectedTab === "current" && "selected"}`}
            onClick={() => setSelectedTab("current")}
          >
            current
          </div>

          <div
            className={`tab ${selectedTab === "previous" && "selected"}`}
            onClick={() => setSelectedTab("previous")}
          >
            previous
          </div>
        </div>
      </div>

      <style jsx>{`
        .tabContainer {
          position: sticky;
          top: 0;
          width: 100%;
          background: white;
          padding-top: 0.5rem;
        }

        .tabs {
          width: fit-content;
          margin: auto;
          background: ${styles.secondaryColor};
          color: white;
          ${styles.flexBothcenter};
          border-radius: 1rem;
        }

        .tab {
          font-size: 1.2rem;
          padding: 0.2rem 2rem;
        }

        .selected {
          border-radius: 1rem;
          background: white;
          color: ${styles.secondaryColor};
          border: 1px solid ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
