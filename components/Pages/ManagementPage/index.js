import Line from "@/components/Line";
import { useState } from "react";
import TopBar from "./TopBar";
import ListOfBusinesses from "../MarketerPage/ListOfBusinesses";
import dynamic from "next/dynamic";

const ListOfUsers = dynamic(() => import("./ListOfUsers"));
const ListOfProducts = dynamic(() => import("./ListOfProducts"));

export default function ManagementPage() {
  const [page, setPage] = useState("Businesses");
  return (
    <>
      <Line />
      <TopBar page={page} setPage={setPage} />
      <div className="pageContainer">
        {page === "Businesses" && <ListOfBusinesses from={"management"} />}
        {page === "Users" && <ListOfUsers />}
        {page === "Deleted" && <ListOfProducts />}
      </div>
      <style jsx>{`
        .pageContainer {
          padding-top: 3rem;
        }
      `}</style>
    </>
  );
}
