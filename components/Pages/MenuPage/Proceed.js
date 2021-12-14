import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Questions from "./Questions";

import dynamic from "next/dynamic";
import BackButton from "@/components/BackButton";
import LoginForm from "../LoginPage/LoginForm";
import axios from "axios";
import { styles } from "@/public/js/styles";
import { FaMotorcycle, FaPhoneAlt } from "react-icons/fa";

const Scan = dynamic(() => import("./Scan"));
const Invoice = dynamic(() => import("./Invoice"));
const OrderProceed = dynamic(() => import("./OrderProceed"));

const bType = ["resturant", "cafe", "resto cafe"];

export default function Proceed({
  total,
  business,
  useExchange,
  onlyTarget,
  setProceed,
  products,
  cartItems,
  action,
  selectedCurrency
}) {
  const [camera, setCamera] = useState(true);
  const [userTable, setUserTable] = useState();
  const [orderType, setOrderType] = useState();
  const [hasTable, setHasTable] = useState();
  const router = useRouter();
  const { table } = router.query;
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [refreshUser, setRefreshUser] = useState(false);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      res?.data?.number ? setAuth(true) : setAuth(false);
      res?.data?.number && setUser(res.data);
      setLoading(false);
    });
  }, [refreshUser]);

  useEffect(() => {
    hasTable && setUserTable(table);
  }, [table, hasTable]);

  return (
    <>
      <BackButton setSelected={setProceed} select={false} />
      <div className="proceedPage">
        <Invoice
          business={business}
          products={products}
          cartItems={cartItems}
        />
        {!auth ? (
          !loading && (
            <LoginForm setAuth={setAuth} setRefreshUser={setRefreshUser} />
          )
        ) : (
          <div>
            {hasTable === undefined &&
            table &&
            bType.includes(business?.businessType) ? (
              <Questions
                content={`are you on the table ${table} ?`}
                setState={setHasTable}
                yes={true}
                no={false}
              />
            ) : (
              orderType === undefined &&
              !hasTable && (
                <Questions
                  content={`are you in the ${business?.businessType} or near to the seller ?`}
                  setState={setOrderType}
                  yes={"dine in"}
                  no={"delivery"}
                />
              )
            )}

            {orderType === "delivery" && !business.acceptDelivery ? (
              <div className="noDelivery">
                <div className="icon">
                  <FaMotorcycle />
                </div>
                <div> this business dosen't accept delivery right now</div>
                <div>
                  contact them on{" "}
                  <a href={`tel:${business.ownerNumber}`}>
                    <div className="noDeliverydetails">
                      <FaPhoneAlt />
                      <div>{business?.ownerNumber}</div>
                    </div>
                  </a>
                </div>
              </div>
            ) : (
              orderType === "delivery" && (
                <OrderProceed
                  user={user}
                  total={total}
                  useExchange={useExchange}
                  onlyTarget={onlyTarget}
                  business={business}
                  orderType={orderType}
                  table={userTable}
                  cartItems={cartItems}
                  action={action}
                  selectedCurrency={selectedCurrency}
                  setRefreshUser={setRefreshUser}
                />
              )
            )}

            {orderType === "dine in" &&
              !hasTable &&
              bType?.includes(business?.businessType) && (
                <div className="note">
                  <Scan
                    camera={camera}
                    setUserTable={setUserTable}
                    userTable={userTable}
                    setCamera={setCamera}
                    setHasTable={setHasTable}
                  />
                </div>
              )}

            {(hasTable || !bType?.includes(business?.businessType)) &&
              (orderType === "dine in" ||
                bType?.includes(business?.businessType)) && (
                <OrderProceed
                  user={user}
                  total={total}
                  useExchange={useExchange}
                  onlyTarget={onlyTarget}
                  business={business}
                  orderType={orderType}
                  table={userTable}
                  cartItems={cartItems}
                  action={action}
                  selectedCurrency={selectedCurrency}
                />
              )}
          </div>
        )}
      </div>
      <style jsx>{`
        .proceedPage {
          padding-top: 3rem;
        }

        .note {
          color: black;
          text-align: center;
          padding-top: 2rem;
        }
        .noDelivery {
          color: ${styles.secondaryColor};
          text-align: center;
          padding-top: 2rem;
        }

        .noDeliverydetails {
          ${styles.flexBothcenter}
          gap:.5rem;
          padding: 1rem;
        }
        .icon {
          font-size: 3rem;
        }
      `}</style>
    </>
  );
}
