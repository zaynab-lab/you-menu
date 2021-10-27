import Logo from "@/components/Logo";
import { styles } from "@/public/js/styles";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListOfBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    axios.get("/api/users/businesses").then((res) => setBusinesses(res.data));
  }, []);
  return (
    <>
      <div className="businessList">
        {businesses.map((business, i) => (
          <Link key={i} href={`management/business/${business.businessCode}`}>
            <div className="businessCard">
              <div className="businessCardItems">
                <Logo />
              </div>
              <div className="businessCardItems">
                <div className="brand">
                  {business?.brand?.name ? business?.brand?.name : "Brand"}
                </div>
                <div>{business?.ownerNumber}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .businessList {
          padding: 1rem;
          ${styles.flexBothcenter}
          flex-wrap:wrap;
          gap:1.6rem;
        }
        .businessCard {
          width: 25rem;
          max-width: 25rem;
          border-radius: 2rem 0.5rem 0.5rem 2rem;
          background: white;
          // border: 1px solid ${styles.secondaryColor};
          ${styles.boxshadow}
          ${styles.flexAligncenter}
          gap:2rem;
          cursor: pointer;
        }
        .businessCardItems {
        }
        .brand {
          font-size: 1.6rem;
        }
      `}</style>
    </>
  );
}
