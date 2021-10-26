import { FaTrashAlt } from "react-icons/fa";
import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import {
  ProductDescriptionLoader,
  ProductNameLoader,
  ProductPriceLoader
} from "@/components/Loaders/TextLoader";
import Modal from "@/components/Modal";
import axios from "axios";
import Color from "./Color";
import Alert from "@/components/Alert";

export default function Category({ category, currentCat, businessCode }) {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const categoryID = category._id;
  const [refresh, setRefresh] = useState(false);
  const [alert, setAlert] = useState("");
  const [currentProduct, setCurrentProduct] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    categoryID !== undefined &&
      axios
        .get(`/api/products/${categoryID}/?businessCode=${businessCode}`)
        .then((res) => {
          Array.isArray(res.data) && setProducts(res.data);
        });
  }, [categoryID, businessCode, refresh]);

  useEffect(() => {
    setProducts([0, 0]);
  }, [categoryID]);

  return (
    <>
      {currentCat && (
        <>
          <div className="categoryList">
            <div className="products">
              {products?.map((product, i) => (
                <div
                  key={i}
                  className="product"
                  onClick={() => {
                    setCurrentProduct(product);
                    setOpenModal(true);
                  }}
                >
                  <div>
                    <div className="namePrice">
                      <div className="name">
                        {product.name || <ProductNameLoader />}
                      </div>
                      {typeof product.price === "number" && (
                        <div>
                          {typeof product.price === "number" ? (
                            product.price
                          ) : (
                            <ProductPriceLoader />
                          )}
                          $
                        </div>
                      )}{" "}
                    </div>

                    {product.description && (
                      <div className="description">
                        {product.description || <ProductDescriptionLoader />}
                      </div>
                    )}
                  </div>

                  <div className="productImg">
                    {product.link && (
                      <img
                        className="productImg"
                        alt={product.name}
                        src={product.link}
                      />
                    )}
                  </div>
                </div>
              ))}

              <div className="addNewItem">
                <input
                  value={productName}
                  className="addproduct-input"
                  placeholder="new product"
                  onChange={(e) => setProductName(e.target.value)}
                />

                <div
                  className="addproduct"
                  onClick={() => {
                    setProducts([...products, 0]);
                    axios
                      .post(
                        "/api/products",
                        { productName, categoryID, businessCode },
                        { "content-type": "application/json" }
                      )
                      .then((res) => {
                        res.data === "done" && setProductName("");
                        res.data === "done" && setRefresh(!refresh);
                        res.data === "done" &&
                          setAlert("product has been added");
                      });
                  }}
                >
                  add
                </div>
              </div>
            </div>
          </div>

          <Color />
          <Modal
            refresh={refresh}
            setRefresh={setRefresh}
            currentProduct={currentProduct}
            openModal={openModal}
            setOpenModal={setOpenModal}
            businessCode={businessCode}
          />
          <Alert alert={alert} setAlert={setAlert} />
          <div className="remove">
            <div className="trash">
              <FaTrashAlt />
            </div>
            <div>remove category</div>
          </div>
        </>
      )}

      <style jsx>{`
        .categoryList {
          border-bottom: 1px solid ${styles.secondaryColor};
          overflow-x: hidden;
        }
        .products {
          padding-top: 0;
        }

        .addNewItem {
          ${styles.flexAligncenter}
        }

        .addproduct-input {
          border: none;
          padding: 0.5rem;
          font-size: 1.1rem;
        }

        .addproduct {
          font-size: 1rem;
          transform: translateX(-2rem);
          cursor: pointer;
          color: ${styles.secondaryColor};
        }

        .product {
          ${styles.flexAligncenter}
          -webkit-box-pack:justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          border-bottom: 1px solid lightgrey;
          padding: 0.2rem 1rem;
        }

        .name {
          font-size: 1.2rem;
        }

        .namePrice {
          ${styles.flexAligncenter}
          gap:.4rem;
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
          padding-bottom: 5rem;
          cursor: pointer;
          ${styles.flexBothcenter}
          gap:.6rem
        }

        .trash {
          padding-top: 0.3rem;
        }

        .description {
          color: grey;
        }
      `}</style>
    </>
  );
}
