import ContactUs from "@/components/ContactUs";
import LogoBar from "@/components/LogoBar";
import Login from "./Login";
export default function LoginPage({ setAuth, Loginfrom, alertMsg }) {
  return (
    <>
      <LogoBar />
      <Login setAuth={setAuth} Loginfrom={Loginfrom} alertMsg={alertMsg} />
      <ContactUs />
    </>
  );
}
