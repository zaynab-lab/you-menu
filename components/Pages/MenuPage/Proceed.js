import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Questions from "./Questions";

import dynamic from "next/dynamic";
import BackButton from "@/components/BackButton";
import LoginForm from "../LoginPage/LoginForm";
import axios from "axios";
import Button from "@/components/Button";

const Scan = dynamic(() => import("./Scan"));
const Invoice = dynamic(() => import("./Invoice"));
const Address = dynamic(() => import("./Address"));
const Payment = dynamic(() => import("./Payment"));

export default function Proceed({ business, setProceed, products, cartItems }) {
  const [camera, setCamera] = useState(true);
  const [userTable, setUserTable] = useState();
  const [state, setState] = useState({});
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
          !loading && <LoginForm setAuth={setAuth} />
        ) : (
          <div>
            {state[1] === undefined && (
              <Questions
                content={`are you in the ${business?.businessType} shop or near to the seller ?`}
                setState={setState}
                Q={1}
              />
            )}

            {state[1] === "yes" &&
              state[2] === undefined &&
              (table ? (
                <Questions
                  content={`are you on the table ${table} ?`}
                  setState={setState}
                  Q={2}
                />
              ) : (
                <div className="note">
                  <Scan
                    camera={camera}
                    setUserTable={setUserTable}
                    userTable={userTable}
                    setCamera={setCamera}
                  />
                </div>
              ))}

            {state[1] === "no" && !business.acceptDelivery && (
              <div className="note">no delivery yet</div>
            )}

            {state[2] === "no" && (
              <>
                <div className="note">
                  <Scan
                    camera={camera}
                    setUserTable={setUserTable}
                    userTable={userTable}
                    setCamera={setCamera}
                  />
                </div>
              </>
            )}
            {state[2] === "yes" && (
              <>
                <Address />
                <Payment user={user} />
                <div className="orderbtn">
                  <Button content="order" />
                </div>
              </>
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
        .orderbtn {
          padding-top: 1rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}
