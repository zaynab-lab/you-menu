import Logo from "@/components/Logo";
import { styles } from "@/public/js/styles";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";

export default function ListOfBusinesses({ from }) {
  const [businesses, setBusinesses] = useState([]);
  const [refresh, setRefresh] = useState();
  useEffect(() => {
    axios.get("/api/users/businesses").then((res) => setBusinesses(res.data));
  }, [refresh]);
  return (
    <>
      <div className="businessList">
        {businesses.map((business, i) => (
          <div key={i} className="wholeBusinessCard">
            <Link
              href={`management/business/${business.businessCode}?from=${from}`}
            >
              <div className="businessCard">
                <div className="businessCardItems">
                  <Logo
                    hasImg={business?.brand?.hasImg}
                    imgLink={business?.brand?.imgLink}
                    businessCode={business.businessCode}
                  />
                </div>
                <div className="businessCardItems">
                  <div className="brand">
                    {business?.brand?.name ? business?.brand?.name : "Brand"}
                  </div>
                  <div>{business?.ownerNumber}</div>
                </div>
              </div>
            </Link>
            {from === "management" && (
              <div
                className="eye"
                onClick={() =>
                  axios
                    .put(
                      "/api/business/verified",
                      {
                        verified: !business?.verified,
                        businessCode: business?.businessCode
                      },
                      { "content-type": "application/json" }
                    )
                    .then((res) => res.data === "done" && setRefresh(!refresh))
                }
              >
                {business.verified ? "👀" : <FaEyeSlash />}
              </div>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .businessList {
          padding: 1rem;
          ${styles.flexBothcenter}
          flex-wrap:wrap;
          gap: 1.6rem;
        }
        .wholeBusinessCard {
          width: 25rem;
          max-width: 25rem;
          border-radius: 2rem 0.5rem 0.5rem 2rem;
          background: white;
          ${styles.boxshadow}
          ${styles.flexAligncenter}
        }
        .eye {
          cursor: pointer;
          padding: 1rem;
        }
        .businessCard {
          width: 100%;
          background: white;
          border-radius: 2rem 0.5rem 0.5rem 2rem;
          ${styles.flexAligncenter}
          gap: 2rem;
          cursor: pointer;
        }
        .businessCardItems {
        }
        .brand {
          font-size: 1.6rem;
        }
        .eye {
        }
      `}</style>
    </>
  );
}
