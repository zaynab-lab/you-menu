import { styles } from "@/public/js/styles";
import TextLoader from "./Loaders/TextLoader";
import useInveiw from "@/util/useInveiw";

export default function TopBar({
  sectionsRefs,
  categories,
  currentCat,
  setCurrentCat
}) {
  const [setRef, visible] = useInveiw({ threshold: 0 });

  return (
    <>
      <div ref={setRef}></div>

      <div className={`bar ${!visible && "visible"}`}>
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

      <style jsx>{`
        .bar {
          padding: 0.5rem 0.3rem;
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
          border: solid ${categories[0]?.colors?.tbt};
          border-width: 1px 0;
          transition: opacity 0.5s ease-out;
          opacity: 0;
        }
        .visible {
          opacity: 1;
          transition: opacity 0.5s ease-out;
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
          font-size: 1.4rem;
          -webkit-box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
          box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
