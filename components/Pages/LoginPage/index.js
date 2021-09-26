import ContactUs from "@/components/ContactUs";
import LogoBar from "@/components/LogoBar";
import Login from "./Login";
export default function LoginPage({ setAuth }) {
  return (
    <>
      <LogoBar />
      <Login setAuth={setAuth} />
      <ContactUs />
    </>
  );
}
