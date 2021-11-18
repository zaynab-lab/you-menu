import OrdersSteps from "./OrdersSteps";
import {
  FaBackward,
  FaCheck,
  FaHandHoldingHeart,
  FaReceipt,
  FaShippingFast
} from "react-icons/fa";
import { useEffect, useState } from "react";
import OrdersList from "./OrdersList";
import { styles } from "../../../public/js/styles";

const steps = [
  { name: "waiting to confirm", icon: <FaCheck />, count: 0 },
  { name: "pending to pay", icon: <FaReceipt /> },
  { name: "preparing", icon: <FaHandHoldingHeart /> },
  { name: "delivering", icon: <FaShippingFast /> },
  { name: "done", icon: <FaCheck /> },
  { name: "not accepted", icon: <FaBackward /> }
];
const orderfromdb = [
  // {
  //   items: [
  //     { name: "milkshack" },
  //     { name: "hot choclate" },
  //     { name: "ice tee" }
  //   ],
  //   type: "delivery",
  //   status: "waiting to confirm",
  //   steps: { name: "waiting to confirm", time: Date.now() },
  //   total: 50
  // }
];

export default function Orders() {
  const [currentStep, setCurrentStep] = useState("waiting to confirm");
  const [orders, setOrders] = useState([0, 0]);

  useEffect(() => {
    setOrders(orderfromdb);
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
          <OrdersList steps={steps} currentStep={currentStep} orders={orders} />
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
