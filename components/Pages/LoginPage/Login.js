import { useState } from "react";
import { styles } from "@/public/js/styles";
import Button from "@/components/Button";
import Phone from "./Phone";
import Input from "@/components/Input";

export default function Login({ setAuth }) {
  const [waiting, setwaiting] = useState(false);
  const [msg, setMsg] = useState();
  const [phone, setPhone] = useState("");
  const [verification, setVerification] = useState("");

  return (
    <>
      <div className="form">
        <img className="img" src="/img/ptrn.png" alt="pattern" />
        <Phone waiting={waiting} phone={phone} setPhone={setPhone} />
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
        <Button
          content={"confirm"}
          onclick={() => {
            if (!waiting) {
              if (phone.length === 8 || phone.length === 7) {
                setwaiting(true);
                setMsg("wait to recieve the code using SMS");
              } else {
                setMsg("phone number is not correct");
              }
            } else {
              if (verification.length === 5) {
                setMsg("loging in ..... ");
                setAuth(true);
              } else {
                setMsg("wrong verification code");
              }
            }
          }}
        />
      </div>

      <style>{`
      .form{
        padding:3rem 1rem;
        ${styles.flexAligncenter}
        -webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;
        max-width:100vw;
        position:relative;
        height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;
      }
      .img{
        opacity:.03;
        position:absolute;
        top:0;
        min-height:100vh;
        min-width:100vw;
        width:100%;
        z-index:-1;
      }
      .label{
        font-size:1.2rem;
        margin:.5rem 0 .2rem 0;
        width:100%;
        align-text:left;
        max-width:25rem;
      }
      
      .msg{
        font-size:.8rem;
        color:${styles.secondaryColor};
        text-align:center;
        padding-top:.3rem;
      }
      `}</style>
    </>
  );
}
