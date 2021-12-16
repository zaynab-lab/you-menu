import { styles } from "@/public/js/styles";
import Orders from "@/components/icons/Orders";
import { FaCreativeCommonsPdAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { withBtn } from "@/components/Pages/BusinessPage/OrderCard";

export default function OrderShower({ refreshOrder }) {
  const router = useRouter();
  const [hasActiveOrder, setHasActiveOrder] = useState(false);

  useEffect(() => {
    axios
      .get("/api/order/userGetOrder")
      .then(
        (res) =>
          res.data?.filter((order) => withBtn.includes(order.currentStatus))
            ?.length > 0 && setHasActiveOrder(true)
      );
  }, [refreshOrder]);
  return (
    <>
      {hasActiveOrder && (
        <div className="orderShower" onClick={() => router.push("/user/order")}>
          <Orders color={styles.secondaryColor} />
          <div className="orderShowerLine">
            <FaCreativeCommonsPdAlt />
          </div>
        </div>
      )}

      <style jsx>{`
        .orderShower {
          width: 4rem;
          position: fixed;
          right: 0;
          top: 11rem;
          z-index: 90;
          font-size: 0.9rem;
          padding: 0.1rem;
          padding-left: 0.8rem;
          background: white;
          color: white;
          border: 1px solid ${styles.secondaryColor};
          border-width: 1px 0px 1px 1px;
          border-radius: 1rem 0 0 1rem;
          cursor: pointer;
          ${styles.flexAligncenter}
        }
        .orderShowerLine {
          min-width: 1.4rem;
          height: 100%;
          color: ${styles.secondaryColor};
          animation: flash 2s infinite;
          ${styles.flexBothcenter}
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
