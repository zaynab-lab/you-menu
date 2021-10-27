import dynamic from "next/dynamic";
import { useState } from "react";
import Line from "@/components/Line";
import MenuBar from "./MenuBar";

const BusinessInfo = dynamic(() =>
  import("@/components/Pages/BusinessPage/BusinessInfo")
);
const Add = dynamic(() => import("@/components/Pages/BusinessPage/Add"));
const Qr = dynamic(() => import("@/components/Pages/BusinessPage/Qr"));

export default function MarketerBusinessPage({
  business,
  refresh,
  setRefresh
}) {
  const [selected, setSelected] = useState("Add");

  return (
    <>
      <Line />
      {selected === "Home" && (
        <BusinessInfo
          refresh={refresh}
          setRefresh={setRefresh}
          business={business}
          back={"/management"}
        />
      )}
      {selected === "Add" && (
        <Add back={"/management"} businessCode={business?.businessCode} />
      )}
      {selected === "Qr" && <Qr back={"/management"} business={business} />}
      <MenuBar selected={selected} setSelected={setSelected} />
    </>
  );
}
