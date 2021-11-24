import OrdersSteps from "./OrdersSteps";
import {
  FaBackward,
  FaBan,
  FaCheck,
  FaHandHoldingHeart,
  FaReceipt,
  FaShippingFast
} from "react-icons/fa";
import { useEffect, useState } from "react";
import OrdersList from "./OrdersList";
import axios from "axios";

const steps = [
  {
    name: "waiting to confirm",
    state: "confirmation",
    icon: <FaCheck />,
    count: 0
  },
  { name: "pending to pay", state: "payment", icon: <FaReceipt /> },
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
    name: "done",
    state: "received",
    icon: <FaCheck />
  },
  {
    name: "canceled",
    state: "canceled",
    icon: <FaBan />
  },
  {
    name: "not accepted",
    state: "returned",
    icon: <FaBackward />
  }
];

export default function Orders({ businessCode }) {
  const [currentStep, setCurrentStep] = useState("confirmation");
  const [orders, setOrders] = useState([0, 0]);
  useEffect(() => {
    axios
      .get("/api/order")
      .then((res) => Array.isArray(res.data) && setOrders(res.data));
  }, []);

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
