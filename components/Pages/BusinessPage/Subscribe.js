import Alert from "@/components/Alert";
import BackButton from "@/components/BackButton";
import BPLayout from "@/components/Pages/BusinessPage/BPLayout";
import { styles } from "@/public/js/styles";
import { useState } from "react";
import { FaCheck, FaGem } from "react-icons/fa";
const Usage = [
  { name: "products", use: "26", of: "/40" },
  { name: "categories", use: "8", of: "/10" },
  { name: "qr code", use: "", of: "30" }
];
const Plans = [
  {
    name: "Plan A",
    options: [
      "200 product",
      "30 category",
      "8 employee",
      "editing theme",
      "digital menu",
      "order system",
      "delivery system",
      "pos system",
      "accounting system"
    ],
    description: "69$/month - 690$/year"
  },

  {
    name: "Plan B",
    options: [
      "150 product",
      "30 category",
      "3 employee",
      "editing theme",
      "digital menu",
      "order system"
    ],
    description: "49$/month 490$/year"
  },
  {
    name: "Plan C",
    options: ["80 product", "15 category", "editing theme", "digital menu"],
    description: "29$/month 290$/year"
  },
  {
    name: "free plan",
    options: ["40 product", "10 category", "editing theme", "digital menu"],
    check: true
  }
];

export default function History({ setSelected }) {
  const [alert, setAlert] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <>
      <BackButton setSelected={setSelected} select={"More"} />
      <BPLayout>
        <div className="planContainer">
          {Plans.map((plan, i) => (
            <div key={i} className="plan">
              {plan.name}
              {plan.check ? (
                <div className="check">
                  <FaCheck />
                </div>
              ) : (
                <div
                  className="buy"
                  onClick={() => {
                    setAlert("comming soon");
                  }}
                >
                  buy
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="planContainer">
          <div className="usage" onClick={() => setOpen(!open)}>
            <div className="gem">
              <FaGem />
            </div>
            <div>usage</div>
          </div>
          {open &&
            Usage.map((use, i) => (
              <div key={i} className="plan">
                <div>{use.name}</div>
                <div className="useValue">{use.use + use.of}</div>
              </div>
            ))}
        </div>

        {Plans.map((plan, i) => (
          <div key={i} className="planContainer">
            <div className="planHeader">
              {plan.name} <div className="description">{plan.description}</div>
            </div>
            <div className="options">
              {plan.options.map((op) => (
                <div className="op">
                  <span className="checkItem">
                    <FaCheck />
                  </span>
                  {op}
                </div>
              ))}
            </div>
          </div>
        ))}

        <Alert setAlert={setAlert} alert={alert} />
      </BPLayout>

      <style jsx>{`
        .planContainer {
          ${styles.boxshadow}
          width: 100%;
          ${styles.flexColumn};
          border-radius: 0.6rem;
          font-size: 1.2rem;
          margin: 1rem 0rem;
        }
        .plan {
          padding: 0.2rem 0.8rem;
          border-bottom: 1px solid lightgrey;
          ${styles.flexAligncenter}
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          font-size: 1.3rem;
        }

        .plan:last-child {
          border-bottom: none;
        }
        .check {
          color: green;
          line-height: 0;
          padding-right: 1rem;
        }
        .buy {
          color: ${styles.secondaryColor};
          padding: 0.2rem 0.8rem;
          border-radius: 0.3rem;
        }
        .usage {
          padding: 0rem 0.8rem;
          padding-bottom: 0.2rem;
          width: 100%;
          border-radius: 0.6rem;
          font-size: 1.2rem;
          ${styles.flexAligncenter}
          gap:.5rem;
        }
        .gem {
          padding-top: 0.8rem;
        }
        .useValue {
          color: green;
        }
        .options {
          font-size: 1.1rem;
          ${styles.flexAligncenter};
          flex-wrap: wrap;
          white-space: nowrap;
          padding: 0.6rem;
        }
        .checkItem {
          color: green;
          font-size: 0.9rem;
          line-height: 0;
          padding-right: 0.3rem;
        }

        .op {
          flex: 1 1 50%;
        }
        .planHeader {
          text-align: center;
          padding: 0.6rem;
          font-size: 1.8rem;
          background: white;
          color: ${styles.secondaryColor};
          border-bottom: 1px solid ${styles.secondaryColor};
          border-radius: 0.6rem 0.6rem 0rem 0rem;
        }
        .description {
          font-size: 1rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
