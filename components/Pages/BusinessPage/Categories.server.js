import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import TextLoader from "@/components/Loaders/TextLoader";
import dynamic from "next/dynamic";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const Category = dynamic(() => import("./Category.server"));

export default function Categories({ categories, businessCode, setRefresh }) {
  const [currentCat, setCurrentCat] = useState(categories?.[0]?.name);
  const [category, setCategory] = useState(categories?.[0]);
  const [renameModal, setRenameModal] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  useEffect(() => {
    !!businessCode &&
      axios
        .get(`/api/business/getCurrency?businessCode=${businessCode}`)
        .then(
          (res) =>
            res?.data?.defaultCurrency &&
            setDefaultCurrency(res?.data?.defaultCurrency)
        );
  }, [businessCode]);

  useEffect(() => {
    !currentCat && setCurrentCat(categories?.[0]?.name);
    !currentCat && setCategoryID(categories?.[0]?._id);
    !currentCat && setCategory(categories?.[0]);
  }, [categories, currentCat]);

  return (
    <>
      <div className="categoryBar">
        {categories?.map((category, i) => (
          <div
            key={i}
            onClick={() => {
              !!category &&
                currentCat === category.name &&
                setRenameModal(true);
              !!category && setCurrentCat(category.name);
              !!category && setCategoryID(category._id);
              !!category && setCategory(category);
            }}
            className={`categoryName ${
              currentCat === category.name && "active"
            }`}
          >
            {category.name || <TextLoader />}
          </div>
        ))}
      </div>
      <Category
        category={category}
        businessCode={businessCode}
        currentCat={currentCat}
        setCurrentCat={setCurrentCat}
        setRefreshCat={setRefresh}
        defaultCurrency={defaultCurrency}
      />
      <RenameModal
        dfname={currentCat}
        renameModal={renameModal}
        setRenameModal={setRenameModal}
        categoryID={categoryID}
        businessCode={businessCode}
        setCurrentCat={setCurrentCat}
        setRefresh={setRefresh}
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
        .categoryName {
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
        .active {
          -webkit-box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
          box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}

export function RenameModal({
  renameModal,
  setRenameModal,
  dfname,
  setCurrentCat,
  categoryID,
  businessCode,
  setRefresh
}) {
  const [name, setName] = useState(dfname);

  useEffect(() => !!dfname && setName(dfname), [dfname]);
  return (
    <>
      <div className={`renameModal ${renameModal && "showRenameModal"}`}>
        <div className="renameContainer">
          <div className="Xheader">
            <div>change name</div>
            <div
              className="X"
              onClick={() => {
                setRenameModal(false);
              }}
            >
              x
            </div>
          </div>
          <div className="renameInput">
            <input
              className="name-input"
              value={name}
              onChange={(e) =>
                e.target.value !== " " && setName(e.target.value)
              }
            />
            <div
              className="check"
              onClick={() => {
                !!name &&
                  axios
                    .put(
                      "/api/categories/name",
                      {
                        name,
                        categoryID,
                        businessCode
                      },
                      { "content-type": "application/json" }
                    )
                    .then(
                      (res) =>
                        res?.data === "done" &&
                        setRefresh((refresh) => !refresh)
                    );
                !!name && setCurrentCat(name);
                !!name && setName(name);
                setRenameModal(false);
              }}
            >
              <FaCheck />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .renameModal {
          position: fixed;
          top: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          opacity: 0;
          ${styles.flexBothcenter}
          ${styles.flexColumn}
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
          background: #2222;
        }

        .showRenameModal {
          opacity: 100;
          z-index: 100;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }
        .renameContainer {
          border: 1px solid ${styles.secondaryColor};
          background: white;
          border-radius: 0.7rem;
          padding: 0.5rem;
          ${styles.boxshadow}
        }

        .Xheader {
          text-align: right;
          width: 100%;
          background: white;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          justify-content: space-between;
          padding: 0 0.5rem;
          border-radius: 0.7rem 0.7rem 0 0;
          padding-bottom: 0.5rem;
        }

        .X {
          font-size: 1.6rem;
          line-height: 0;
          padding-bottom: 0.4rem;
          cursor: pointer;
        }

        .renameInput {
          ${styles.flexAligncenter}
        }

        .name-input {
          border-radius: 1rem;
          border: 1px solid lightgrey;
          padding: 0.2rem 0.5rem;
          font-size: 1.1rem;
        }
        .check {
          font-size: 1rem;
          transform: translateX(-2.5rem);
          border-radius: 1rem;
          cursor: pointer;
          padding: 0.1rem 0.7rem;
          padding-top: 0.3rem;
          color: ${styles.secondaryColor};
          background: white;
        }
      `}</style>
    </>
  );
}
