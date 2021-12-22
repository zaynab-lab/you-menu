import { styles } from "@/public/js/styles";
import { useEffect, useRef, useState } from "react";

import {
  FaArrowLeft,
  FaPaperPlane,
  FaPhone,
  FaPhoneAlt,
  FaUser
} from "react-icons/fa";

import { timeChanger } from "@/util/dateChanger";

export default function Chat({ setTargetUser, targetUser }) {
  const [callActive, setCallActive] = useState(false);
  const [hangout, setHangout] = useState(false);
  const [profile, setProfile] = useState(false);
  const [back, setBack] = useState(false);

  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setHangout(false);
      setCallActive(false);
    }, 500);
    return () => clearTimeout(clearMessage);
  }, [hangout]);

  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setBack(false);
      setProfile(false);
    }, 500);
    return () => clearTimeout(clearMessage);
  }, [back]);

  return (
    <>
      <ChatPage
        setCallActive={setCallActive}
        setTargetUser={setTargetUser}
        setProfile={setProfile}
        targetUser={targetUser}
      />
      <CallPage
        setHangout={setHangout}
        hangout={hangout}
        callActive={callActive}
        targetUser={targetUser}
      />
      <ProfilePage setBack={setBack} back={back} profile={profile} />
    </>
  );
}

const defaultmsgs = [
  {
    content: "hello world",
    owner: "1",
    targerUser: "2",
    receivedTime: Date.now()
  },

  {
    content: "hello Universe ",
    owner: "2",
    targerUser: "1",
    receivedTime: Date.now()
  },

  {
    content: "how are you??",
    owner: "2",
    targerUser: "1",
    receivedTime: Date.now()
  }
];

export function ChatPage({ setProfile, setCallActive, setTargetUser }) {
  const [msgs, setMsgs] = useState(defaultmsgs);
  const [userMsg, setUserMsg] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const chatRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    userMsg === "" &&
      (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [userMsg]);
  return (
    <>
      <div className="chatPage">
        <div className="chatBar">
          <div className="chatBack" onClick={() => setTargetUser("")}>
            <FaArrowLeft />
          </div>
          <div className="chatBarProfile" onClick={() => setProfile(true)}>
            <div className="profileImg">
              <FaUser />
            </div>
            <div>Abdallah Mobarak</div>
          </div>

          <div className="chatCall" onClick={() => setCallActive(true)}>
            <FaPhoneAlt />
          </div>
        </div>

        <div className="chatBody" ref={chatRef}>
          {msgs.map((msg, i) => (
            <div
              key={i}
              className={`msgContainer ${msg?.owner !== "1" && "me"}`}
            >
              {msg.content}
              <div className="msgTime">{timeChanger(msg.receivedTime)}</div>
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
              ref={inputRef}
            />
          </div>

          <div
            className="chatSendbtn"
            onClick={() => {
              !!userMsg &&
                setMsgs([
                  ...msgs,
                  {
                    content: userMsg,
                    owner: "2",
                    targerUser: "1",
                    receivedTime: Date.now()
                  }
                ]);
              setUserMsg("");
              inputRef.current.focus();
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
          font-size: 1.6rem;
          ${styles.flexAligncenter}
          ${styles.justifyBetween}
          gap:.4rem;
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
          max-width: 80%;
          min-width: 60%;
          width: fit-content;
          padding-bottom: 0.8rem;
          border-radius: 0.4rem;
          overflow-wrap: break-word;
          -webkit-hyphens: manual;
          -ms-hyphens: manual;
          hyphens: manual;
          position: relative;
        }

        .me {
          background: #ffb5ba;
          align-self: flex-end;
        }

        .msgTime {
          font-size: 0.8rem;
          color: gray;
          position: absolute;
          bottom: 0rem;
          right: 0.3rem;
        }

        .chatBarProfile {
          ${styles.flexAligncenter}
          gap:.4rem;
          font-size: 1.2rem;
          flex: 1 1 100%;
          ${styles.userSelect};
          cursor: pointer;
        }

        .chatBack {
          line-height: 0;
          cursor: pointer;
        }

        .chatCall {
          font-size: 1.3rem;
          line-height: 0;
          cursor: pointer;
          z-index: 2;
        }

        .profileImg {
          width: 2.4rem;
          height: 2.4rem;
          background: #ddd;
          font-size: 2.4rem;
          border: 1px solid white;
          padding-top: 0.8rem;
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

export function CallPage({ hangout, setHangout, callActive, targetUser }) {
  return (
    <>
      <div
        className={`callpage ${callActive && "inner"} ${
          hangout && "hangoutActive"
        }`}
      >
        <div className="callHead">
          <div className="callProfileImg">
            <FaUser />
          </div>

          <div className="targetUserName">Abdallah Mobarak</div>

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
          gap: 1rem;
        }

        .targetUserName {
          font-size: 1.6rem;
        }

        .callProfileImg {
          width: 7rem;
          height: 7rem;
          border: 3px solid white;
          background: #ddd;
          font-size: 7rem;
          padding-top: 2rem;
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
          background: #f33;
          transform: rotate(-135deg);
          ${styles.flexAligncenter}
          ${styles.flexJustifycenter};
          cursor: pointer;
        }

        .hangoutActive {
          -webkit-clip-path: circle(0% at 50% 90%);
          clip-path: circle(0% at 50% 90%);
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

export function ProfilePage({ back, setBack, profile }) {
  return (
    <>
      <div
        className={`profilepage ${profile && "inner"} ${back && "profileback"}`}
      >
        <div className="backbtn" onClick={() => setBack(true)}>
          <FaArrowLeft />
        </div>
      </div>

      <style jsx>{`
        .profilepage {
          width: 100vw;
          height: 100vh;
          padding: 2rem;
          position: absolute;
          top: 0;
          left: 0;
          background: white;
          color: ${styles.secondaryColor};
          -webkit-clip-path: circle(0% at 50% 5%);
          clip-path: circle(0% at 50% 5%);
          -webkit-transition: -webkit-clip-path 0.5s ease-in-out;
          transition: -webkit-clip-path 0.5s ease-in-out;
          -o-transition: clip-path 0.5s ease-in-out;
          transition: clip-path 0.5s ease-in-out;
          transition: clip-path 0.5s ease-in-out,
            -webkit-clip-path 0.5s ease-in-out;
          z-index: 1;
          ${styles.flexColumn}
        }
        .backbtn {
          font-size: 1.6rem;
          text-align: left;
          cursor: pointer;
        }

        .inner {
          -webkit-clip-path: circle(100%);
          clip-path: circle(100%);
          z-index: 14;
        }

        .profileback {
          -webkit-clip-path: circle(0% at 50% 5%);
          clip-path: circle(0% at 50% 5%);
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
