import { useState } from "react";
import LoginPage from "../components/Pages/LoginPage";
import StorePage from "../components/Pages/StorePage";

export default function () {
  const [auth, setAuth] = useState(true);
  return <>{auth ? <LoginPage /> : <StorePage />}</>;
}
