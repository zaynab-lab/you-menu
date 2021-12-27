import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { styles } from "@/public/js/styles";
import Link from "next/link";
import { FaBook, FaSearchDollar, FaSignOutAlt } from "react-icons/fa";
import UPLayout from "@/components/Pages/EndUserPage/UPLayout";
import axios from "axios";
import { useState } from "react";
import Alert from "@/components/Alert";
import Router from "next/dist/server/router";
import Address from "../MenuPage/Address";

export default function ({ setSelected, user, setRefreshUser, setAuth }) {
  const [alert, setAlert] = useState("");
  const [userName, setUserName] = useState(user?.name);

  return (
    <>
      <BackButton setSelected={setSelected} select={"Options"} />
      <UPLayout>
        <div className="form">
          <Label title={"full name"} />
          <Input
            value={userName}
            onchange={(e) => setUserName(e.target.value)}
            onblur={() => {
              user?.name !== userName && setAlert("something is going change");
              user?.name !== userName &&
                axios
                  .put(
                    "/api/users/name",
                    { name: userName },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    res.data === "done"
                      ? setAlert("change done")
                      : setAlert("something went wrong");
                    res.data === "done" &&
                      setRefreshUser((refresh) => !refresh);
                  });
            }}
          />
          <Label title={"phone number"} />
          <Input value={user?.number} onchange={() => {}} />
          <Address
            user={user}
            options={true}
            setRefreshUser={setRefreshUser}
            setAlert={setAlert}
          />
          <Alert setAlert={setAlert} alert={alert} />

          <div className="goto">
            {user?.permissions?.includes("EnterManagementPage") && (
              <Link href="/management">
                <div className="Bbtn">
                  <div className="Bbtn-icon">
                    <FaBook />
                  </div>
                  <div>management</div>
                </div>
              </Link>
            )}

            {user?.permissions?.includes("EnterMarketingPage") && (
              <Link href="/marketing">
                <div className="Bbtn">
                  <div className="Bbtn-icon">
                    <FaSearchDollar />
                  </div>
                  <div>marketing page</div>
                </div>
              </Link>
            )}
          </div>

          <div
            className="signout"
            onClick={() =>
              axios
                .post("/api/auth/Logout")
                .then((res) => res.data === "done" && Router.push("/"))
                .then(() => setAuth(false))
                .then(() => setSelected("Options"))
            }
          >
            <div>Log out</div>
            <div className="signoutIcon">
              <FaSignOutAlt />
            </div>
          </div>
        </div>
      </UPLayout>
      <style jsx>{`
        .form {
          min-width: 100%;
          ${styles.flexAligncenter}
          -webkit-box-orient:vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          max-width: 20rem;
          background: white;
        }
        .Bbtn {
          width: 14rem;
          margin: 0.2rem;
          border-radius: 0.5rem;
          border: 1px solid ${styles.secondaryColor};
          ${styles.flexBothcenter}
          gap:1rem;
          color: ${styles.secondaryColor};
          cursor: pointer;
        }
        .Bbtn-icon {
          padding-top: 0.3rem;
        }
        .goto {
          padding: 2rem;
        }
        .signout {
          color: ${styles.secondaryColor};
          font-size: 1.2rem;
          ${styles.flexBothcenter}
          cursor: pointer;
          padding: 2rem;
        }

        .signoutIcon {
          transform: translate(0.5rem, 0.2rem);
        }
      `}</style>
    </>
  );
}
