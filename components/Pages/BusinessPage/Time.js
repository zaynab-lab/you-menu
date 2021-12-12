import BackButton from "@/components/BackButton";
import Onoff from "@/components/Onoff";
import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Accept from "./Accept";
import SelectTime from "./SelectTime";

import BPLayout from "./BPLayout";
import { FaRegClock } from "react-icons/fa";

const time = [
  {
    availble: true,
    intervals: [
      { from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }
    ]
  },
  {
    availble: true,
    intervals: [
      { from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }
    ]
  },
  {
    availble: true,
    intervals: [
      { from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }
    ]
  },

  {
    availble: true,
    intervals: [
      { from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }
    ]
  },

  {
    availble: true,
    intervals: [
      { from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }
    ]
  },

  {
    availble: true,
    intervals: [
      { from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }
    ]
  },

  {
    availble: true,
    intervals: [
      { from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }
    ]
  }
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Time({ business, setSelected, setRefreshBusiness }) {
  const [deliveryOn, setDeliveryOn] = useState(business.acceptDelivery);
  const [orderOn, setOrderOn] = useState(business.acceptOrders);
  const [twentyfour, setTwentyfour] = useState(business?.twentyfour);
  const [everyday, setEveryday] = useState(false);
  const [activeSave, setActiveSave] = useState(false);
  const [everydayDefault, setEverydayDefault] = useState([
    { from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }
  ]);

  useEffect(() => {
    twentyfour !== business.twentyfour && setActiveSave((active) => !active);
  }, [twentyfour, business]);

  return (
    <>
      <BackButton setSelected={setSelected} select="More" />
      <BPLayout>
        <Accept
          on={orderOn}
          setOn={() => {
            axios
              .put(
                `/api/business/acceptOrders`,
                {
                  acceptOrders: !orderOn,
                  businessCode: business?.businessCode
                },
                { "content-type": "application/json" }
              )
              .then(
                (res) =>
                  res.data === "done" &&
                  setRefreshBusiness((refresh) => !refresh)
              );
            setOrderOn(!orderOn);
          }}
        />
        <Accept
          delivery={true}
          on={deliveryOn}
          setOn={() => {
            axios
              .put(
                `/api/business/acceptDelivery`,
                {
                  acceptDelivery: !deliveryOn,
                  businessCode: business?.businessCode
                },
                { "content-type": "application/json" }
              )
              .then(
                (res) =>
                  res.data === "done" &&
                  setRefreshBusiness((refresh) => !refresh)
              );
            setDeliveryOn(!deliveryOn);
          }}
        />
        <div className="selectTitle">
          <div className="timeTitle">
            <FaRegClock />
            select open time
          </div>
          <div
            className={`save ${activeSave && "activeSave"}`}
            onClick={() => {
              setActiveSave(false);
              activeSave &&
                axios
                  .put(
                    "/api/business/twentyfour",
                    {
                      twentyfour: twentyfour,
                      businessCode: business?.businessCode
                    },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    res.data === "done" &&
                      setRefreshBusiness((refresh) => !refresh);
                  });
            }}
          >
            save
          </div>
        </div>
        <div className="controlSection">
          <div
            className={`choose ${!twentyfour && "twentyfour"}`}
            onClick={() => setTwentyfour(!twentyfour)}
          >
            24 hours open
          </div>
          {!twentyfour && (
            <div
              className={`choose ${!everyday && "twentyfour"}`}
              onClick={() => setEveryday(!everyday)}
            >
              every day open
            </div>
          )}
        </div>
        {!twentyfour &&
          (everyday ? (
            <div className="day">
              <div className="dayname">set time</div>
              <SelectTime defaultIntervals={everydayDefault} availble={true} />
            </div>
          ) : (
            <div className="dayContainer">
              {time.map((day, i) => (
                <div className="day" key={i}>
                  <div className="dayname">{days[i]}</div>
                  <ControlAvailbleDays
                    availble={day.availble}
                    intervals={day.intervals}
                  />
                </div>
              ))}
            </div>
          ))}
      </BPLayout>
      <style jsx>{`
        .selectTitle {
          padding-right: 2rem;
          width: 100%;
          ${styles.flexAligncenter}
        }
        .timeTitle {
          width: 100%;
          padding: 1rem;
          font-size: 1.2rem;
          ${styles.flexAligncenter}
          gap:.8rem;
        }
        .save {
          color: gray;
          cursor: pointer;
        }
        .activeSave {
          color: ${styles.secondaryColor};
        }
        .dayContainer {
          width: 100%;
          align-text: left;
          padding: 0.5rem;
        }
        .day {
          width: 100%;
          padding: 1rem 0.5rem;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          ${styles.flexAligncenter}
          border-bottom: 1px solid #eee;
          white-space: nowrap;
        }
        .dayname {
          width: 2rem;
          font-size: 1.4rem;
          color: gray;
        }
        .controlSection {
          width: 100%;
          ${styles.flexAligncenter}
          gap:1rem;
          padding-bottom: 1rem;
          padding-left: 1rem;
        }
        .choose {
          cursor: pointer;
          border: 1px solid ${styles.secondaryColor};
          border-radius: 3rem;
          font-size: 0.9rem;
          padding: 0rem 0.6rem;
          color: ${styles.secondaryColor};
          ${styles.userSelect}
        }
        .twentyfour {
          color: gray;
          text-decoration: line-through;
          border: 1px solid gray;
        }
      `}</style>
    </>
  );
}

export function ControlAvailbleDays({ availble, intervals }) {
  const [on, setOn] = useState(availble);
  return (
    <>
      {on ? (
        <SelectTime defaultIntervals={intervals} availble={availble} />
      ) : (
        <div className="close">close</div>
      )}
      <Onoff on={on} setOn={() => setOn(!on)} noText="true" />
      <style jsx>{`
        .close {
          color: gray;
        }
      `}</style>
    </>
  );
}
