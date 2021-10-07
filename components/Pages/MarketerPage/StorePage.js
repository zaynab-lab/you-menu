import dynamic from "next/dynamic";
import { useState } from "react";
import Line from "@/components/Line";
import MenuBar from "./MenuBar";
import Info from "@/components/StorePage/Info";

const Add = dynamic(() => import("@/components/StorePage/Add"));
const Qr = dynamic(() => import("@/components/StorePage/Qr"));

export default function MarketerStorePage() {
  const [selected, setSelected] = useState("Home");
  return (
    <>
      <Line />
      {selected === "Home" && <Info />}
      {selected === "Add" && <Add />}
      {selected === "Qr" && <Qr />}
      <MenuBar selected={selected} setSelected={setSelected} />
    </>
  );
}
