import { useState } from "react";
import { styles } from "../public/js/styles";
import Button from "./Button";
import Phone from "./form/Phone";

export default function () {
  const [waiting, setwaiting] = useState(false);
  const [msg, setMsg] = useState();
  const [phone, setPhone] = useState("");
  const [verification, setVerification] = useState("");
  return (
    <>
      <div className="form">
        <img className="img" src="/img/pattern.png" alt="pattern" />
        <Phone waiting={waiting} phone={phone} setPhone={setPhone} />
        {waiting && (
          <>
            <div className="label">verification code</div>
            <div className="input-container">
              <input
                className="input"
                type="number"
                value={verification}
                onChange={(e) => setVerification(e.target.value)}
              />
            </div>
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
        display:-webkit-box; 
        display:-ms-flexbox; 
        display:flex; 
        -webkit-box-orient:vertical; 
        -webkit-box-direction:normal; 
        -ms-flex-direction:column; 
        flex-direction:column; 
        -webkit-box-align:center; 
        -ms-flex-align:center; 
        align-items:center;
        max-width:100vw;
        position:relative;
      }
      .img{
        opacity:.04;
        position:absolute;
        top:0;
        min-height:100%;
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
        
        
      .input-container{
        -webkit-box-shadow: 0 0px 8px 0 grey;
        box-shadow: 0 0px 8px 0 grey;
        height:-webkit-fit-content;
        height:-moz-fit-content;
        height:fit-content;
        border-radius:.5rem;
      }
      .input{
        border:none;
        border-radius:.5rem;
        font-size:2rem;
        max-width:25rem;
        width:100%;
        padding: 0 .5rem;
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
