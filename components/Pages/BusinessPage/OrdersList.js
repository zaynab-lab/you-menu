import { styles } from "@/public/js/styles";
import { FaBoxOpen } from "react-icons/fa";
import OrderCard from "./OrderCard";
export default function OrdersList({ steps, currentStep, orders }) {
  return (
    <>
      <div className="inform">
        {steps?.map(
          (step) =>
            step.name === currentStep &&
            (step.count > 0 ? step.count + " orders" : " no order")
        )}{" "}
        {currentStep}
      </div>
      <div className="orderList">
        {orders.filter((order) => order?.status === currentStep).length > 0 ? (
          orders
            ?.filter((order) => order?.status === currentStep)
            .map((order, i) => <OrderCard key={i} order={order} />)
        ) : (
          <div className="noOrder">
            <div className="empty">
              <FaBoxOpen />
            </div>
            <div>You have no orders here</div>
          </div>
        )}
      </div>

      <style jsx>{`
        .inform {
          text-align: center;
        }
        .orderList {
          padding: 0 0.5rem;
          overflow: scroll;
          height: calc(100vh - 9rem);
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
