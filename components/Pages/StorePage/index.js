import dynamic from "next/dynamic";
import { useState } from "react";
import Line from "../../Line";
import MenuBar from "./MenuBar";
import Orders from "./Orders";

const Add = dynamic(() => import("./Add"));
const More = dynamic(() => import("./More"));

export default function Index() {
  const [selected, setSelected] = useState("Orders");
  return (
    <>
      <Line />
      {selected === "Orders" && <Orders />}
      {selected === "Add" && <Add />}
      {selected === "More" && <More />}
      <MenuBar selected={selected} setSelected={setSelected} />
    </>
  );
}
