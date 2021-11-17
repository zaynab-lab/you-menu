import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaUser, FaUserCheck, FaUserCog } from "react-icons/fa";

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
          </div>
        ))}
      </div>
      <style jsx>{`
        .userList {
          padding: 1rem;
          ${styles.flexBothcenter}
          flex-wrap:wrap;
          gap: 1.6rem;
        }

        .userCard {
          width: 25rem;
          max-width: 25rem;
          border-radius: 2rem 0.5rem 0.5rem 2rem;
          background: white;
          ${styles.boxshadow}
          padding:1rem;
        }
        .userItem {
          ${styles.flexAligncenter}
          gap:1rem;
        }
      `}</style>
    </>
  );
}
