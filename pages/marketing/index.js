import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LoginPage from "@/components/Pages/LoginPage";
import axios from "axios";
import LogoLoader from "@/components/Loaders/LogoLoader";

const MarketerPage = dynamic(() => import("@/components/Pages/MarketerPage"));

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [alertMsg, setAlertmsg] = useState(" ");

  useEffect(
    () =>
      axios.get("/api/auth").then((res) => {
        res?.data?.number &&
        res?.data?.permissions?.includes("EnterMarketingPage")
          ? setAuth(true)
          : setAuth(false);
        res?.data.number &&
          setAlertmsg(`you can't login here if you are'nt a marketer`);
        setLoading(false);
      }),
    [auth]
  );

  return (
    <>
      <div className="page">
        {loading ? (
          <LogoLoader />
        ) : auth ? (
          <MarketerPage />
        ) : (
          <LoginPage
            setAuth={setAuth}
            Loginfrom={"marketing"}
            alertMsg={alertMsg}
          />
        )}
      </div>

      <style jsx>{`
        .page {
          height: calc(100vh - 20rem);
        }
      `}</style>
    </>
  );
}
