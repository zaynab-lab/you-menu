import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Questions from "./Questions";

import dynamic from "next/dynamic";
import BackButton from "@/components/BackButton";
import LoginForm from "../LoginPage/LoginForm";
import axios from "axios";
import Button from "@/components/Button";
import { styles } from "@/public/js/styles";
import { FaPhoneAlt } from "react-icons/fa";

const Scan = dynamic(() => import("./Scan"));
const Invoice = dynamic(() => import("./Invoice"));
const Address = dynamic(() => import("./Address"));
const Payment = dynamic(() => import("./Payment"));
const bType = ["resturant", "cafe", "resto cafe"];

export default function Proceed({
  total,
  business,
  setProceed,
  products,
  cartItems
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
              !hasTable &&
              orderType === undefined && (
                <Questions
                  content={`are you in the ${business?.businessType} or near to the seller ?`}
                  setState={setOrderType}
                  yes={"dine in"}
                  no={"delivery"}
                />
              )
            )}

            {orderType === "delivery" && !business.acceptDelivery && (
              <div className="noDelivery">
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
            )}

            {(hasTable || !bType?.includes(business?.businessType)) &&
              (orderType === "dine in" ||
                bType?.includes(business?.businessType)) && (
                <>
                  <Payment user={user} total={total} />
                  <div className="orderbtn">
                    <Button content="order" />
                  </div>
                </>
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
        .orderbtn {
          padding-top: 1rem;
          text-align: center;
        }
        .noDeliverydetails {
          ${styles.flexBothcenter}
          gap:.5rem;
        }
      `}</style>
    </>
  );
}
