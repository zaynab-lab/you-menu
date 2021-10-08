import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Line from "@/components/Line";
import MenuBar from "./MenuBar";
import Orders from "./Orders";

const Add = dynamic(() => import("./Add"));
const More = dynamic(() => import("./More"));
const BusinessInfo = dynamic(() => import("./BusinessInfo"));
const Qr = dynamic(() => import("./Qr"));
const Time = dynamic(() => import("./Time"));
const History = dynamic(() => import("./History"));

export default function BusinessPage() {
  const [selected, setSelected] = useState("Orders");
  const [toggleMenu, setToggleMenu] = useState(true);
  useEffect(() => {
    selected === "Orders" || selected === "Add" || selected === "More"
      ? setToggleMenu(true)
      : setToggleMenu(false);
  }, [selected]);
  return (
    <>
      <Line />
      {selected === "Orders" && <Orders />}
      {selected === "Add" && <Add />}
      {selected === "More" && <More setSelected={setSelected} />}
      {toggleMenu && <MenuBar selected={selected} setSelected={setSelected} />}
      {selected === "BusinessInfo" && (
        <BusinessInfo setSelected={setSelected} />
      )}
      {selected === "Qr" && <Qr setSelected={setSelected} />}
      {selected === "Time" && <Time setSelected={setSelected} />}
      {selected === "History" && <History setSelected={setSelected} />}
    </>
  );
}
