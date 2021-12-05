import Line from "@/components/Line";
import { useState } from "react";
import TopBar from "./TopBar";
import General from "./General";
import dynamic from "next/dynamic";

const ListOfBusinesses = dynamic(() =>
  import("../MarketerPage/ListOfBusinesses")
);
const ListOfUsers = dynamic(() => import("./ListOfUsers"));
const ListOfProducts = dynamic(() => import("./ListOfProducts"));
const ListOfExchanges = dynamic(() => import("./ListOfExchanges"));

export default function ManagementPage() {
  const [page, setPage] = useState("General");
  return (
    <>
      <Line />
      <TopBar page={page} setPage={setPage} />
      <div className="pageContainer">
        {page === "General" && <General />}
        {page === "Exchanges" && <ListOfExchanges />}
        {page === "Businesses" && <ListOfBusinesses from={"management"} />}
        {page === "Users" && <ListOfUsers />}
        {page === "Deleted" && <ListOfProducts />}
        {page === "Orders" && <div></div>}
      </div>
      <style jsx>{`
        .pageContainer {
          padding-top: 3rem;
        }
      `}</style>
    </>
  );
}
