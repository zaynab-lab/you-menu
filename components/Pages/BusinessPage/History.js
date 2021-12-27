import BackButton from "@/components/BackButton";
import BPLayout from "@/components/Pages/BusinessPage/BPLayout";
import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import OrderCard from "./OrderCard";

export default function History({ businessCode, back }) {
  const [orders, setOrders] = useState([0, 0]);

  useEffect(() => {
    axios.get("/api/order/history").then((res) => {
      Array.isArray(res.data) && setOrders(res.data);
    });
  }, []);

  return (
    <>
      <BackButton back={back} />
      <BPLayout>
        <div className="ordersContainer">
          <div className="orderList">
            {orders?.length > 0 ? (
              orders
                ?.map((order, i) => (
                  <OrderCard
                    key={i}
                    order={order}
                    businessCode={businessCode}
                    businessPage={true}
                    currentStep={"history"}
                  />
                ))
                .reverse()
            ) : (
              <div className="noOrder">
                <div className="empty">
                  <FaBoxOpen />
                </div>
                <div>You have no history orders</div>
              </div>
            )}
          </div>
        </div>
      </BPLayout>
      <style jsx>{`
        .ordersContainer {
          width: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
          height: 100%;
        }
        .orderList {
          overflow: auto;
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
