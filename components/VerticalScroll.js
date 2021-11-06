import { styles } from "@/public/js/styles";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function VerticalScroll({ title }) {
  const [businesses, setBusinesses] = useState([0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    axios
      .get("/api/business/all")
      .then((res) => Array.isArray(res.data) && setBusinesses(res.data));
  }, []);

  return (
    <>
      <div className="horizantalContainer">
        <div className="vbusinesses">
          {businesses.map((business, i) => (
            <Link
              href={
                business?.businessCode ? `/menu/${business?.businessCode}` : "/"
              }
            >
              <div key={i} className="vbusiness">
                <div>
                  <Logo />
                </div>
                <div>{business?.brand?.name || "brand"}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .horizantalContainer {
          padding: 0.5rem 0;
        }

        .Hlabel {
          color: grey;
          transform: translate(0.1rem, 0.5rem);
        }

        .vbusinesses {
          gap: 1.2rem;
          ${styles.flexAligncenter};
          -webkit-flex-wrap;
          flex-wrap: wrap;
          padding: 0.5rem 0.3rem;
        }

        .vbusiness {
          ${styles.flexBothcenter};
          ${styles.flexColumn}
          flex:1 1 40%;
          gap:.6rem;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}
