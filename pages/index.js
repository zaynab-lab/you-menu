import { BurgerButton } from "@/components/BackButton";
import Input from "@/components/Input";
import LogoBar from "@/components/ZAMENU";
import { useState } from "react";
import dynamic from "next/dynamic";

const MenuModal = dynamic(import("@/components/MenuModal"));
// const HorizontalScroll = dynamic(import("@/components/HorizontalScroll"));
const VerticalScroll = dynamic(import("@/components/VerticalScroll"));

export default function Index({ countries }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <BurgerButton setOpenModal={setOpenModal} />
      <LogoBar size={true} />
      <div className="pageContainer">
        <Input placeholder={"search a brand"} font={"1.4rem"} />
        {/* <HorizontalScroll title={"new brands"} /> */}
        <VerticalScroll />

        <MenuModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <style jsx>{`
        .pageContainer {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
