import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import Line from "@/components/Line";

const OrderHistory = dynamic(() =>
  import("@/components/Pages/EndUserPage/OrderHistory")
);
const Wallet = dynamic(() => import("@/components/Pages/EndUserPage/Wallet"));
const Chat = dynamic(() => import("@/components/Pages/Chat"));

export default function UserPage() {
  const [auth, setAuth] = useState(false);

  const router = useRouter();
  const { page } = router.query;
  useEffect(() => {
    !!page &&
      axios.get("/api/auth").then((res) => {
        res?.data?.number ? setAuth(true) : router.push("/");
      });
  }, [router, page]);

  return (
    <>
      <Line />
      {page === "order" && auth && <OrderHistory />}
      {page === "wallet" && auth && <Wallet />}
      {page === "chat" && auth && <Chat />}
      {page === "contactList" && auth && <Wallet />}

      <style jsx>{``}</style>
    </>
  );
}
