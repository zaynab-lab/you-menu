import { styles } from "@/public/js/styles";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Label from "./Label";
import Logo from "./Logo";

export default function HorizontalScroll({ title }) {
  const [businesses, setBusinesses] = useState([0, 0, 0, 0]);
  useEffect(() => {
    axios
      .get("/api/business/all")
      .then((res) => Array.isArray(res.data) && setBusinesses(res.data));
  }, []);

  return (
    <>
      <div className="horizantalContainer">
        <div className="Hlabel">
          <Label title={title} />
        </div>
        <div className="Hbusinesses">
          {businesses.map((business, i) => (
            <div key={i}>
              <Link href={`/menu/${business?.businessCode}`}>
                <div className="Hbusiness">
                  <div>
                    <Logo />
                  </div>
                  <div>{business?.brand?.name || "brand"}</div>
                </div>
              </Link>
            </div>
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
        .Hbusinesses {
          gap: 1.2rem;
          ${styles.flexAligncenter};
          overflow: scroll;
          padding: 0.5rem 0.3rem;
          cursor: pointer;
        }
        .Hbusiness {
          ${styles.flexBothcenter};
          ${styles.flexColumn}
          gap:.6rem;
        }
      `}</style>
    </>
  );
}
