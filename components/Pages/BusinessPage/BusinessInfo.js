import { styles } from "@/public/js/styles";
import Logo from "@/components/Logo";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { useState } from "react";
import Location from "@/components/Location";
import Button from "@/components/Button";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import Router from "next/router";
import Alert from "@/components/Alert";

const BusinessTypes = ["cafe", "resturant", "store", "retail", "other"];
const Currency = ["$", "LBP"];

export default function BusinessInfo({
  setSelected,
  setAuth,
  back,
  business,
  refresh,
  setRefresh
}) {
  const [state, setState] = useState({
    ...business,
    businessType: business.businessType || "cafe",
    currency: business.currency || "$"
  });
  const [alert, setAlert] = useState("");

  return (
    <>
      <BackButton setSelected={setSelected} back={back} />
      <div className="form">
        <div className="logoContainer">
          <Logo />
        </div>
        <Label title={"brand name"} />
        <Input
          value={state?.brand?.name}
          onchange={(e) =>
            setState({ ...state, brand: { name: e.target.value } })
          }
        />
        <Label title={"business type"} />
        <select
          className="selectBusiness"
          value={state?.businessType || "cafe"}
          onChange={(e) => setState({ ...state, businessType: e.target.value })}
        >
          {BusinessTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Label title={"owner number"} />
        <Input type={"number"} value={state?.ownerNumber} />
        <Label title={"currency"} />
        <div className="currency">
          <Input
            value={state?.exRate}
            onchange={(e) => setState({ ...state, exRate: e.target.value })}
          />
          <select
            className="selectBusiness"
            value={state?.currency || "$"}
            onChange={(e) => setState({ ...state, currency: e.target.value })}
          >
            {Currency.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <Label title={"full address"} />
        <Input
          value={state?.address?.content}
          onchange={(e) =>
            setState({ ...state, address: { content: e.target.value } })
          }
        />
        <Label title={"location"} />
        <Location />
        <Button
          content={"confirm"}
          onclick={() => {
            axios
              .put(
                "/api/business",
                { state, businessCode: business?.businessCode },
                { "content-type": "application/json" }
              )
              .then((res) => {
                res.data === "done" && setRefresh(!refresh);
                res.data === "done" && setAlert("change saved");
              });
          }}
        />
        {!back && (
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
      </div>
      <style jsx>{`
        .form {
          padding: 0.4rem 1rem;
          ${styles.flexAligncenter}
          -webkit-box-orient:vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          max-width: 100vw;
          position: relative;
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
          padding-bottom: 5rem;
        }
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
          max-width: 25rem;
          padding: 0 0.5rem;
          ${styles.boxshadow}
        }
        .currency {
          ${styles.flexBothcenter}
          gap:1rem;
        }
      `}</style>
    </>
  );
}
