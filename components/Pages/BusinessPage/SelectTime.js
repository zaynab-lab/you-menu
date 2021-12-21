import Button from "@/components/Button";
import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import ModalContainer from "@/components/ModalContainer";

export const fixHourView = (h, m, AM) => {
  return h + ":" + (m > 9 ? m : m + "0") + " " + (AM ? "AM" : "PM");
};
const checkInterval = (interval) => {
  let from = interval.from.AM
    ? interval.from.h * 60 + interval.from.m
    : interval.from.h * 60 + interval.from.m + 12 * 60;
  let to = interval.to.AM
    ? interval.to.h * 60 + interval.to.m
    : interval.to.h * 60 + interval.to.m + 12 * 60;

  return [from, to];
};

export default function SelectTime({ defaultIntervals, setDefaultIntervals }) {
  const [timeModal, setTimeModal] = useState(false);
  const [from, setFrom] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(0);

  return (
    <>
      <div className="hours">
        {defaultIntervals?.map((interval, k) => (
          <div key={k} className="hour">
            <span
              className="underline"
              onClick={() => {
                setSelectedInterval(k);
                setFrom(true);
                setTimeModal(true);
              }}
            >
              {fixHourView(
                interval?.from.h,
                interval?.from.m,
                interval?.from.AM
              )}
            </span>
            {" - "}
            <span
              className="underline"
              onClick={() => {
                setSelectedInterval(k);
                setFrom(false);
                setTimeModal(true);
              }}
            >
              {fixHourView(interval?.to.h, interval?.to.m, interval?.to.AM)}
            </span>
          </div>
        ))}
        {defaultIntervals.length < 2 ? (
          <div
            className="addHours"
            onClick={() =>
              setDefaultIntervals((defaultIntervals) => [
                ...defaultIntervals,
                {
                  from: { h: 8, m: 0, AM: true },
                  to: { h: 10, m: 0, AM: false }
                }
              ])
            }
          >
            + add a set of hours
          </div>
        ) : (
          <div
            className="addHours"
            onClick={() => {
              setSelectedInterval(0);
              setDefaultIntervals((defaultIntervals) => [defaultIntervals[0]]);
            }}
          >
            remove
          </div>
        )}
      </div>

      <TimeModal
        timeModal={timeModal}
        setTimeModal={setTimeModal}
        setFrom={setFrom}
        from={from}
        defaultIntervals={defaultIntervals}
        setDefaultIntervals={setDefaultIntervals}
        selectedInterval={selectedInterval}
      />

      <style jsx>{`
        .hours {
          ${styles.secondaryColor};
          ${styles.flexColumn};
          ${styles.flexBothcenter};
        }
        .hour {
          padding: 0.5rem;
          cursor: pointer;
        }
        .underline {
          border-bottom: 1px solid ${styles.secondaryColor};
        }
        .addHours {
          color: ${styles.secondaryColor};
          font-size: 0.9rem;
          cursor: pointer;
          padding-bottom: 0.5rem;
        }
        .holiday {
          color: gray;
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}

export function TimeModal({
  timeModal,
  setTimeModal,
  setFrom,
  from,
  setDefaultIntervals,
  defaultIntervals,
  selectedInterval
}) {
  const [msg, setMsg] = useState("");
  const [hidebtn, setHidebtn] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(
    defaultIntervals[selectedInterval]
  );

  useEffect(() => {
    !!defaultIntervals &&
      setCurrentInterval(defaultIntervals[selectedInterval]);
  }, [defaultIntervals, selectedInterval]);

  const handelIntervalChange = (qty, type) => {
    const newInterval = {
      ...currentInterval,
      [`${from ? "from" : "to"}`]: {
        ...currentInterval[`${from ? "from" : "to"}`],
        [type]: qty
      }
    };

    setCurrentInterval(newInterval);

    const [start, end] = checkInterval(newInterval);

    if (end - start <= 0) {
      setHidebtn(true);
    } else {
      let h = Math.floor((end - start) / 60);
      let m = (
        ((end - start) / 60 - Math.floor((end - start) / 60)) *
        60
      ).toFixed(0);
      setHidebtn(false);
      setMsg(
        (h > 0 ? h + " hours" : " you are open less than one hour !!") +
          (h > 0 && m > 0 ? " : " + m + " min" : " ")
      );
    }
  };

  return (
    <>
      <ModalContainer
        showModal={timeModal}
        setShowModal={setTimeModal}
        title={`Select ${from ? "Open" : "Close"} Time`}
      >
        <div className="timeBody">
          <Clock
            interval={currentInterval}
            handelIntervalChange={handelIntervalChange}
            setFrom={setFrom}
            from={from}
          />
        </div>
        <div className="msg">{hidebtn ? "select correct interval" : msg}</div>

        <div className="timebtn">
          <Button
            noLoading={true}
            content="done"
            onclick={() => {
              var newIntervals = [...defaultIntervals];
              newIntervals[selectedInterval] = currentInterval;
              !hidebtn && setDefaultIntervals(newIntervals);
              !hidebtn && setTimeModal(false);
            }}
          />
        </div>
      </ModalContainer>

      <style jsx>{`
        .timeContainer {
          border: 1px solid ${styles.secondaryColor};
          border-radius: 0.7rem;
          z-index: 101;
          background: white;
        }
        .timebtn {
          text-align: center;
        }
        .msg {
          text-align: center;
          color: ${styles.secondaryColor};
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}
const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const min = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export function Clock({ interval, handelIntervalChange, from, setFrom }) {
  return (
    <>
      <div className="timeBody">
        <div className="clock">
          {hours.map((hour, i) => (
            <div
              key={i}
              className="time"
              style={{
                transformOrigin: "bottom",
                Transform: `rotate(${i * 30}deg)`,
                WebkitTransform: `rotate(${i * 30}deg)`
              }}
              onClick={() => handelIntervalChange(hour, "h")}
            >
              <div
                className={`hour ${
                  interval &&
                  hour === interval[from ? "from" : "to"]?.h &&
                  "active"
                }`}
              >
                {hour}
              </div>
            </div>
          ))}
          <div className="minclock"></div>
          {min.map((min, j) => (
            <div
              key={j}
              style={{
                transformOrigin: "bottom",
                Transform: `rotate(${j * 30}deg)`,
                WebkitTransform: `rotate(${j * 30}deg)`
              }}
              className="minTime"
              onClick={() => handelIntervalChange(min, "m")}
            >
              <div
                className={`min ${
                  interval &&
                  min === interval[from ? "from" : "to"]?.m &&
                  "active"
                }`}
              >
                {min}
              </div>
            </div>
          ))}
          <div className="amclock"></div>
          <div
            className="ampm"
            onClick={() =>
              handelIntervalChange(
                interval && !interval[from ? "from" : "to"]?.AM,
                "AM",
                from
              )
            }
          >
            {interval && interval[from ? "from" : "to"]?.AM ? "AM" : "PM"}
          </div>
        </div>
      </div>
      <div className="intervalView">
        <div className={from && "activeHour"} onClick={() => setFrom(true)}>
          {fixHourView(interval?.from.h, interval?.from.m, interval?.from.AM)}
        </div>
        {" - "}
        <div className={!from && "activeHour"} onClick={() => setFrom(false)}>
          {fixHourView(interval?.to.h, interval?.to.m, interval?.to.AM)}
        </div>
      </div>

      <style jsx>{`
        .clock {
          width: 14rem;
          height: 14rem;
          background: white;
          position: relative;
          border-radius: 50%;
          ${styles.boxshadow}
        }
        .ampm {
          ${styles.flexBothcenter}
          position: absolute;
          font-size: 1.8rem;
          margin: auto;
          top: 5.7rem;
          left: 5.5rem;
          cursor: pointer;
        }
        .minclock {
          width: 10rem;
          height: 10rem;
          background: white;
          position: absolute;
          top: 2rem;
          left: 2rem;
          border-radius: 50%;
          border: 1px solid lightgray;
        }
        .amclock {
          width: 6rem;
          height: 6rem;
          background: white;
          position: absolute;
          top: 4rem;
          left: 4rem;
          border-radius: 50%;
          border: 1px solid lightgray;
        }
        .time {
          width: 2rem;
          height: 7rem;
          margin: auto;
          text-align: auto;
          position: absolute;
          top: 0;
          left: 6rem;
          padding: 0.2rem;
        }
        .minTime {
          width: 2rem;
          height: 5rem;
          margin: auto;
          text-align: auto;
          position: absolute;
          top: 2rem;
          left: 6rem;
          padding: 0.2rem;
        }
        .active {
          background: ${styles.secondaryColor};
          width: 1.6rem;
          color: white;
          border-radius: 2rem;
          ${styles.flexBothcenter}
        }
        .hour {
          cursor: pointer;
        }
        .min {
          cursor: pointer;
        }
        .timeBody {
          width: 100%;
          padding: 1rem;
          ${styles.flexBothcenter}
        }

        .intervalView {
          ${styles.flexBothcenter}
          color: gray;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .activeHour {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
