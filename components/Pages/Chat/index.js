import { styles } from "@/public/js/styles";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaPhone,
  FaPhoneAlt,
  FaUserAlt
} from "react-icons/fa";

export default function Chat() {
  const [callActive, setCallActive] = useState(false);
  const [hangout, setHangout] = useState(false);
  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setHangout(false);
      setCallActive(false);
    }, 500);
    return () => clearTimeout(clearMessage);
  }, [hangout]);

  return (
    <>
      <ChatPage setCallActive={setCallActive} />
      <CallPage
        setHangout={setHangout}
        hangout={hangout}
        callActive={callActive}
      />
    </>
  );
}

export function CallPage({ hangout, setHangout, callActive }) {
  return (
    <>
      <div
        className={`callpage ${callActive && "inner"} ${
          hangout && "hangoutActive"
        }`}
      >
        <div className="callHead">
          <div className="callProfileImg">
            <FaUserAlt />
          </div>
          <div>Ringing...</div>
        </div>
        <div className="hangout" onClick={() => setHangout(true)}>
          <FaPhone />
        </div>
      </div>
      <style jsx>{`
        .callpage {
          width: 100vw;
          height: 100vh;
          padding: 2rem;
          position: absolute;
          top: 0;
          left: 0;
          background: ${styles.lineargradeint};
          color: white;
          -webkit-clip-path: circle(0% at 95% 5%);
          clip-path: circle(0% at 95% 5%);
          -webkit-transition: -webkit-clip-path 0.5s ease-in-out;
          transition: -webkit-clip-path 0.5s ease-in-out;
          -o-transition: clip-path 0.5s ease-in-out;
          transition: clip-path 0.5s ease-in-out;
          transition: clip-path 0.5s ease-in-out,
            -webkit-clip-path 0.5s ease-in-out;
          z-index: 1;
          ${styles.flexAligncenter};
          ${styles.justifyBetween};
          ${styles.flexColumn}
        }

        .inner {
          -webkit-clip-path: circle(100%);
          clip-path: circle(100%);
          z-index: 14;
        }

        .callHead {
          ${styles.flexAligncenter}
          ${styles.flexColumn};
          gap: 2rem;
        }
        .callProfileImg {
          width: 7rem;
          height: 7rem;
          border: 4px solid white;
          background: #ddd;
          font-size: 7rem;
          padding-top: 1rem;
          line-height: 0rem;
          border-radius: 50%;
          overflow: hidden;
          ${styles.flexAligncenter}
          ${styles.flexJustifycenter};
          cursor: pointer;
        }
        .hangout {
          width: 3.6rem;
          height: 3.6rem;
          font-size: 4rem;
          border: 1px solid white;
          border-radius: 50%;
          padding: 0.8rem;
          background: red;
          transform: rotate(-135deg);
          ${styles.flexAligncenter}
          ${styles.flexJustifycenter};
          cursor: pointer;
        }
        .hangoutActive {
          -webkit-clip-path: circle(0% at 50% 87%);
          clip-path: circle(0% at 50% 87%);
          -webkit-transition: -webkit-clip-path 0.5s ease-in-out;
          transition: -webkit-clip-path 0.5s ease-in-out;
          -o-transition: clip-path 0.5s ease-in-out;
          transition: clip-path 0.5s ease-in-out;
          transition: clip-path 0.5s ease-in-out,
            -webkit-clip-path 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}

const defaultmsgs = [
  { content: "hello world", owner: "1", targerUser: "2" },
  { content: "hello Universe ", owner: "2", targerUser: "1" },
  { content: "how are you??", owner: "2", targerUser: "1" }
];

export function ChatPage({ targetUser, setCallActive }) {
  const [msgs, setMsgs] = useState(defaultmsgs);
  const [userMsg, setUserMsg] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);

  return (
    <>
      <div className="chatPage">
        <div className="chatBar">
          <div className="chatBarLeft">
            <Link href="/">
              <div className="chatBack">
                <FaArrowLeft />
              </div>
            </Link>
            <div className="profileImg">
              <FaUserAlt />
            </div>
            <div>{targetUser || "Name"}</div>
          </div>
          <div className="chatCall" onClick={() => setCallActive(true)}>
            <FaPhoneAlt />
          </div>
        </div>

        <div className="chatBody">
          {msgs.map((msg, i) => (
            <div
              key={i}
              className={`msgContainer ${msg?.owner !== "1" && "me"}`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="chatInputContainer">
          <div className="chatInput">
            <textarea
              rows={textareaRows}
              value={userMsg}
              onChange={(e) => {
                e.target.scrollHeight < 33
                  ? setTextareaRows(1)
                  : setTextareaRows(2);
                setUserMsg(e.target.value);
              }}
              className="chatinput"
              placeholder="Message"
            />
          </div>
          <div
            className="chatSendbtn"
            onClick={() => {
              !!userMsg &&
                setMsgs([
                  ...msgs,
                  { content: userMsg, owner: "2", targerUser: "1" }
                ]);
              setUserMsg("");
            }}
          >
            <FaPaperPlane />
          </div>
        </div>
      </div>

      <style jsx>{`
        .chatPage {
          overflow: hidden;
          height: 100vh;
          ${styles.flexColumn}
        }
        .chatBar {
          width: 100%;
          background: ${styles.lineargradeint};
          color: white;
          padding: 0.4rem;
          font-size: 1.4rem;
          ${styles.flexAligncenter}
          ${styles.justifyBetween}
        }
        .chatBody {
          flex: 1 1;
          overflow: auto;
          padding: 0.4rem 0.6rem;
          gap: 0.5rem;
          ${styles.flexColumn};
        }
        .msgContainer {
          background: #fff1f8;
          padding: 0.6rem;
          width: 80%;
          border-radius: 0.4rem;
        }

        .me {
          background: #ffa5aa;
          align-self: flex-end;
        }

        .chatBarLeft {
          ${styles.flexAligncenter}
          gap:.4rem;
        }
        .chatBack {
          line-height: 0;
          cursor: pointer;
        }
        .chatCall {
          font-size: 1.4rem;
          line-height: 0;
          cursor: pointer;
          z-index: 2;
        }

        .profileImg {
          width: 2.6rem;
          height: 2.6rem;
          background: #ddd;
          font-size: 2.5rem;
          border: 1px solid white;
          padding-top: 0.4rem;
          line-height: 0rem;
          border-radius: 50%;
          overflow: hidden;
          ${styles.flexAligncenter}
          ${styles.flexJustifycenter};
          cursor: pointer;
        }
        .chatInputContainer {
          ${styles.flexAligncenter}
          gap:.8rem;
          padding: 0.15rem 0.4rem;
          ${styles.userSelect}
        }
        .chatInput {
          padding: 0rem 0.8rem;
          border-radius: 0.6rem;
          border: 1px solid gray;
          flex: 1 1 100%;
        }
        .chatinput {
          min-width: 100%;
          border: none;
          padding-top: 0.2rem;
          font-size: 1.2rem;
          resize: none;
          overflow: auto;
          height: auto;
        }
        .chatSendbtn {
          min-width: 2.6rem;
          min-height: 2.6rem;
          background: ${styles.secondaryColor};
          color: white;
          border-radius: 50%;
          line-height: 0;
          ${styles.flexAligncenter}
          ${styles.flexJustifycenter};
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
