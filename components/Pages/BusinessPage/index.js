import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Line from "@/components/Line";
import MenuBar from "./MenuBar";
import Orders from "./Orders";
import axios from "axios";
import { useRouter } from "next/router";

const Add = dynamic(() => import("./Add"));
const More = dynamic(() => import("./More"));
const BusinessInfo = dynamic(() => import("./BusinessInfo"));
const Qr = dynamic(() => import("./Qr"));
const Time = dynamic(() => import("./Time"));
const History = dynamic(() => import("./History"));
const Subscribe = dynamic(() => import("./Subscribe"));
const Support = dynamic(() => import("./Support"));

export default function BusinessPage({ setAuth }) {
  const router = useRouter();

  const [toggleMenu, setToggleMenu] = useState(true);
  const [business, setBusiness] = useState({});
  const [refreshBusiness, setRefreshBusiness] = useState(false);

  useEffect(() => {
    router.beforePopState(() => {
      if (
        router.query.selected === "Orders" ||
        router.query.selected === undefined
      ) {
        const href = `/`;
        router.replace(href, href, { shallow: true });
      } else if (
        router.query.selected === "Add" ||
        router.query.selected === "More"
      ) {
        const href = `/business?selected=Orders`;
        router.replace(href, href, { shallow: true });
      }
      return true;
    });
  }, [router]);

  useEffect(() => {
    router.query.selected === "Orders" ||
    router.query.selected === "Add" ||
    router.query.selected === "More" ||
    router.query.selected === undefined
      ? setToggleMenu(true)
      : setToggleMenu(false);
  }, [router]);

  useEffect(
    () =>
      axios.get("/api/business").then((res) => {
        res?.data?.businessCode && setBusiness(res.data);
      }),
    [refreshBusiness]
  );

  return (
    <>
      <Line />
      {(router.query.selected === "Orders" ||
        router.query.selected === undefined) && (
        <Orders businessCode={business?.businessCode} />
      )}
      {router.query.selected === "Add" && (
        <Add businessCode={business?.businessCode} />
      )}
      {router.query.selected === "More" && <More />}
      {toggleMenu && <MenuBar selected={router.query.selected} />}
      {router.query.selected === "BusinessInfo" && (
        <BusinessInfo
          setAuth={setAuth}
          business={business}
          back={"/business?selected=More"}
          setRefreshBusiness={setRefreshBusiness}
        />
      )}
      {router.query.selected === "Qr" && (
        <Qr business={business} back={"/business?selected=More"} />
      )}
      {router.query.selected === "Time" && (
        <Time
          business={business}
          setRefreshBusiness={setRefreshBusiness}
          back={"/business?selected=More"}
        />
      )}
      {router.query.selected === "History" && (
        <History
          businessCode={business?.businessCode}
          back={"/business?selected=More"}
        />
      )}
      {router.query.selected === "Subscribe" && (
        <Subscribe business={business} back={"/business?selected=More"} />
      )}
      {router.query.selected === "Support" && (
        <Support select={"More"} back={"/business?selected=More"} />
      )}
    </>
  );
}
