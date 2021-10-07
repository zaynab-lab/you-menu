import { useState } from "react";
import { styles } from "@/public/js/styles";
import Button from "@/components/Button";
import Phone from "@/components/Pages/LoginPage/Phone";
import Input from "@/components/Input";
import axios from "axios";
import timer from "@/util/timer";

export default function SignBusiness() {
  const [waiting, setWaiting] = useState(false);
  const [msg, setMsg] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verification, setVerification] = useState("");
  const [time, setTime] = useState("02:00");

  const checkNumber = (action) => {
    setMsg(" ");
    if (!(phoneNumber.length === 7 || phoneNumber.length === 8)) {
      setMsg("check the phone number");
      return;
    } else {
      setMsg("wait to recieve the code using SMS");
    }
    action();
  };

  const requestOTP = () => {
    checkNumber(() => {
      setWaiting(true);
      axios
        .post(
          "/api/auth/Sign",
          { phoneNumber },
          { "content-type": "application/json" }
        )
        .then((res) => {
          if (res.data === "done") {
            setWaiting(true);
            timer(119, setTime);
            setMsg(`the SMS has been sent wait for it`);
          } else {
            setMsg(res.data);
          }
        });
    });
  };
  const signbusiness = () => {
    axios
      .post(
        "/api/auth/SignBusiness",
        { phoneNumber, oTP: verification },
        { "content-type": "application/json" }
      )
      .then((res) => {
        res.data !== "done" && setMsg(res.data);
      });
  };
  return (
    <>
      <div className="form">
        <img className="img" src="/img/ptrn.png" alt="pattern" />
        <Phone
          waiting={waiting}
          phone={phoneNumber}
          setPhone={setPhoneNumber}
          setMsg={setMsg}
          label={"business owner number"}
        />
        {waiting && (
          <>
            <div className="label">verification code</div>
            <Input
              value={verification}
              onchange={(e) => setVerification(e.target.value)}
              type={"number"}
            />
          </>
        )}
        <div className="msg">{msg}</div>
        <div className="msg">
          {time !== "02:00" ? time : time === "00:00" && "retry"}
        </div>
        <Button
          content={"confirm"}
          onclick={() => (!waiting ? requestOTP() : signbusiness())}
        />
      </div>
      <style jsx>{`
        .form {
          padding: 0rem 2rem;
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
        }
        .img {
          opacity: 0.03;
          position: absolute;
          top: 0;
          max-height: 85vh;
          min-width: 100vw;
          width: 100%;
          z-index: -1;
        }
        .label {
          font-size: 1.2rem;
          margin: 0.5rem 0 0.2rem 0;
          width: 100%;
          align-text: left;
          max-width: 25rem;
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
