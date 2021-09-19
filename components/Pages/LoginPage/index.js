import ContactUs from "../../ContactUs";
import LogoBar from "../../LogoBar";
import Login from "./Login";
export default function ({ setAuth }) {
  return (
    <>
      <LogoBar />
      <Login setAuth={setAuth} />
      <ContactUs />
    </>
  );
}
