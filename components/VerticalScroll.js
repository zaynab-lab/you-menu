import { styles } from "@/public/js/styles";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextLoader from "./Loaders/TextLoader";
import Logo from "./Logo";

const businessTypes = ["all", "cafe", "resturant", "store", "retail", "online"];

export default function VerticalScroll({ search }) {
  const [businesses, setBusinesses] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [typeFilter, setTypeFilter] = useState("all");
  useEffect(() => {
    axios
      .get("/api/business/all")
      .then((res) => Array.isArray(res.data) && setBusinesses(res.data));
  }, []);

  return (
    <>
      <div className="horizantalContainer">
        <div className="bar">
          {businessTypes?.map((type, j) => (
            <div
              key={j}
              className={`item ${type === typeFilter && "active"}`}
              onClick={() => setTypeFilter(type)}
            >
              {type || <TextLoader />}
            </div>
          ))}
        </div>
        <div className="vbusinesses">
          {businesses
            .filter((business) =>
              typeFilter === "all"
                ? business
                : business?.businessType === typeFilter
            )
            .filter((business) =>
              business?.brand?.name
                ?.toLowerCase()
                .includes(search?.toLowerCase())
            )
            .map((business, i) => (
              <Link
                key={i}
                href={
                  business?.businessCode
                    ? `/menu/${business?.businessCode}`
                    : "/"
                }
              >
                <div className="vbusiness">
                  <div>
                    <Logo
                      hasImg={business?.brand?.hasImg}
                      imgLink={business?.brand?.imgLink}
                      businessCode={business?.businessCode}
                    />
                  </div>
                  <div>{business?.brand?.name || "brand"}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <style jsx>{`
      .bar {
        padding: 1rem .2rem;
        padding-top: 0.8rem;
        overflow: auto;
        ${styles.flexAligncenter}
        gap: 0.4rem;
        width: 100%;
        top: 0;
        background: white;
        z-index: 10;
        }
      .item {
        white-space: nowrap;
        -webkit-box-shadow: 0 0px 5px 0 grey;
        box-shadow: 0 0px 5px 0 grey;
        padding: 0rem 0.8rem;
        border-radius: 10rem;
        font-size: 1rem;
        cursor: pointer;
        }
        .active {
          color:${styles.secondaryColor};
          -webkit-box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
          box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
          }
          
          
        .horizantalContainer {
          padding: .5rem 0;
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
          ${styles.flexColumn};
          flex:1 1 3.2rem;
          gap:.6rem;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}
