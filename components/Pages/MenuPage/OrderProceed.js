import { styles } from "@/public/js/styles";

import dynamic from "next/dynamic";

import Button from "@/components/Button";
import axios from "axios";
import { useState } from "react";
const Address = dynamic(() => import("./Address"));
const Payment = dynamic(() => import("./Payment"));

export default function OrderProceed({
  user,
  total,
  orderType,
  onlyTarget,
  useExchange,
  business,
  table,
  cartItems,
  action,
  selectedCurrency,
  setRefreshUser
}) {
  const [useCredit, setUseCredit] = useState(false);
  const [msg, setMsg] = useState("");
  const [orderAddress, setOrderAddress] = useState({});

  return (
    <>
      <div className="invoiceAddon">
        <div className="invoiceAddonRow">
          <div>total: </div>
          <div>
            {!useExchange
              ? Number(total.toFixed(2)) + " " + business?.defaultCurrency
              : onlyTarget
              ? Number((total * business?.exRate).toFixed(2)) +
                " " +
                business?.currency
              : selectedCurrency
              ? Number((total * business?.exRate).toFixed(2)) +
                " " +
                business?.currency
              : Number(total.toFixed(2)) + " " + business?.defaultCurrency}
          </div>
        </div>
        {orderType === "delivery" && (
          <div className="invoiceAddonRow">
            <div>delivery fees: </div>
            <div>{1 + " $"}</div>
          </div>
        )}
      </div>
      {orderType === "delivery" && (
        <Address
          user={user}
          setAlert={setMsg}
          setRefreshUser={setRefreshUser}
          setOrderAddress={setOrderAddress}
        />
      )}
      <Payment
        user={user}
        business={business}
        onlyTarget={onlyTarget}
        useExchange={useExchange}
        total={total}
        setUseCredit={setUseCredit}
        useCredit={useCredit}
        selectedCurrency={selectedCurrency}
      />
      <div className={`msg ${!!msg && !orderAddress?.content && "show"}`}>
        {msg}
      </div>
      <div className="orderbtn">
        <Button
          content="order"
          color={styles.secondaryColor}
          onclick={() =>
            orderType === "delivery" && !orderAddress?.content
              ? setMsg("choose address")
              : axios
                  .post(
                    "/api/order",
                    {
                      businessCode: business?.businessCode,
                      address: orderAddress?.content,
                      cartItems,
                      orderType,
                      useCredit,
                      table,
                      selectedCurrency
                    },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    res.data === "done" && action("", false, true);
                  })
          }
        />
      </div>

      <style jsx>{`
        .invoiceAddon {
          border-bottom: 1px solid ${styles.secondaryColor};
          font-size: 1.2rem;
        }
        .invoiceAddonRow {
          ${styles.flexAligncenter}
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .orderbtn {
          padding-top: 0.2rem;
          text-align: center;
        }
        .msg {
          opacity: 0;
          font-size: 0rem;
          color: ${styles.secondaryColor};
          border: 1px solid ${styles.secondaryColor};
          padding: 0.2rem 0.4rem;
          border-radius: 0.3rem;
          background: #f9646510;
        }
        .show {
          width: 100%;
          font-size: 1rem;
          display: block;
          opacity: 1;
          -webkit-transition: all 1s ease-in-out;
          -o-transition: all 1s ease-in-out;
          transition: all 1s ease-in-out;
        }
      `}</style>
    </>
  );
}
