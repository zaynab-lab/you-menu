import Logo from "@/components/Logo";
import { styles } from "@/public/js/styles";
import {
  FaClock,
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
      <div className="details">
        <a href={`tel:${business.ownerNumber}`}>
          <div className="detailsItem">
            <FaPhoneAlt />
            <div>{business.ownerNumber}</div>
          </div>
        </a>
        <div className="detailsItem">
          <FaRegClock />
        </div>
        <div className="detailsItem">
          <FaMapMarkerAlt />
        </div>
      </div>

      {business.acceptOrders ? (
        <div className="accept">online orders accepted</div>
      ) : (
        <div className="daccept">online orders not accept right now</div>
      )}
      <style jsx>{`
        .brand {
          max-width: 100%;
          padding: 0.8rem 1rem;
          ${styles.flexBothcenter}
          font-size:2.6rem;
          color: ${business?.color || "gray"};
          background: ${business?.background || "#fefefe"};
          gap: 8vw;
          overflow: hidden;
          line-height: 2.3rem;
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
          ${styles.flexBothcenter};
          gap: 2rem;
          flex-wrap: wrap;
          background: #eee;
        }
        .detailsItem {
          ${styles.flexAligncenter}
          gap:.6rem;
          padding: 0.2rem 0;
        }
        .accept {
          width: 100%;
          text-align: center;
          background: green;
          color: white;
          opacity: 70%;
          font-size: 1.1rem;
        }
        .daccept {
          width: 100%;
          text-align: center;
          background: orange;
          color: white;
          opacity: 90%;
          font-size: 1.1rem;
        }
        a {
          color: black;
          text-decoration: none !important;
        }
      `}</style>
    </>
  );
}
