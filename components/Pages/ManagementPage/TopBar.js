import { styles } from "@/public/js/styles";

const pages = [
  { name: "Manage Busnisses", page: "Businesses" },
  { name: "Manage Users", page: "Users" },
  { name: "Manage deleted items", page: "Deleted" }
];
export default function TopBar({ setPage, page }) {
  return (
    <>
      <div className="bar">
        {pages.map((item, i) => (
          <div
            key={i}
            className={`item ${page === item.page && "active"}`}
            onClick={() => setPage(item.page)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        .bar {
          padding: 0.5rem 0.3rem;
          padding-top: 0.8rem;
          overflow: auto;
          ${styles.flexAligncenter}
          gap: 0.8rem;
          width: 100%;
          position: fixed;
          position: -webkit-fixed;
          top: 0;
          background: white;
          z-index: 10;
          border-width: 1px 0;
        }

        .item {
          white-space: nowrap;
          -webkit-box-shadow: 0 0px 5px 0 grey;
          box-shadow: 0 0px 5px 0 grey;
          padding: 0rem 0.8rem;
          border-radius: 10rem;
          font-size: 1rem;
          cursor: pointer;
        }
        .active {
          color: ${styles.secondaryColor};
          -webkit-box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
          box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
