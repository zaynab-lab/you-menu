import { styles } from "../../../public/js/styles";
import Button from "../../Button";

export default function OrdersList({ steps, currentStep, orders }) {
  return (
    <>
      <div className="inform">
        {steps.map(
          (step) =>
            step.name === currentStep &&
            (step.count > 0 ? step.count + " orders" : " no order")
        )}{" "}
        {currentStep}
      </div>
      {currentStep === "waiting to confirm" && (
        <div className="orderList">
          {orders.map((order, i) => (
            <Order key={i} order={order} />
          ))}
        </div>
      )}
      <style>{`
      .inform{
        text-align:center;
      }
      .orderList{
        padding:0 .5rem;
      }
      `}</style>
    </>
  );
}
export function Order({ order }) {
  return (
    <>
      <div className="orderCard">
        <div>{order.type}</div>
        <div>
          <Button content={"confirm"} />
        </div>
      </div>
      <style>{`
    .orderCard{
      border-radius:.5rem;
      ${styles.boxshadow}
      padding:.5rem;
      margin:.8rem;
    }
    `}</style>
    </>
  );
}
