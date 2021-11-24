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
          />
        ) : (
          <div></div>
        )}

        <div>
          <div>{business?.brand?.name}</div>
          <div className="bType">{business.businessType}</div>
        </div>
      </div>
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

      <div className="details">
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
        <div className="detailsItem">
          <FaMapMarkerAlt /> <div>{business?.address?.content || "online"}</div>
        </div>
      </div>

      <style jsx>{`
        .brand {
          max-width: 100%;
          padding: 0.8rem 1rem;
          ${styles.flexBothcenter}
          font-size:2.5rem;
          color: ${business?.color || "gray"};
          background: ${business?.background || "#fefefe"};
          gap: 7vw;
          overflow: hidden;
          line-height: 2.4rem;
        }
        .bType {
          padding: 0.2rem;
          padding-top: 0.5rem;
          font-size: 1.3rem;
          color: black;
          line-height: 1.2rem;
        }
        .details {
          font-size: 1.1rem;
          color: black;
          line-height: 1rem;
          ${styles.flexAligncenter};
          flex-wrap: wrap;
          background: #f6f6f6;
        }
        .detailsItem {
          ${styles.flexAligncenter}
          gap:.6rem;
          padding: 0.2rem 0;
          flex: 1 1 10rem;
          padding: 0.2rem 1.4rem;
        }
        .accept {
          text-align: center;
          padding: 0.2rem;
          width: 100%;
          color: green;
          opacity: 90%;
          font-size: 1rem;
          line-height: 1rem;
        }
        .daccept {
          text-align: center;
          padding: 0.2rem;
          width: 100%;
          color: orange;
          opacity: 100%;
          font-size: 1rem;
          line-height: 1rem;
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
