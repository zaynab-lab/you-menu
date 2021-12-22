import { styles } from "@/public/js/styles";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import Chat from "./Chat";

const contactList = [
  {
    name: "Abdallah Mobarak",
    phone: 70097533
  },
  {
    name: "Mohammad Mobarak",
    phone: 70097533
  }
];
export default function ContactList() {
  const [targetUser, setTargetUser] = useState("");

  return (
    <>
      {targetUser === "" && (
        <div className="contactListPage">
          <div className="topBar">
            <Link href="/">
              <div className="backToMain">
                <FaArrowLeft />
              </div>
            </Link>
            <div>contacts</div>
          </div>
          {contactList.map((user, i) => (
            <div
              key={i}
              className="contact"
              onClick={() => setTargetUser(user)}
            >
              <div className="contactprofileImg">
                <FaUser />
              </div>
              {user?.name}
            </div>
          ))}
        </div>
      )}

      {!!targetUser && (
        <Chat setTargetUser={setTargetUser} targerUser={targetUser} />
      )}
      <style jsx>{`
        .contactListPage {
          overflow: hidden;
          height: 100vh;
          ${styles.flexColumn}
        }
        .topBar {
          width: 100%;
          background: ${styles.lineargradeint};
          color: white;
          padding: 0.5rem 0.4rem;
          font-size: 1.4rem;
          ${styles.flexAligncenter}
          gap:1rem
        }

        .contact {
          ${styles.flexAligncenter}
          padding:.5rem;
          gap: 0.5rem;
          cursor: pointer;
        }
        .contactprofileImg {
          width: 3rem;
          height: 3rem;
          border: 1px solid lightgray;
          background: #ddd;
          font-size: 3rem;
          padding-top: 1rem;
          line-height: 0rem;
          border-radius: 50%;
          overflow: hidden;
          color: white;
          ${styles.flexAligncenter}
          ${styles.flexJustifycenter};
          cursor: pointer;
        }
        .backToMain {
          font-size: 1.6rem;
          cursor: pointer;
          line-height: 0;
        }
      `}</style>
    </>
  );
}
