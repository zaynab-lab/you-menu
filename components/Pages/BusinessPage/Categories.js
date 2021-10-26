import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import TextLoader from "@/components/Loaders/TextLoader";
import dynamic from "next/dynamic";

const Category = dynamic(() => import("./Category"));

export default function Categories({ categories, businessCode }) {
  const [currentCat, setCurrentCat] = useState(categories?.[0]?.name);
  const [category, setCategory] = useState(categories?.[0]);

  useEffect(() => {
    !currentCat && setCurrentCat(categories?.[0]?.name);
    !currentCat && setCategory(categories?.[0]);
  }, [categories, currentCat]);

  return (
    <>
      <div className="categoryBar">
        {categories?.map((category, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrentCat(category.name);
              setCategory(category);
            }}
            className={`categoryContainer ${
              currentCat === category.name && "active"
            }`}
          >
            <div>{category.name || <TextLoader />}</div>
          </div>
        ))}
      </div>
      <Category
        category={category}
        currentCat={currentCat}
        businessCode={businessCode}
      />

      <style jsx>{`
        .categoryBar {
          position: sticky;
          position: -webkit-sticky;
          top: 0.3rem;
          padding: 0.6rem;
          overflow: auto;
          background: white;
          ${styles.flexAligncenter}
        }
        .categoryContainer {
          border-radius: 5rem;
          white-space: nowrap;
          padding: 0.1rem 0.5rem;
          margin: 0 0.3rem;
          cursor: pointer;
          ${styles.flexAligncenter}
          gap:.5rem;
          -webkit-box-shadow: 0 0px 5px 0 grey;
          box-shadow: 0 0px 5px 0 grey;
        }
        .count {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 20rem;
          color: white;
          margin: 0 0.2rem;
          font-size: 0.8rem;
          background: ${styles.secondaryColor};
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          ${styles.flexAligncenter}
        }
        .active {
          -webkit-box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
          box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
