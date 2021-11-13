import { useState } from "react";
import { styles } from "@/public/js/styles";
import Button from "@/components/Button";
import Phone from "./Phone";
import Input from "@/components/Input";
import axios from "axios";
import timer from "@/util/timer";
import { countries } from "@/util/countryCode";
import Label from "@/components/Label";
import Image from "next/image";

export default function LoginForm({
  setAuth,
  Loginfrom,
  alertMsg,
  setRefreshUser
}) {
  const [waiting, setWaiting] = useState(false);
  const [msg, setMsg] = useState(" ");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verification, setVerification] = useState("");
  const [time, setTime] = useState("02:00");
  const [ccode, setCcode] = useState("961");

  const checkNumber = (action) => {
    setMsg(" ");
    const parfixList = countries.filter(
      (country) => country.usedCode === ccode
    )[0].parafix;
    if (parfixList.includes(phoneNumber.length)) {
      setMsg(`wait to recieve the code using SMS`);
      action();
    } else {
      setMsg("check the phone number");
      return;
    }
  };

  const requestOTP = () => {
    checkNumber(() => {
      setWaiting(true);
      axios
        .post(
          "/api/auth/Sign",
          { phoneNumber, ccode, Loginfrom },
          { "content-type": "application/json" }
        )
        .then((res) => {
          if (res.data === "done") {
            setWaiting(true);
            timer(119, setTime);
            setMsg(`the SMS has been sent wait for it`);
            (Loginfrom === "business" || Loginfrom === "signBusiness") &&
              axios
                .post(
                  "/api/auth/SignBusiness",
                  { phoneNumber, ccode },
                  { "content-type": "application/json" }
                )
                .then((res) => {
                  setMsg(res.data);
                });
          } else {
            if (
              res.data ===
              "the business is already exist go ahead with other number"
            ) {
              setWaiting(false);
            }
            setMsg(res.data);
          }
        });
    });
  };

  const login = () => {
    axios
      .post(
        "/api/auth/Login",
        { phoneNumber, ccode, oTP: verification },
        { "content-type": "application/json" }
      )
      .then((res) => {
        res.data === "done" && setAuth(true);
        setRefreshUser((refresh) => !refresh);
        res.data !== "done" && setMsg(res.data);
      });
  };
  const verify = () => {
    axios
      .post(
        "/api/auth/verifyBusiness",
        { phoneNumber, ccode, oTP: verification },
        { "content-type": "application/json" }
      )
      .then((res) => {
        setMsg(res.data);
        res.data === "done" && setWaiting(false);
        res.data === "done" && setPhoneNumber("");
        res.data === "done" && setVerification("");
      });
  };

  return (
    <>
      <div className="form">
        <div className="msg">{alertMsg && alertMsg}</div>
        {Loginfrom && (
          <div className="img">
            <Image height="800" width="800" src="/img/ptrn.png" alt="pattern" />
          </div>
        )}
        <Phone
          waiting={waiting}
          phone={phoneNumber}
          setPhone={setPhoneNumber}
          setMsg={setMsg}
          setCcode={setCcode}
        />
        {waiting && (
          <>
            <Label title={"verification code"} />
            <Input
              value={verification}
              onchange={(e) => setVerification(e.target.value)}
              type={"number"}
            />
          </>
        )}
        <div className="msg">{msg}</div>
        <div className="msg">
          {Loginfrom !== "signBusiness" && time !== "02:00" && time}
        </div>
        <Button
          content={"confirm"}
          onclick={() =>
            !waiting
              ? requestOTP()
              : Loginfrom === "signBusiness"
              ? verify()
              : login()
          }
        />
      </div>

      <style jsx>{`
        .form {
          padding: ${Loginfrom === "signBusiness" ? "0 1rem" : "3rem 1rem"};
          ${styles.flexAligncenter}
          -webkit-box-orient:vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          max-width: 100vw;
          position: relative;
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
          overflow: hidden;
        }
        .img {
          opacity: 0.03;
          position: absolute;
          top: 0;
          max-height: 70vh;
          min-width: 100vw;
          width: 100%;
          z-index: -1;
        }

        .msg {
          font-size: 0.8rem;
          color: ${styles.secondaryColor};
          text-align: center;
          padding-top: 0.3rem;
        }
      `}</style>
    </>
  );
}
