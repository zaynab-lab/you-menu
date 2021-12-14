import { styles } from "@/public/js/styles";

import dynamic from "next/dynamic";

import Button from "@/components/Button";
import axios from "axios";
import { useState } from "react";
import Alert from "@/components/Alert";
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
  const [alert, setAlert] = useState("");
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
          setAlert={setAlert}
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

      <div className="orderbtn">
        <Button
          content="order"
          color={styles.secondaryColor}
          onclick={() =>
            orderType === "delivery" && !orderAddress?.content
              ? setAlert("choose address")
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
      <Alert setAlert={setAlert} alert={alert} />

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
          padding-top: 1.2rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}
