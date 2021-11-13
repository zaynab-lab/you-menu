import Line from "@/components/Line";
import { styles } from "@/public/js/styles";
import LoginForm from "../LoginPage/LoginForm";
import ListOfBusinesses from "./ListOfBusinesses";
import { marketerMotivation } from "@/util/motivation";
import { useState } from "react";

export default function MarketerPage() {
  const [addbusiness, setAddBusiness] = useState(false);
  return (
    <>
      <Line />
      <div className="motivation" onClick={() => setAddBusiness(!addbusiness)}>
        <div>❤ dear our marketer, give us feedback ❤</div>
        🏹{" "}
        {
          marketerMotivation[
            Math.floor(Math.random() * marketerMotivation.length)
          ]?.content
        }{" "}
      </div>
      {addbusiness && <LoginForm Loginfrom={"signBusiness"} />}
      <div className="businesesTitle">your active businesses</div>
      <ListOfBusinesses />
      <style jsx>{`
        .motivation {
          font-size: 1.2rem;
          width: 100%;
          text-align: center;
          padding: 0.5rem;
          color: ${styles.secondaryColor};
        }
        .businesesTitle {
          font-size: 1.2rem;
          width: 100%;
          text-align: center;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}
