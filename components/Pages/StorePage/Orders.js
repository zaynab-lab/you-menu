import Accept from "./Accept";
import OrdersSteps from "./OrdersSteps";
import {
  FaBackward,
  FaBoxOpen,
  FaCheck,
  FaHandHoldingHeart,
  FaReceipt,
  FaShippingFast
} from "react-icons/fa";
import { useState } from "react";
import OrdersList from "./OrdersList";
import { styles } from "../../../public/js/styles";

const steps = [
  { name: "waiting to confirm", icon: <FaCheck />, count: 3 },
  { name: "pending to pay", icon: <FaReceipt /> },
  { name: "preparing", icon: <FaHandHoldingHeart /> },
  { name: "delivering", icon: <FaShippingFast /> },
  { name: "done", icon: <FaCheck /> },
  { name: "not accepted", icon: <FaBackward /> }
];
const orderfromdb = [
  {
    items: [{ name: "milkshack" }],
    type: "delivery",
    state: "waiting to confirm"
  },
  {
    items: [{ name: "milkshack" }],
    type: "table 5",
    state: "waiting to confirm"
  },
  {
    items: [{ name: "milkshack" }],
    type: "table 8",
    state: "waiting to confirm"
  }
];

export default function Orders() {
  const [currentStep, setCurrentStep] = useState("waiting to confirm");
  const [orders, setOrders] = useState(orderfromdb);
  return (
    <>
      <Accept />
      <OrdersSteps
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      {orders === [] ? (
        <div className="empty">
          <FaBoxOpen />
        </div>
      ) : (
        <div className="ordersContainer">
          <OrdersList steps={steps} currentStep={currentStep} orders={orders} />
        </div>
      )}
      <style>{`
      .empty{
        font-size:10rem;
        text-align:center;
        padding-top:4rem;
        color:${styles.grey};
        opacity:.5;
      }
      .ordersContainer{
        overflow:scroll;
        height:fit-content;
      }
      `}</style>
    </>
  );
}
