import dynamic from "next/dynamic";
import { useState } from "react";
import LoginPage from "@/components/Pages/LoginPage";

const MarketerPage = dynamic(() => import("@/components/Pages/MarketerPage"));

export default function Index() {
  const [auth, setAuth] = useState(true);
  return <>{auth ? <MarketerPage /> : <LoginPage setAuth={setAuth} />}</>;
}
