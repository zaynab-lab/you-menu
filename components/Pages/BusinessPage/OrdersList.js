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
      {currentStep === "waiting to confirm" && (
        <div className="orderList">
          {orders?.map((order, i) => (
            <OrderCard key={i} order={order} />
          ))}
        </div>
      )}
      <style>{`
      .inform{
        text-align:center;
      }
      .orderList{
        padding:0 .5rem;
        overflow:scroll;
        height:calc(100vh - 9rem);
      }
      `}</style>
    </>
  );
}
