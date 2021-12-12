import Button from "@/components/Button";
import { styles } from "@/public/js/styles";
import { useState } from "react";

export default function SelectTime({ defaultIntervals, availble }) {
  const [intervals, setIntervals] = useState(defaultIntervals);
  const [timeModal, setTimeModal] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  return (
    <>
      {availble ? (
        <div className="hours">
          {intervals.map((interval, k) => (
            <div key={k} className="hour">
              <span
                className="underline"
                onClick={() => {
                  setOpenTime(true);
                  setTimeModal(true);
                }}
              >
                {interval?.from.h +
                  ":" +
                  (interval?.from.m > 10
                    ? interval?.from.m
                    : interval?.from.m + "0") +
                  " " +
                  (interval?.from.AM ? "AM" : "PM")}
              </span>
              {" - "}
              <span
                className="underline"
                onClick={() => {
                  setOpenTime(false);
                  setTimeModal(true);
                }}
              >
                {interval?.to.h +
                  ":" +
                  (interval?.to.m > 10
                    ? interval?.to.m
                    : interval?.to.m + "0") +
                  " " +
                  (interval?.to.AM ? "AM" : "PM")}
              </span>
            </div>
          ))}
          {intervals.length < 2 ? (
            <div
              className="addHours"
              onClick={() =>
                setIntervals((intervals) => [
                  ...intervals,
                  {
                    from: { h: 9, m: 0, AM: true },
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
              onClick={() => setIntervals((intervals) => intervals.slice(-1))}
            >
              remove
            </div>
          )}
        </div>
      ) : (
        <div className="holiday">holiday</div>
      )}

      <TimeModal
        timeModal={timeModal}
        setTimeModal={setTimeModal}
        openTime={openTime}
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

export function TimeModal({ timeModal, setTimeModal, openTime }) {
  return (
    <>
      <div className={`timeModal ${timeModal && "showTimeModal"}`}>
        <div className="timeContainer">
          <div className="Xheader">
            <div>Select {openTime ? "Open" : "Close"} Time</div>
            <div
              className="X"
              onClick={() => {
                setTimeModal(false);
              }}
            >
              x
            </div>
          </div>
          <div className="timeBody">
            <Clock />
          </div>
          <div className="timebtn">
            <Button content="done" onclick={() => setTimeModal(false)} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeModal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          opacity: 0;
          ${styles.flexBothcenter}
          ${styles.flexColumn}
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }

        .showTimeModal {
          opacity: 100;
          z-index: 100;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
          background: #8888;
        }

        .Xheader {
          text-align: right;
          min-width: 22rem;
          background: white;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          ${styles.justifyBetween};
          padding: 0.4rem 0.6rem;
          border-radius: 0.7rem 0.7rem 0 0;
        }

        .X {
          font-size: 1.6rem;
          line-height: 0;
          padding-bottom: 0.4rem;
          cursor: pointer;
        }

        .timeContainer {
          border: 1px solid ${styles.secondaryColor};
          border-radius: 0.7rem;
          z-index: 101;
          background: white;
        }
        .timeBody {
          width: 100%;
          padding: 1rem;
          ${styles.flexBothcenter}
        }
        .timebtn {
          text-align: center;
        }
      `}</style>
    </>
  );
}
const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const min = ["00", "05", 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
export function Clock() {
  const [selectedMin, setSelectedMin] = useState(30);
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectAM, setSelectAM] = useState("AM");

  return (
    <>
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
            onClick={() => setSelectedHour(hour)}
          >
            <div className={`hour ${hour === selectedHour && "active"}`}>
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
            onClick={() => setSelectedMin(min)}
          >
            <div className={`min ${min === selectedMin && "active"}`}>
              {min}
            </div>
          </div>
        ))}
        <div className="amclock"></div>
        <div
          className="ampm"
          onClick={() =>
            setSelectAM((current) => (current === "AM" ? "PM" : "AM"))
          }
        >
          {selectAM}
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
      `}</style>
    </>
  );
}
