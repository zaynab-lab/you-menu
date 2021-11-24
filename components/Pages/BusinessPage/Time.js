import BackButton from "@/components/BackButton";
import { styles } from "@/public/js/styles";
import { useState } from "react";
import Accept from "./Accept";
import BPLayout from "./BPLayout";

const time = [
  {
    name: "Sat",
    from: { h: 9, m: 0, AM: true },
    to: { h: 10, m: 0, AM: false }
  },
  {
    name: "Sun",
    from: { h: 9, m: 0, AM: true },
    to: { h: 10, m: 0, AM: false }
  },
  {
    name: "Mon",
    from: { h: 9, m: 0, AM: true },
    to: { h: 10, m: 0, AM: false }
  },
  {
    name: "Tue",
    from: { h: 9, m: 0, AM: true },
    to: { h: 10, m: 0, AM: false }
  },
  {
    name: "Wed",
    from: { h: 9, m: 0, AM: true },
    to: { h: 10, m: 0, AM: false }
  },
  {
    name: "Thu",
    from: { h: 9, m: 0, AM: true },
    to: { h: 10, m: 0, AM: false }
  },
  {
    name: "Fri",
    from: { h: 9, m: 0, AM: true },
    to: { h: 10, m: 0, AM: false }
  }
];
export default function Time({ business, setSelected }) {
  const [deliveryOn, setDeliveryOn] = useState(business.acceptDelivery);
  const [orderOn, setOrderOn] = useState(business.acceptOrders);

  return (
    <>
      <BackButton setSelected={setSelected} select="More" />
      <BPLayout>
        <Accept on={orderOn} setOn={setOrderOn} />
        <Accept delivery={true} on={deliveryOn} setOn={setDeliveryOn} />
        <div className="timeTitle">Select Openning Time</div>
        <div className="dayContainer">
          {time.map((day, i) => (
            <div className="day" key={i}>
              <div className="dayname">{day.name}</div>
            </div>
          ))}
        </div>
      </BPLayout>
      <style jsx>{`
        .timeTitle {
          padding: 1rem;
          color: ${styles.secondaryColor};
          font-size: 1.2rem;
        }
        .dayContainer {
          width: 100%;
          align-text: left;
        }
        .day {
          padding: 0.2rem;
          ${styles.flexAligncenter}
          gap:10vw;
        }
        .dayname {
          width: 2rem;
        }
      `}</style>
    </>
  );
}
// export function SelectTime({ time }) {
//   const [h, setH] = useState(time.h < 10 ? "0" + time.h : time.h);
//   const [m, setM] = useState(time.m < 10 ? "0" + time.m : time.m);
//   const [select, setSelect] = useState(time.AM ? "AM" : "PM");

//   return (
//     <>
//       <input
//         className="timeInput"
//         value={h}
//         onChange={(e) =>
//           e.target.value > -1 && e.target.value < 13 && setH(e.target.value)
//         }
//         onBlur={(e) =>
//           parseInt(e.target.value, 1) < 10
//             ? "0" + e.target.value
//             : e.target.value
//         }
//       />
//       {" : "}
//       <input
//         className="timeInput"
//         value={m}
//         onChange={(e) =>
//           e.target.value > -1 && e.target.value < 60 && setM(e.target.value)
//         }
//       />

//       <select
//         className="select"
//         value={select}
//         onChange={(e) => setSelect(e.target.value)}
//       >
//         <option value="AM">AM</option>
//         <option value="PM">PM</option>
//       </select>
//       <style jsx>{`
//         .select {
//           background: none;
//           border: none;
//         }
//         .timeInput {
//           width: 1rem;
//           border: none;
//         }
//       `}</style>
//     </>
//   );
// }
