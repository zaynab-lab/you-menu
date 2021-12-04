import OrdersSteps from "./OrdersSteps";
import {
  FaBackward,
  FaBan,
  FaCheck,
  FaHandHoldingHeart,
  FaReceipt,
  FaHandshake,
  FaShippingFast
} from "react-icons/fa";
import { useEffect, useState } from "react";
import OrdersList from "./OrdersList";
import axios from "axios";

export const initSteps = [
  {
    name: "waiting to confirm",
    state: "confirming",
    icon: <FaCheck />
  },
  { name: "payment", state: "paying", icon: <FaReceipt /> },
  {
    name: "preparing",
    state: "preparing",
    icon: <FaHandHoldingHeart />
  },
  {
    name: "delivering",
    state: "delivering",
    icon: <FaShippingFast />
  },
  {
    name: "serving",
    state: "serving",
    icon: <FaHandshake />
  },

  {
    name: "received",
    state: "received",
    icon: <FaCheck />
  },
  {
    name: "canceled",
    state: "canceled",
    icon: <FaBan />
  },
  {
    name: "returning",
    state: "returning",
    icon: <FaBackward />
  },

  {
    name: "not accepted",
    state: "returned",
    icon: <FaBan />
  }
];

export default function Orders({ businessCode }) {
  const [currentStep, setCurrentStep] = useState("confirming");
  const [orders, setOrders] = useState([0, 0]);
  const [refreshOrders, setRefreshOrders] = useState(false);
  const [steps, setSteps] = useState(initSteps);

  useEffect(() => {
    axios.get("/api/order").then((res) => {
      Array.isArray(res.data) && setOrders(res.data);
    });
  }, [refreshOrders]);

  useEffect(() => {
    !!orders[0]._id &&
      setSteps((steps) =>
        steps?.map((step) => {
          const count = orders?.filter(
            (order) => step.state === order.currentStatus
          ).length;
          return Object({ ...step, count: count });
        })
      );
  }, [orders]);
  return (
    <>
      <div className="orderPage">
        <OrdersSteps
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <div className="ordersContainer">
          <OrdersList
            steps={steps}
            currentStep={currentStep}
            orders={orders}
            businessCode={businessCode}
            setRefreshOrders={setRefreshOrders}
          />
        </div>
      </div>
      <style jsx>{`
        .orderPage {
          padding-top: 0.4rem;
        }

        .ordersContainer {
          overflow: scroll;
          height: fit-content;
        }
      `}</style>
    </>
  );
}
