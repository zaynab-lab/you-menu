import dynamic from "next/dynamic";
import { useState } from "react";
import LoginPage from "@/components/Pages/LoginPage";

const StorePage = dynamic(() => import("../components/Pages/StorePage"));

export default function Index() {
  const [auth, setAuth] = useState(false);
  return <>{auth ? <StorePage /> : <LoginPage setAuth={setAuth} />}</>;
}
