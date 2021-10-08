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

const BusinessTypes = ["cafe", "resturant", "store", "other"];

export default function BusinessInfo({ setSelected, setAuth }) {
  const [brand, setBrand] = useState("");
  const [ownerNumber, setOwnerNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [bType, setBType] = useState("cafe");

  return (
    <>
      <BackButton setSelected={setSelected} />
      <div className="form">
        <div className="logoContainer">
          <Logo />
        </div>
        <Label title={"brand name"} />
        <Input value={brand} onchange={(e) => setBrand(e.target.value)} />
        <Label title={"business type"} />
        {bType}
        <select
          className="selectBusiness"
          onChange={(e) => setBType(e.target.value)}
        >
          {BusinessTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Label title={"owner number"} />
        <Input
          type={"number"}
          value={ownerNumber}
          onchange={(e) => setOwnerNumber(e.target.value)}
        />
        <Label title={"full address"} />
        <Input
          value={fullAddress}
          onchange={(e) => setFullAddress(e.target.value)}
        />
        <Label title={"location"} />
        <Location />
        <Button content={"confirm"} />
        <div
          className="signout"
          onClick={
            () =>
              axios
                .post("/api/auth/Logout")
                .then((res) => res.data === "done" && Router.push("/"))
                .then(() => setAuth(false))
            // (res) =>
            // res.data === "done" &&
            // setState({
            // name: "",
            // number: "",
            // mail: "",
            // password: ""
            // })
            // )
            // .then(() => Router.push("/"));
          }
        >
          <div>Log out</div>
          <div className="signoutIcon">
            <FaSignOutAlt />
          </div>
        </div>
      </div>
      <style jsx>{`
        .form {
          padding: 0 1rem;
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
      `}</style>
    </>
  );
}
