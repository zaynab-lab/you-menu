import { styles } from "@/public/js/styles";
import Logo from "@/components/Logo";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { useState } from "react";
import Location from "@/components/Location";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import Router from "next/router";
import Alert from "@/components/Alert";
import BPLayout from "./BPLayout";

const BusinessTypes = ["cafe", "resturant", "store", "retail", "other"];
const Currency = ["$", "LBP", "AED", "OMR", "CAD"];

export default function BusinessInfo({
  setSelected,
  setAuth,
  back,
  business,
  setRefreshBusiness
}) {
  const [brandName, setBrandName] = useState(business?.brand?.name);
  const [businessType, setBusinessType] = useState(
    business?.businessType || "cafe"
  );
  const [exRate, setExRate] = useState(business?.exRate);
  const [currency, setCurrency] = useState(business?.currency || "$");
  const [addressContent, setAddressContent] = useState(
    business?.address?.content
  );
  const [alert, setAlert] = useState("");

  const handleOnBlur = (value, business, state, v2) => {
    if (v2) {
      business?.[v2]?.[value] !== state &&
        setAlert("something is going change");
      business?.[v2]?.[value] !== state &&
        axios
          .put(
            `/api/business/${value}`,
            { [value]: state, businessCode: business?.businessCode },
            { "content-type": "application/json" }
          )
          .then((res) => {
            res.data === "done"
              ? setAlert("change done")
              : setAlert("something went wrong");
            res.data !== "done" && setRefreshBusiness((refresh) => !refresh);
          });
    } else {
      business?.[value] !== state && setAlert("something is going change");
      business?.[value] !== state &&
        axios
          .put(
            `/api/business/${value}`,
            { [value]: state, businessCode: business?.businessCode },
            { "content-type": "application/json" }
          )
          .then((res) => {
            res.data === "done"
              ? setAlert("change done")
              : setAlert("something went wrong");
            res.data !== "done" && setRefreshBusiness((refresh) => !refresh);
          });
    }
  };

  return (
    <>
      <BackButton setSelected={setSelected} back={back} select={"More"} />
      <BPLayout className="pageContainer">
        <div className="logoContainer">
          <Logo
            uploading={true}
            businessCode={business?.businessCode}
            hasImg={business?.brand?.hasImg}
            imgLink={business?.brand?.imgLink}
            setRefreshBusiness={setRefreshBusiness}
            alert={alert}
            setAlert={setAlert}
          />
        </div>
        <Label title={"brand name"} />
        <Input
          value={brandName}
          onblur={() => handleOnBlur("name", business, brandName, "brand")}
          onchange={(e) => setBrandName(e.target.value)}
        />
        <Label title={"business type"} />
        <select
          className="selectBusiness"
          value={businessType}
          onChange={(e) => {
            handleOnBlur("businessType", business, e.target.value);
            setBusinessType(e.target.value);
          }}
        >
          {BusinessTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Label title={"owner number"} />
        <Input value={business?.ownerNumber} onchange={() => {}} />
        <Label title={"dollar rate"} />
        <div className="currency">
          <Input
            value={exRate}
            onchange={(e) => setExRate(e.target.value)}
            onblur={() => handleOnBlur("exRate", business, exRate)}
          />
          <select
            className="selectCurrency"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
              handleOnBlur("currenc", business, e.target.value);
            }}
          >
            {Currency.map((unit, j) => (
              <option key={j} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <Label title={"full address"} />
        <Input
          value={addressContent}
          onchange={(e) => setAddressContent(e.target.value)}
          onblur={() =>
            handleOnBlur("content", business, addressContent, "address")
          }
        />
        <Label title={"location"} />
        <Location />
        {back ? (
          <div className="after"></div>
        ) : (
          <div
            className="signout"
            onClick={() =>
              axios
                .post("/api/auth/Logout")
                .then((res) => res.data === "done" && Router.push("/"))
                .then(() => setAuth(false))
            }
          >
            <div>Log out</div>
            <div className="signoutIcon">
              <FaSignOutAlt />
            </div>
          </div>
        )}
        <Alert alert={alert} setAlert={setAlert} />
      </BPLayout>
      <style jsx>{`
        .logoContainer {
          padding: 1rem;
          ${styles.flexJustifycenter}
        }
        .signout {
          color: ${styles.secondaryColor};
          font-size: 1.2rem;
          ${styles.flexBothcenter}
          cursor: pointer;
          padding: 2rem;
        }
        .signoutIcon {
          transform: translate(0.5rem, 0.2rem);
        }
        .selectBusiness {
          background: white;
          border: none;
          height: 2.8rem;
          font-size: 1.2rem;
          border-radius: 0.5rem;
          width: 100%;
          max-width: 22rem;
          padding: 0 0.5rem;
          ${styles.boxshadow}
        }
        .selectCurrency {
          background: white;
          border: none;
          height: 2.8rem;
          font-size: 1.2rem;
          border-radius: 0.5rem;
          width: 5rem;
          padding: 0 0.5rem;
          ${styles.boxshadow}
        }
        .currency {
          max-width: 22rem;
          ${styles.flexBothcenter}
          gap:1rem;
        }
        .after {
          padding-bottom: 4rem;
        }
      `}</style>
    </>
  );
}
