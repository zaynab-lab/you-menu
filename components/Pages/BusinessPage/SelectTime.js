import { styles } from "@/public/js/styles";
import { useState } from "react";

export default function SelectTime({ defaultIntervals, availble }) {
  const [intervals, setIntervals] = useState(defaultIntervals);

  return (
    <>
      {availble ? (
        <div className="hours">
          {intervals.map((interval) => (
            <div className="hour">
              <span className="underline">
                {interval?.from.h +
                  ":" +
                  (interval?.from.m > 10
                    ? interval?.from.m
                    : interval?.from.m + "0") +
                  " " +
                  (interval?.from.AM ? "AM" : "PM")}
              </span>
              {" - "}
              <span className="underline">
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
      <style jsx>{`
        .hours {
          ${styles.secondaryColor};
          ${styles.flexColumn};
          ${styles.flexBothcenter};
        }
        .hour {
          padding: 0.5rem;
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
