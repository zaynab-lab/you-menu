import { styles } from "@/public/js/styles";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaPaperPlane, FaPhoneAlt } from "react-icons/fa";

const defaultmsgs = [
  { content: "hello world", owner: "1", targerUser: "2" },
  { content: "hello Universe ", owner: "2", targerUser: "1" },
  { content: "how are you??", owner: "2", targerUser: "1" }
];

export default function Chat({ targetUser }) {
  const [msgs, setMsgs] = useState(defaultmsgs);
  const [userMsg, setUserMsg] = useState("");

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
            <div className="profileImg">Img</div>
            <div>{targetUser || "Name"}</div>
          </div>
          <div className="chatCall">
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
            <input
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
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
          padding: 0 0.6rem;
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
        }

        .profileImg {
          width: 2.6rem;
          height: 2.6rem;
          background: white;
          border-radius: 50%;
          overflow: hidden;
        }
        .chatInputContainer {
          ${styles.flexAligncenter}
          gap:.8rem;
          padding: 0.15rem 0.4rem;
          ${styles.userSelect}
        }
        .chatInput {
          padding: 0.2rem 0.8rem;
          border-radius: 0.6rem;
          border: 1px solid gray;
          flex: 1 1 100%;
        }
        .chatinput {
          min-width: 100%;
          border: none;
          font-size: 1.2rem;
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
