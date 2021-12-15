import { FaTrashAlt } from "react-icons/fa";
import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import {
  ProductNameLoader,
  ProductPriceLoader
} from "@/components/Loaders/TextLoader";
import ProductModal from "@/components/ProductModal";
import axios from "axios";
import Color from "./Color";
import Alert from "@/components/Alert";
import Image from "next/image";
import ActionModal from "@/components/ActionModal";
import Controller from "@/components/Controller";
import Accordion from "@/components/Accordion";
import { firebaseLink } from "@/util/links";

export default function Category({
  category,
  businessCode,
  currentCat,
  setCurrentCat,
  setRefreshCat,
  defaultCurrency
}) {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([0]);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const categoryID = category._id;
  const [alert, setAlert] = useState("");
  const [currentProduct, setCurrentProduct] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [colors, setColors] = useState(category?.colors);
  const [removeModal, setRemoveModal] = useState(false);

  useEffect(() => {
    categoryID &&
      axios
        .get(`/api/products/getBycategory?categoryID=${categoryID}`)
        .then((res) => {
          Array.isArray(res.data) && setProducts(res.data);
        });
  }, [categoryID, businessCode, refreshProducts]);

  useEffect(() => {
    setProducts([0]);
    categoryID &&
      axios
        .get(`/api/categories/colors?categoryID=${categoryID}`)
        .then((res) => {
          res?.data && setColors(res?.data);
        });
  }, [categoryID]);

  return (
    <>
      <div className="categoryContainer">
        {!!currentCat && (
          <>
            <div className="categoryList">
              <div className="products">
                {products?.map((product, i) => (
                  <div
                    key={i}
                    className="product"
                    onClick={() => {
                      !!product && setCurrentProduct(product);
                      !!product && setOpenModal(true);
                    }}
                  >
                    <div className="nameSection">
                      <div className="name">
                        {product.name || <ProductNameLoader />}
                      </div>
                      {product.description && (
                        <div className="description">{product.description}</div>
                      )}
                      {typeof product.price === "number" && (
                        <div className="price">
                          {typeof product.price === "number" ? (
                            product.price + " " + (defaultCurrency || "USD")
                          ) : (
                            <ProductPriceLoader />
                          )}
                        </div>
                      )}
                    </div>

                    {product?.hasImg && (
                      <div className="productPartImg">
                        <Image
                          height="70"
                          width="70"
                          loader={({ src, width }) =>
                            `${
                              firebaseLink +
                              businessCode +
                              `%2F${
                                src + product?.imgLink
                              }.png?alt=media&tr=w-${width}`
                            }`
                          }
                          src={product?._id || "noImg"}
                          alt={product.name}
                        />
                      </div>
                    )}
                    <div>
                      <Controller
                        appear={product?.appear}
                        exist={product?.exist}
                      />
                    </div>
                  </div>
                ))}

                <div className="addNewItem">
                  <input
                    value={productName}
                    className="addproduct-input"
                    placeholder="new product"
                    onChange={(e) =>
                      e.target.value !== " " && setProductName(e.target.value)
                    }
                  />
                  <div
                    className="addproduct"
                    onClick={() => {
                      !!productName && setProducts([...products, 0]);
                      !!productName
                        ? axios
                            .post(
                              "/api/products",
                              { productName, categoryID, businessCode },
                              { "content-type": "application/json" }
                            )
                            .then((res) => {
                              res.data === "done" && setProductName("");
                              res.data === "done" &&
                                setRefreshProducts((refresh) => !refresh);
                              res.data === "done" &&
                                setAlert("product has been added");
                              res.data !== "done" &&
                                setAlert("something went wrong");
                            })
                        : setAlert("add product name");
                    }}
                  >
                    add
                  </div>
                </div>
              </div>
            </div>
            <Accordion title={"colors"}>
              <Color
                categoryID={categoryID}
                colors={colors}
                setColors={setColors}
                businessCode={businessCode}
              />
            </Accordion>
            <Accordion title={"additional options"}>
              <ImgAndIcon />

              <div className="remove" onClick={() => setRemoveModal(true)}>
                <div className="trash">
                  <FaTrashAlt />
                </div>
                <div>remove category</div>
              </div>
            </Accordion>

            <ProductModal
              setRefreshProducts={setRefreshProducts}
              currentProduct={currentProduct}
              openModal={openModal}
              setOpenModal={setOpenModal}
              businessCode={businessCode}
              setAlert={setAlert}
            />
            <Alert alert={alert} setAlert={setAlert} />

            <ActionModal
              setRemoveModal={setRemoveModal}
              removeModal={removeModal}
              title={"remove category"}
              action={() =>
                axios
                  .put(
                    "/api/categories/remove",
                    { categoryID, businessCode },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    res.data === "done" && setCurrentCat("");
                    res.data === "done" && setRefreshCat((refresh) => !refresh);
                    res.data === "done" &&
                      setRefreshProducts((refresh) => !refresh);
                    res.data === "done"
                      ? setAlert("you'r all done")
                      : setAlert("something went wrong");
                    setRemoveModal(false);
                  })
              }
            />
          </>
        )}
      </div>

      <style jsx>{`
        .categoryContainer {
          padding-bottom: 5rem;
        }

        .categoryList {
          border-bottom: 1px solid ${styles.secondaryColor};
          overflow-x: hidden;
        }
        .products {
          padding-top: 0;
        }

        .addNewItem {
          ${styles.flexAligncenter}
          width:100%;
        }

        .addproduct-input {
          border: none;
          padding: 0.5rem;
          font-size: 1.1rem;
        }

        .addproduct {
          font-size: 1rem;
          cursor: pointer;
          color: ${styles.secondaryColor};
          background: white;
        }

        .product {
          ${styles.flexAligncenter}
          -webkit-box-pack:justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          border-bottom: 1px solid lightgrey;
          padding: 0.1rem 0.8rem;
          gap: 0.8rem;
          cursor: pointer;
        }
        .nameSection {
          text-align: left;
          flex: 1 1 100%;
        }
        .name {
          color: ${styles.secondaryColor};
          font-size: 1.2rem;
        }

        .productImg {
          width: 3rem;
          height: 3rem;
          ${styles.flexBothcenter}
        }

        .remove {
          color: ${styles.secondaryColor};
          padding: 0.8rem;
          cursor: pointer;
          ${styles.flexBothcenter}
          gap:.6rem
        }

        .trash {
          padding-top: 0.3rem;
        }

        .description {
          font-size: 0.9rem;
          line-height: 0.9rem;
          color: grey;
        }
        .productPartImg {
          width: 6rem;
          height: 6rem;
          border-radius: 0.6rem;
          ${styles.flexBothcenter}
          z-index:-1;
        }
      `}</style>
    </>
  );
}

export function ImgAndIcon() {
  return (
    <>
      <div className="imgIconContainer">
        <div className="categoryIcon">icon</div>
        <div className="categoryImage">category image</div>
      </div>
      <style jsx>{`
        .imgIconContainer {
          padding: 0.6rem 1rem;
          gap: 1rem;
          ${styles.flexColumn}
        }
        .categoryIcon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.3rem;
          ${styles.flexBothcenter};
          border: 1px solid ${styles.boxshadow};
          cursor: pointer;
        }
        .categoryImage {
          height: 9rem;
          max-width: 22rem;
          border-radius: 0.3rem;
          ${styles.flexBothcenter};
          border: 1px solid ${styles.boxshadow};
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
