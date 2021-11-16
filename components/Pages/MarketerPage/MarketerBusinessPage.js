import dynamic from "next/dynamic";
import { useState } from "react";
import Line from "@/components/Line";
import MenuBar from "./MenuBar";

const BusinessInfo = dynamic(() =>
  import("@/components/Pages/BusinessPage/BusinessInfo")
);
const Add = dynamic(() => import("@/components/Pages/BusinessPage/Add"));
const Qr = dynamic(() => import("@/components/Pages/BusinessPage/Qr"));

export default function MarketerBusinessPage({ business, setRefreshBusiness }) {
  const [selected, setSelected] = useState("Add");

  return (
    <>
      <Line />
      {selected === "Home" && (
        <BusinessInfo
          setRefreshBusiness={setRefreshBusiness}
          business={business}
          back={"/marketing"}
        />
      )}
      {selected === "Add" && (
        <Add back={"/marketing"} businessCode={business?.businessCode} />
      )}
      {selected === "Qr" && <Qr back={"/marketing"} business={business} />}
      <MenuBar selected={selected} setSelected={setSelected} />
    </>
  );
}
