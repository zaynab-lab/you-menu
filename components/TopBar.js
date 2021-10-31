import { styles } from "@/public/js/styles";
import TextLoader from "./Loaders/TextLoader";

export default function TopBar({ categories, state, setState }) {
  return (
    <>
      <div className="bar">
        {categories?.map((category, i) => (
          <a href={`#${category.name}`}>
            <div
              key={i}
              className={`item ${category.name === state && "active"}`}
              style={{ color: category?.colors?.tbt || "black" }}
              onClick={() => setState(category.name)}
            >
              {category.name || <TextLoader />}
            </div>
          </a>
        ))}
      </div>

      <div className="topbar"></div>

      <style jsx>{`
        .bar {
          padding: 0.3rem;
          padding-top: 0.8rem;
          overflow: auto;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          gap: 0.8rem;
          width: 100%;
          position: fixed;
          position: -webkit-fixed;
          top: 0;
          background: white;
          z-index: 10;
        }

        .item {
          white-space: nowrap;
          -webkit-box-shadow: 0 0px 5px 0 grey;
          box-shadow: 0 0px 5px 0 grey;
          padding: 0.2rem 0.8rem;
          border-radius: 10rem;
          font-size: 1rem;
        }

        .topbar {
          margin-top: 3rem;
        }

        .active {
          font-size: 1.4rem;
          -webkit-box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
          box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
