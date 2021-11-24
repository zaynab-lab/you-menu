import { styles } from "@/public/js/styles";

export default function OrdersSteps({ steps, currentStep, setCurrentStep }) {
  return (
    <>
      <div className="stepBar">
        {steps?.map((step, i) => (
          <div
            key={i}
            onClick={() => setCurrentStep(step.state)}
            className={`stepContainer ${
              step.state === currentStep && "active"
            }`}
          >
            <div className="stepIcon">{step.icon}</div>
            <div className="stepName">{step.name}</div>
            {step.count > 0 && <div className="count">{step.count}</div>}
          </div>
        ))}
      </div>
      <style>{`
        .stepBar{
          padding:.6rem;
          overflow:auto;
          ${styles.flexAligncenter}
        }
        .stepContainer{
          border-radius:5rem;
          white-space:nowrap;
          padding:.1rem .3rem .2rem .3rem;
          margin:0 .3rem;
          cursor:pointer;
          ${styles.flexAligncenter}
          -webkit-box-shadow: 0 0px 5px 0 grey;box-shadow: 0 0px 5px 0 grey;
        }
        .stepIcon{
          padding:.3rem;
          padding-bottom:0;
          font-size:.7em;
        }
        .stepName{
          padding:0 .3rem;
        }
        .count{
          width:1.2rem;
          height:1.2rem;
          border-radius:20rem;
          color:white;
          margin:0 .2rem;
          background:${styles.secondaryColor};
          -webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;
          ${styles.flexAligncenter}
        }
        .active{
          -webkit-box-shadow: 0 0px 5px 0 ${styles.secondaryColor};box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
        }

        `}</style>
    </>
  );
}
