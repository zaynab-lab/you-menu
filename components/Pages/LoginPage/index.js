import ContactUs from "@/components/ContactUs";
import LogoBar from "@/components/ZAMENU";
import LoginForm from "./LoginForm";
export default function LoginPage({ setAuth, Loginfrom, alertMsg }) {
  return (
    <>
      <LogoBar />
      <LoginForm setAuth={setAuth} Loginfrom={Loginfrom} alertMsg={alertMsg} />
      <ContactUs />
    </>
  );
}
