import { styles } from "@/public/js/styles";
import TextLoader from "./Loaders/TextLoader";

export default function TopBar({
  sectionsRefs,
  categories,
  currentCat,
  setCurrentCat
}) {
  return (
    <>
      <div className="bar">
        {categories?.map((category, i) => (
          <div
            key={i}
            className={`item ${category.name === currentCat && "active"}`}
            style={{
              color: category?.colors?.tbt || "black",
              boxShadow:
                category.name === currentCat &&
                "0 0px 5px 0 " + category?.colors?.tbt
            }}
            onClick={() => {
              setCurrentCat(category.name);
              sectionsRefs.current[category.name] &&
                sectionsRefs.current[category.name].scrollIntoView();
            }}
          >
            {category.name || <TextLoader />}
          </div>
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
          padding: 0rem 0.8rem;
          border-radius: 10rem;
          font-size: 1rem;
          cursor: pointer;
        }

        .topbar {
          margin-top: 2.7rem;
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
