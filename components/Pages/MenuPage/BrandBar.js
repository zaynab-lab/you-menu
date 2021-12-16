import Logo from "@/components/Logo";
import { styles } from "@/public/js/styles";
import {
  FaCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock
} from "react-icons/fa";

export default function BrandBar({ business }) {
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

          {business?.acceptOrders ? (
            <div className="accept">
              <span className="dot">
                <FaCircle />{" "}
              </span>{" "}
              online orders accepted
            </div>
          ) : (
            <div className="daccept">
              <span className="dot">
                <FaCircle />{" "}
              </span>{" "}
              online orders not accepted right now
            </div>
          )}
        </div>
      </div>

      <div className="details">
        <div className="deItem">
          <a href={`tel:${business.ownerNumber}`}>
            <div className="detailsItem">
              <FaPhoneAlt />
              <div>{business?.ownerNumber}</div>
            </div>
          </a>
          <div className="detailsItem">
            <FaRegClock />
            <div className="time">11:00AM - 12:00PM</div>
          </div>
        </div>
        <a href={`http://maps.google.com/?q=`}>
          <div className="detailsItem">
            <FaMapMarkerAlt />{" "}
            <div>{business?.address?.content || "online"}</div>
          </div>
        </a>
      </div>

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
        .deItem {
          ${styles.flexAligncenter}
        }
        .detailsItem {
          text-align: left;
          ${styles.flexAligncenter}
          gap:.6rem;
          flex: 1 1 50vw;
          padding: 0.2rem 1.4rem;
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
          font-size: 1rem;
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
