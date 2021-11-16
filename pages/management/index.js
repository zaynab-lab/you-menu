import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ManagementPage = dynamic(() =>
  import("@/components/Pages/ManagementPage")
);

export default function Index() {
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(
    () =>
      axios.get("/api/auth").then((res) => {
        res?.data?.number &&
        res?.data?.permissions?.includes("EnterManagementPage")
          ? setAuth(true)
          : router.replace("/");
      }),
    [auth, router]
  );

  return (
    <>
      <div className="page">{auth && <ManagementPage />}</div>

      <style jsx>{`
        .page {
          height: calc(100vh - 20rem);
        }
      `}</style>
    </>
  );
}
