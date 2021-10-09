import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LoginPage from "@/components/Pages/LoginPage";
import axios from "axios";

const BusinessPage = dynamic(() => import("@/components/Pages/BusinessPage"));

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [alertMsg, setAlertmsg] = useState(" ");

  useEffect(
    () =>
      axios.get("/api/auth").then((res) => {
        res?.data?.number &&
        res?.data?.permissions?.includes("EnterBusinessPage")
          ? setAuth(true)
          : setAuth(false);
        res?.data.number &&
          setAlertmsg(`you can login here to create a business`);
        setLoading(false);
      }),
    []
  );
  return (
    <>
      <div className="page">
        {loading ? (
          "Loading..."
        ) : auth ? (
          <BusinessPage setAuth={setAuth} />
        ) : (
          <LoginPage
            setAuth={setAuth}
            Loginfrom={"business"}
            alertMsg={alertMsg}
          />
        )}
      </div>
      <style jsx>{`
        .page {
          height: calc(100vh - 8rem);
        }
      `}</style>
    </>
  );
}
