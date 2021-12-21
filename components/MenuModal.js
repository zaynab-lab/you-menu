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
const Rights = dynamic(() => import("@/components/Pages/EndUserPage/Rights"));

const Support = dynamic(() =>
  import("@/components/Pages/BusinessPage/Support")
);

export default function MenuModal({ openModal, setOpenModal }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("Options");
  const [user, setUser] = useState();
  const [refreshUser, setRefreshUser] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/auth").then((res) => {
      res?.data?.number ? setAuth(true) : setAuth(false);
      res?.data?.number && setUser(res.data);
      setLoading(false);
    });
  }, [refreshUser]);

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

        {!auth &&
          (loading ? (
            <Dots />
          ) : (
            <LoginForm setAuth={setAuth} setRefreshUser={setRefreshUser} />
          ))}
        {selected === "Options" && (
          <Options
            setSelected={setSelected}
            openModal={openModal}
            auth={auth}
            credit={user?.credit}
            businessOwner={user?.permissions?.includes("EnterBusinessPage")}
          />
        )}
        {selected === "Profile" && (
          <Profile
            setSelected={setSelected}
            user={user}
            setRefreshUser={setRefreshUser}
            setAuth={setAuth}
          />
        )}
        {selected === "Discount" && <Discount setSelected={setSelected} />}
        {selected === "Rights" && <Rights setSelected={setSelected} />}
        {selected === "Support" && (
          <Support select="Options" setSelected={setSelected} />
        )}
      </div>

      <style jsx>{`
        .modal {
          width: 100vw;
          max-width: 30rem;
          min-height: 100%;
          height: 100%;
          background: white;
          position: fixed;
          top: 100vh;
          right: 0;
          border-left: 1px solid ${styles.secondaryColor};
          z-index: 100;
          -webkit-transition: top 0.5s ease-in-out;
          -o-transition: top 0.5s ease-in-out;
          transition: top 0.5s ease-in-out;
          font-size: 1.2rem;
          overflow: hidden;
          overflow-y: auto;
        }

        .modal.show {
          top: 0vh;
          -webkit-transition: top 0.2s ease-in-out;
          -o-transition: top 0.2s ease-in-out;
          transition: top 0.2s ease-in-out;
        }

        .X {
          text-align: right;
          font-size: 2rem;
          line-height: 2rem;
          padding-right: 2rem;
          padding-top: 1.2rem;
          cursor: pointer;
          z-index: 100;
        }
      `}</style>
    </>
  );
}
