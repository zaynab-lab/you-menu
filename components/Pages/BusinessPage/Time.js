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
  const [twentyfour, setTwentyfour] = useState(business?.twentyfour);
  const [everyday, setEveryday] = useState(business?.everyday);
  const [activeSave, setActiveSave] = useState(false);
  const [everyDayInterval, setEveryDayInterval] = useState(
    business?.everyDayInterval.length > 0
      ? business?.everyDayInterval
      : [{ from: { h: 9, m: 0, AM: true }, to: { h: 10, m: 0, AM: false } }]
  );
  const [daysInterval, setDaysInterval] = useState(
    business?.daysInterval.length > 0 ? business?.daysInterval : time
  );

  const changeDaysInterval = (i, newIntervals) => {
    const newDaysInterval = [...daysInterval];
    newDaysInterval[i] = { ...newDaysInterval[i], intervals: newIntervals };
    setDaysInterval(newDaysInterval);
  };

  const changeDaysAvailble = (i, availble) => {
    const newDaysInterval = [...daysInterval];
    newDaysInterval[i] = { ...newDaysInterval[i], availble: availble };
    setDaysInterval(newDaysInterval);
  };

  // useEffect(() => {
  //   console.log("hye");
  //   JSON.stringify(daysInterval) !== JSON.stringify(business?.daysInterval) &&
  //   !everyday &&
  //   !twentyfour
  //     ? setActiveSave(true)
  //     : setActiveSave(false);
  // }, [everyday, twentyfour, daysInterval, business]);

  useEffect(() => {
    if (
      !!twentyfour !== business.twentyfour ||
      !!everyday !== business.everyday ||
      (everyday &&
        JSON.stringify(everyDayInterval) !==
          JSON.stringify(business?.everyDayInterval))
    ) {
      setActiveSave(true);
    } else if (
      JSON.stringify(business?.daysInterval) !== JSON.stringify(daysInterval) &&
      !everyday &&
      !twentyfour
    ) {
      setActiveSave(true);
    } else {
      setActiveSave(false);
    }
  }, [daysInterval, everyDayInterval, everyday, twentyfour, business]);

  return (
    <>
      <BackButton setSelected={setSelected} select="More" />
      <BPLayout>
        <AcceptOrders
          business={business}
          setRefreshBusiness={setRefreshBusiness}
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
                (twentyfour
                  ? axios
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
                      })
                  : everyday
                  ? axios
                      .put(
                        "/api/business/everyDayInterval",
                        {
                          everyDayInterval: everyDayInterval,
                          businessCode: business?.businessCode
                        },
                        { "content-type": "application/json" }
                      )
                      .then((res) => {
                        res.data === "done" &&
                          setRefreshBusiness((refresh) => !refresh);
                      })
                  : axios
                      .put(
                        "/api/business/daysInterval",
                        {
                          daysInterval: daysInterval,
                          businessCode: business?.businessCode
                        },
                        { "content-type": "application/json" }
                      )
                      .then((res) => {
                        res.data === "done" &&
                          setRefreshBusiness((refresh) => !refresh);
                      }));
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
              <SelectTime
                defaultIntervals={everyDayInterval}
                setDefaultIntervals={setEveryDayInterval}
                availble={true}
              />
            </div>
          ) : (
            <div className="dayContainer">
              {daysInterval?.map((day, i) => (
                <div className="day" key={i}>
                  <div className="dayname">{days[i]}</div>
                  <ControlAvailbleDays
                    i={i}
                    changeDaysInterval={changeDaysInterval}
                    changeDaysAvailble={changeDaysAvailble}
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

export function ControlAvailbleDays({
  i,
  availble,
  intervals,
  changeDaysInterval,
  changeDaysAvailble
}) {
  const [on, setOn] = useState(availble);
  const [defaultIntervals, setDefaultIntervals] = useState(intervals);
  useEffect(() => {
    defaultIntervals !== intervals && changeDaysInterval(i, defaultIntervals);
  }, [i, intervals, defaultIntervals, changeDaysInterval]);

  useEffect(() => {
    availble !== on && changeDaysAvailble(i, on);
  }, [i, on, availble, changeDaysAvailble]);

  return (
    <>
      {on ? (
        <SelectTime
          i={i}
          changeDaysInterval={changeDaysInterval}
          defaultIntervals={defaultIntervals}
          setDefaultIntervals={setDefaultIntervals}
          availble={availble}
        />
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

export function AcceptOrders({ business, setRefreshBusiness }) {
  const [deliveryOn, setDeliveryOn] = useState(business.acceptDelivery);
  const [orderOn, setOrderOn] = useState(business.acceptOrders);

  return (
    <>
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
                res.data === "done" && setRefreshBusiness((refresh) => !refresh)
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
                res.data === "done" && setRefreshBusiness((refresh) => !refresh)
            );
          setDeliveryOn(!deliveryOn);
        }}
      />
      <style jsx>{`
        .acceptContainer {
          width: 100%;
          font-size: 1.2rem;
          ${styles.flexAligncenter}
          ${styles.justifyBetween}
          padding: 0.8rem 1.2rem;
          border-bottom: 1px solid gray;
        }

        .title {
          color: ${styles.secondaryColor};
          ${styles.flexAligncenter};
          gap: 1rem;
        }
      `}</style>
    </>
  );
}
