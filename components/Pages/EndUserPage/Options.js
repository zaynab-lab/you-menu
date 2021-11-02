import Alert from "@/components/Alert";
import { styles } from "@/public/js/styles";
import { useState } from "react";

import {
  FaCreditCard,
  FaFileSignature,
  FaHistory,
  FaIdCard,
  FaLanguage,
  FaPercent,
  FaQuestion
} from "react-icons/fa";

const more = [
  {
    name: "profile",
    icon: <FaIdCard />,
    selected: "Profile",
    auth: false
  },
  {
    name: "credit",
    icon: <FaCreditCard />,
    selected: "Credit",
    auth: false,
    credit: true,
    cs: true
  },
  {
    name: "discounts & coupons",
    icon: <FaPercent />,
    selected: "Discount",
    auth: false
  },
  {
    name: "order history",
    icon: <FaHistory />,
    selected: "History",
    auth: false
  },
  {
    name: "conditions & rights",
    icon: <FaFileSignature />,
    selected: "Rights",
    auth: true
  },

  {
    name: "language",
    icon: <FaLanguage />,
    selected: "Language",
    auth: true,
    cs: true
  },

  {
    name: "support",
    icon: <FaQuestion />,
    selected: "Support",
    auth: true
  }
];

export default function Options({ setSelected, auth, openModal, credit }) {
  const [alert, setAlert] = useState("");
  return (
    <>
      <div className="more">
        {more
          .filter((obj) => auth || obj.auth)
          .map((item, i) => (
            <div
              key={i}
              onClick={() => {
                !item.cs && setSelected(item.selected);
                item.cs && setAlert("comming soon");
              }}
              style={{
                transition: `${
                  i * 0.15
                }s all cubic-bezier(0.76, -0.48, 0.61, 1.5)`
              }}
              className={`more-item swipe ${openModal && "In"}`}
            >
              <div className="logoName">
                <div className="more-icon">{item.icon}</div>
                <div>{item.name}</div>
              </div>
              {item.credit && <div className="extra">{credit} $</div>}
            </div>
          ))}
      </div>
      <Alert alert={alert} setAlert={setAlert} />

      <style jsx>{`
        .more {
          padding: 0.8rem;
        }

        .more-item {
          ${styles.flexAligncenter}
          padding: 0.4rem;
          font-size: 1.3rem;
          cursor: pointer;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .logoName {
          ${styles.flexAligncenter}
          gap: 1rem;
        }

        .more-icon {
          color: ${styles.secondaryColor};
          padding-top: 0.6rem;
        }
        .extra {
          font-size: 1.2rem;
        }

        .swipe {
          position: relative;
          left: -20rem;
          text-align: center;
        }

        .In {
          left: 0rem;
        }
      `}</style>
    </>
  );
}
