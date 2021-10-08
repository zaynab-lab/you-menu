import { styles } from "@/public/js/styles";
import Logo from "@/components/Logo";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { useState } from "react";

export default function BusinessInfo({ setSelected }) {
  const [brand, setBrand] = useState("");
  const [ownerNumber, setOwnerNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  return (
    <>
      <BackButton setSelected={setSelected} />
      <div className="form">
        <div className="logoContainer">
          <Logo />
        </div>
        <Label title={"brand"} />
        <Input value={brand} onchange={(e) => setBrand(e.target.value)} />
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
      `}</style>
    </>
  );
}
