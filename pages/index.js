import { BurgerButton } from "@/components/BackButton";
import Input from "@/components/Input";
import LogoBar from "@/components/ZAMENU";
import { useState } from "react";
import dynamic from "next/dynamic";

const MenuModal = dynamic(import("@/components/MenuModal"));
// const HorizontalScroll = dynamic(
//   import("@/components/HorizontalScroll.server")
// );

const VerticalScroll = dynamic(import("@/components/VerticalScroll"));

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <>
      <BurgerButton setOpenModal={setOpenModal} />
      <LogoBar size={true} />
      <div className="pageContainer">
        <Input
          value={search}
          onchange={(e) => setSearch(e.target.value)}
          placeholder={"search a brand"}
          font={"1.4rem"}
        />
        {/* <HorizontalScroll title={"new brands"} /> */}
        <VerticalScroll search={search} />
        {/* <MenuModal openModal={openModal} setOpenModal={setOpenModal} /> */}
      </div>
      <style jsx>{`
        .pageContainer {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
