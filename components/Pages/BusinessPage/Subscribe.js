import Alert from "@/components/Alert";
import BackButton from "@/components/BackButton";
import BPLayout from "@/components/Pages/BusinessPage/BPLayout";
import { styles } from "@/public/js/styles";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck, FaGem } from "react-icons/fa";
const Usage = [
  { name: "products" },
  { name: "categories" },
  { name: "qr code", of: "30" }
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
    planProducts: 200,
    planCategories: 30,
    description: "89$/month - 890$/year",
    rank: 1
  },

  {
    name: "Plan B",
    options: [
      "120 product",
      "25 category",
      "editing theme",
      "digital menu",
      "order system"
    ],
    planProducts: 120,
    planCategories: 25,
    description: "49$/month 490$/year",
    rank: 2
  },
  {
    name: "Plan C",
    options: [
      "80 product",
      "15 category",
      "editing theme",
      "digital menu",
      "order system"
    ],
    planProducts: 80,
    planCategories: 15,
    description: "29$/month 290$/year",
    rank: 3
  },
  {
    name: "free plan",
    options: ["50 product", "10 category", "editing theme", "digital menu"],
    planProducts: 50,
    planCategories: 10,
    rank: 4
  }
];

export default function Subscribe({ setSelected, business }) {
  const [alert, setAlert] = useState("");
  const [count, setCount] = useState({});
  const [subPlan, setPlan] = useState("free plan");
  const [rank, setRank] = useState(4);
  const [days, setDays] = useState(1);
  const [of, setOf] = useState({});
  useEffect(() => {
    business?.businessCode &&
      axios
        .get(`/api/categories/getCounts?businessCode=${business.businessCode}`)
        .then((res) => res?.data?.categories && setCount(res.data));

    business?.subscribe[business?.subscribe?.length - 1]
      ? setPlan(business?.subscribe[business?.subscribe?.length - 1]?.plan)
      : setPlan("free plan");

    setDays(
      business?.subscribe[business?.subscribe.length - 1]?.validation -
        Math.ceil(
          (new Date(Date.now()) -
            new Date(
              business?.subscribe[business?.subscribe.length - 1]?.date
            )) /
            (1000 * 60 * 60 * 24)
        )
    );
  }, [business]);

  useEffect(() => {
    Plans.map((plan) => plan.name === subPlan && setRank(plan.rank));
    Plans.map(
      (plan) =>
        plan.name === subPlan &&
        setOf({
          products: plan.planProducts,
          categories: plan.planCategories,
          "qr code": 30
        })
    );
  }, [subPlan]);

  return (
    <>
      <BackButton setSelected={setSelected} select={"More"} />
      <BPLayout>
        {business?.subscribe[business?.subscribe?.length - 1] ? (
          days > 0 ? (
            <div className="greenNoty">
              {"you still have " + days + " days validation for current plan"}
            </div>
          ) : (
            <div className="redNoty">your subscribtion is over from {days}</div>
          )
        ) : (
          <div className="greenNoty">you have the free plan</div>
        )}
        <div className="planContainer">
          {Plans.map((plan, i) => (
            <div key={i} className="plan">
              {plan.name}
              {subPlan === plan.name ? (
                <div className="check">
                  <FaCheck />
                </div>
              ) : (
                rank >= plan.rank && (
                  <Link
                    href={`https://wa.me/+96170097533?text=I want to upgrade to ${plan.name}`}
                  >
                    <div className="upgrade">upgrade</div>
                  </Link>
                )
              )}
            </div>
          ))}
        </div>

        <div className="planContainer">
          <div className="usage">
            <div className="gem">
              <FaGem />
            </div>
            <div>usage</div>
          </div>
          {Usage.map((use, j) => (
            <div key={j} className="plan">
              <div>{use.name}</div>
              <div className={count[use.name] > of[use.name] ? "red" : "green"}>
                {count[use.name] && count[use.name]}
                {"/" + of[use.name]}
              </div>
            </div>
          ))}
        </div>

        {Plans.map((plan, k) => (
          <div key={k} className="planContainer">
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
        .greenNoty {
          margin-top: 1rem;
          padding: 0.2rem;
          color: green;
          background: #ddffdd;
          width: 100%;
          text-align: center;
        }
        .redNoty {
          margin-top: 1rem;
          padding: 0.2rem;
          color: red;
          background: #ffdddd;
          width: 100%;
          text-align: center;
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
          padding-right: 2rem;
        }
        .upgrade {
          color: ${styles.secondaryColor};
          padding: 0.2rem 0.8rem;
          border-radius: 0.3rem;
          font-size: 1rem;
        }
        .usage {
          padding: 0rem 0.8rem;
          padding-bottom: 0.2rem;
          width: 100%;
          border-radius: 0.6rem;
          font-size: 1.2rem;
          ${styles.flexAligncenter}
          gap:.5rem;
          cursor: pointer;
        }
        .gem {
          padding-top: 0.8rem;
        }
        .green {
          color: green;
        }
        .red {
          color: red;
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
