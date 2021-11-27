import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import Line from "@/components/Line";

const OrderHistory = dynamic(() =>
  import("@/components/Pages/EndUserPage/OrderHistory")
);
const Wallet = dynamic(() => import("@/components/Pages/EndUserPage/Wallet"));

export default function UserPage() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();

  const router = useRouter();
  const { page } = router.query;
  useEffect(() => {
    !!page &&
      axios.get("/api/auth").then((res) => {
        res?.data?.number ? setAuth(true) : router.push("/");
        res?.data?.number && setUser(res.data);
      });
  }, [router, page]);

  return (
    <>
      <Line />
      {page === "order" && auth && <OrderHistory />}
      {page === "wallet" && auth && <Wallet credit={user?.credit} />}

      <style jsx>{``}</style>
    </>
  );
}
