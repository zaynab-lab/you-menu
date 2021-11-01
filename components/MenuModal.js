import { styles } from "@/public/js/styles";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import Dots from "./Loaders/Dots";
import Line from "./Line";

const LoginForm = dynamic(() =>
  import("@/components/Pages/LoginPage/LoginForm")
);
const Options = dynamic(() => import("@/components/Pages/EndUserPage/Options"));
const Profile = dynamic(() => import("@/components/Pages/EndUserPage/Profile"));
const Discount = dynamic(() =>
  import("@/components/Pages/EndUserPage/Discount")
);
const History = dynamic(() => import("@/components/Pages/EndUserPage/History"));
const Rights = dynamic(() => import("@/components/Pages/EndUserPage/Rights"));

const Support = dynamic(() =>
  import("@/components/Pages/BusinessPage/Support")
);

export default function MenuModal({ openModal, setOpenModal }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("Options");
  useEffect(() => {
    setLoading(true);
    axios.get("/api/auth").then((res) => {
      res?.data?.number && res?.data?.permissions?.includes("EnterBusinessPage")
        ? setAuth(true)
        : setAuth(false);
      res?.data?.number && setLoading(false);
      // res?.data.number &&
      //   setAlertmsg(`you can login here to create a business`);
      // setLoading(false);
    });
  }, []);

  return (
    <>
      <div className={`modal ${openModal && "show"}`}>
        {openModal && <Line />}
        <div
          className="X"
          onClick={() => {
            setOpenModal(false);
            setSelected("Options");
          }}
        >
          x
        </div>

        {!auth && (loading ? <Dots /> : <LoginForm setAuth={setAuth} />)}
        {selected === "Options" && (
          <Options
            setSelected={setSelected}
            openModal={openModal}
            auth={auth}
          />
        )}
        {selected === "Profile" && <Profile setSelected={setSelected} />}
        {selected === "Discount" && <Discount setSelected={setSelected} />}
        {selected === "History" && <History setSelected={setSelected} />}
        {selected === "Rights" && <Rights setSelected={setSelected} />}
        {selected === "Support" && (
          <Support select="Options" setSelected={setSelected} />
        )}
      </div>

      <style jsx>{`
        .modal {
          width: 100vw;
          max-width: 30rem;
          height: 100vh;
          background: white;
          position: fixed;
          top: 100vh;
          right: 0;
          border-left: 1px solid ${styles.secondaryColor};
          z-index: 100;
          transition: all 0.5s ease-out;
          font-size: 1.2rem;
          overflow: hidden;
        }

        .modal.show {
          top: 0vh;
          transition: all 0.2s ease-out;
        }

        .X {
          text-align: right;
          font-size: 2rem;
          line-height: 0;
          padding-right: 2rem;
          padding-top: 2rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
