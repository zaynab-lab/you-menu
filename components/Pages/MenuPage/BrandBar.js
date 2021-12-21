import Logo from "@/components/Logo";
import { styles } from "@/public/js/styles";
import { useState } from "react";
import {
  FaCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock
} from "react-icons/fa";
import ModalContainer from "@/components/ModalContainer";
import { fixHourView } from "../BusinessPage/SelectTime";
import { days } from "../BusinessPage/Time";

const today = new Date().getDay() - 1;
const scheduleDay = today === -1 ? 6 : today;

export default function BrandBar({ business }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="brand">
        {business?.brand?.imgLink ? (
          <Logo
            businessCode={business?.businessCode}
            hasImg={business?.brand?.hasImg}
            imgLink={business?.brand?.imgLink}
            size={"7rem"}
            radius={"1.6rem"}
          />
        ) : (
          <div></div>
        )}

        <div>
          <h1>{business?.brand?.name}</h1>
          <div className="bType">{business.businessType}</div>
          {!business?.acceptOrders && !business?.deliveryOrders ? (
            <></>
          ) : business?.acceptOrders ? (
            <div className="accept">
              <span className="dot">
                <FaCircle />{" "}
              </span>{" "}
              accept orders
            </div>
          ) : (
            business?.deliveryOrders && (
              <div className="accept">
                <span className="dot">
                  <FaCircle />{" "}
                </span>{" "}
                delivery orders accepted
              </div>
            )
          )}
        </div>
      </div>

      <div className="details">
        <div className="detailsItems">
          <a href={`tel:${business.ownerNumber}`}>
            <div className="detailsItem">
              <FaPhoneAlt />
              <div>{business?.ownerNumber}</div>
            </div>
          </a>
          <div
            className="detailsItem"
            onClick={() => !business?.twentyfour && setShowModal(true)}
          >
            <FaRegClock />
            <div className="time">
              <div>{business?.twentyfour && "24/24"}</div>
              <div>
                {business?.everyday && (
                  <Interval intervals={business?.everyDayInterval} />
                )}
              </div>
              <div>
                {!business?.twentyfour &&
                  !business?.everyday &&
                  business?.daysInterval?.map(
                    (dayIntervals, k) =>
                      k === scheduleDay &&
                      (dayIntervals.availble ? (
                        <Interval key={k} intervals={dayIntervals?.intervals} />
                      ) : (
                        <div>closed</div>
                      ))
                  )}
              </div>
              {!business?.twentyfour &&
                !business?.everyday &&
                !business?.daysInterval &&
                " 9:00AM - 12:00PM"}
            </div>
          </div>
        </div>
        {business?.address?.content && (
          <a href={`http://maps.google.com/?q=`}>
            <div className="detailsItem">
              <FaMapMarkerAlt />
              <div>{business?.address?.content}</div>
            </div>
          </a>
        )}
      </div>
      <TimeModal
        everyday={business?.everyday}
        everyDayInterval={business?.everyDayInterval}
        daysInterval={business?.daysInterval}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <style jsx>{`
        .brand {
          max-width: 100%;
          padding: 1rem;
          padding-bottom: 0.8rem;
          padding-left: 1.2rem;
          ${styles.flexAligncenter}
          color: ${business?.color || "gray"};
          background: ${business?.background || "#fefefe"};
          gap: 7vw;
          overflow: hidden;
        }
        h1 {
          font-size: 2.4rem;
          line-height: 1.8rem;
          text-align:left;
          white-space:nowrap;
        }
        .bType {
          padding: 0.2rem;
          font-size: 1rem;
          color: black;
        }
        .details {
          font-size: 1rem;
          color: black;
          line-height: 0.9rem;
          ${styles.flexColumn};
          background: #f6f6f6;
        }
        .detailsItems {
          ${styles.flexAligncenter}
        }
        .detailsItem {
          text-align: left;
          ${styles.flexAligncenter}
          gap:.6rem;
          flex: 1 1 50vw;
          padding: 0.2rem 1.4rem;
          cursor:pointer
        }
        .accept {
          width: 100%;
          color: green;
          opacity: 90%;
          font-size: 1rem;
        }
        .daccept {
          width: 100%;
          color: orange;
          opacity: 100%;
          font-size: 1rem;
        }
        .dot {
          font-size: 0.6rem;
          padding: 0rem 0.2rem;
          animation: flash 2s infinite;
          line-height: 0rem;
        }
        a {
          color: black;
          text-decoration: none !important;
        }
        .time {
          font-size: .9rem;
        }

        @keyframes flash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @-webkit-keyframes flash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export function Interval({ intervals }) {
  return (
    <>
      {intervals?.map((interval, i) => (
        <div key={i}>
          {fixHourView(
            interval?.from?.h,
            interval?.from?.m,
            interval?.from?.AM
          ) +
            " - " +
            fixHourView(interval?.to?.h, interval?.to?.m, interval?.to?.AM)}
        </div>
      ))}
    </>
  );
}

export function TimeModal({
  everyday,
  everyDayInterval,
  daysInterval,
  showModal,
  setShowModal
}) {
  return (
    <>
      <ModalContainer
        title="open time"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {!!everyday
          ? everyDayInterval?.map((interval, i) => (
              <div key={i} className="timeRow">
                <div>open every day </div>
                <div>
                  {" "}
                  {fixHourView(
                    interval?.from.h,
                    interval?.from.m,
                    interval?.from.AM
                  ) +
                    " - " +
                    fixHourView(
                      interval?.to.h,
                      interval?.to.m,
                      interval?.to.AM
                    )}
                </div>
              </div>
            ))
          : daysInterval?.length > 0 &&
            daysInterval?.map((day, k) => (
              <div key={k}>
                <div className="timeRow">
                  <div className="dayname">{days && days[k]}</div>
                  {day?.availble ? (
                    <div>
                      {day?.intervals?.map((interval, j) => (
                        <div key={j}>
                          {" "}
                          {fixHourView(
                            interval?.from.h,
                            interval?.from.m,
                            interval?.from.AM
                          ) +
                            " - " +
                            fixHourView(
                              interval?.to.h,
                              interval?.to.m,
                              interval?.to.AM
                            )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>closed</div>
                  )}
                </div>
              </div>
            ))}
      </ModalContainer>
      <style jsx>{`
        .timeRow {
          ${styles.flexAligncenter}
          ${styles.justifyBetween}
          padding:.3rem 0;
          font-size: 0.9rem;
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
