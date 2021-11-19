import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBan,
  FaPhoneAlt,
  FaUser,
  FaUserCheck,
  FaUserCog
} from "react-icons/fa";

export default function ListOfUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/users/getAllUsers").then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <div className="userList">
        {users.map((user, i) => (
          <div key={i} className="userCard">
            <div className="userCardContent">
              <div className="userItem">
                <FaUser />
                {user?.name || "business"}
              </div>
              <div className="userItem">
                <FaPhoneAlt />+{user?.ccode + " " + user?.number}
              </div>
              <div className="userItem">
                <FaUserCheck /> {user?.role}
              </div>
              <div className="userItem">
                <FaUserCog />
                {user?.workingtimes}
              </div>
              <div className="userItem">
                <div>ot</div>
                {user?.otptimes}
              </div>
            </div>
            <div className="ban">
              <FaBan />
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .userList {
          padding: 1rem;
          ${styles.flexBothcenter}
          flex-wrap:wrap;
          gap: 1.2rem;
        }
        .userCard {
          ${styles.flexAligncenter}
          width: 25rem;
          max-width: 25rem;
          border-radius: 0.5rem 2rem 2rem 0.5rem;
          ${styles.boxshadow}
        }

        .userCardContent {
          width: 100%;
          max-width: 100%;
          padding: 1rem;
        }
        .userItem {
          ${styles.flexAligncenter}
          gap:1rem;
        }
        .ban {
          color: red;
          padding: 1rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
