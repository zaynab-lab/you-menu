import dynamic from "next/dynamic";
import { useState } from "react";
import Line from "@/components/Line";
import MenuBar from "./MenuBar";
import BusinessInfo from "@/components/Pages/BusinessPage/BusinessInfo";

const Add = dynamic(() => import("@/components/Pages/BusinessPage/Add"));
const Qr = dynamic(() => import("@/components/Pages/BusinessPage/Qr"));

export default function MarketerBusinessPage({ businessCode }) {
  const [selected, setSelected] = useState("Home");

  return (
    <>
      <Line />
      {selected === "Home" && <BusinessInfo back={"/management"} />}
      {selected === "Add" && <Add back={"/management"} />}
      {selected === "Qr" && (
        <Qr back={"/management"} businessCode={businessCode} />
      )}
      <MenuBar selected={selected} setSelected={setSelected} />
    </>
  );
}
