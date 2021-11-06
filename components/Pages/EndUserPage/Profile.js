import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { styles } from "@/public/js/styles";
import Link from "next/link";
import { FaSearchDollar, FaStore } from "react-icons/fa";
import UPLayout from "@/components/Pages/EndUserPage/UPLayout";
import axios from "axios";
import { useState } from "react";
import Alert from "@/components/Alert";

export default function ({ setSelected, user, setRefreshUser }) {
  const [alert, setAlert] = useState("");
  const [userName, setUserName] = useState(user?.name);
  return (
    <>
      <BackButton setSelected={setSelected} select={"Options"} />
      <UPLayout className="pageContainer">
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
          <Alert setAlert={setAlert} alert={alert} />

          <div className="goto">
            {user?.permissions?.includes("EnterBusinessPage") && (
              <Link href="/business">
                <div className="Bbtn">
                  <div className="Bbtn-icon">
                    <FaStore />
                  </div>
                  <div>business page</div>
                </div>
              </Link>
            )}
            {user?.permissions?.includes("EnterMarketingPage") && (
              <Link href="/management">
                <div className="Bbtn">
                  <div className="Bbtn-icon">
                    <FaSearchDollar />
                  </div>
                  <div>marketing page</div>
                </div>
              </Link>
            )}
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
          position: relative;
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
          padding-bottom: 5rem;
          background: white;
        }
        .Bbtn {
          width: 14rem;
          margin: 0.2rem;
          border-radius: 2rem;
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
      `}</style>
    </>
  );
}
