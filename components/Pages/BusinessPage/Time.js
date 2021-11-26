import BackButton from "@/components/BackButton";
import Onoff from "@/components/Onoff";
import { styles } from "@/public/js/styles";
import axios from "axios";
import { useState } from "react";
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
export default function Time({ business, setSelected }) {
  const [deliveryOn, setDeliveryOn] = useState(business.acceptDelivery);
  const [orderOn, setOrderOn] = useState(business.acceptOrders);

  return (
    <>
      <BackButton setSelected={setSelected} select="More" />
      <BPLayout>
        <Accept
          on={orderOn}
          setOn={() => {
            axios.put(
              `/api/business/acceptOrders`,
              {
                acceptOrders: !orderOn,
                businessCode: business?.businessCode
              },
              { "content-type": "application/json" }
            );
            setOrderOn(!orderOn);
          }}
        />
        <Accept
          delivery={true}
          on={deliveryOn}
          setOn={() => {
            axios.put(
              `/api/business/acceptDelivery`,
              {
                acceptDelivery: !deliveryOn,
                businessCode: business?.businessCode
              },
              { "content-type": "application/json" }
            );
            setDeliveryOn(!deliveryOn);
          }}
        />
        <div className="timeTitle">
          <FaRegClock />
          select availble time
        </div>
        <div className="dayContainer">
          {time.map((day, i) => (
            <div className="day" key={i}>
              <div className="dayname">{days[i]}</div>
              <SelectTime
                defaultIntervals={day.intervals}
                availble={day.availble}
              />
              <Onoff on={day.availble} noText="true" />
            </div>
          ))}
        </div>
      </BPLayout>
      <style jsx>{`
        .timeTitle {
          width: 100%;
          padding: 1rem;
          font-size: 1.2rem;
          ${styles.flexAligncenter}
          gap:.8rem;
        }
        .dayContainer {
          width: 100%;
          align-text: left;
          padding: 0.5rem;
        }
        .day {
          padding: 1rem 0.5rem;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          ${styles.flexAligncenter}
          border-bottom: 1px solid #eee;
        }
        .dayname {
          width: 2rem;
          font-size: 1.4rem;
          color: gray;
        }
      `}</style>
    </>
  );
}
