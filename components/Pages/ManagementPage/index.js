import Line from "@/components/Line";
import TopBar from "./TopBar";
// import ListOfBusinesses from "./ListOfBusinesses";

export default function ManagementPage() {
  return (
    <>
      <Line />
      <TopBar />
      <div className="businesesTitle">This is GM Page</div>

      {/* <ListOfBusinesses /> */}

      <style jsx>{`
        .businesesTitle {
          font-size: 1.2rem;
          width: 100%;
          text-align: center;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}
