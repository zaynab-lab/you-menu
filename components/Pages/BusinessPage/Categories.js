import { FaImage, FaTrashAlt } from "react-icons/fa";
import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import TextLoader, {
  ProductDescriptionLoader,
  ProductNameLoader,
  ProductPriceLoader
} from "@/components/Loaders/TextLoader";
import axios from "axios";

export default function Categories({ categories, businessCode }) {
  const [currentCat, setCurrentCat] = useState(categories?.[0]?.name);
  const [category, setCategory] = useState(categories?.[0]);
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
            {category.productsCount && (
              <div className="count">{category.productsCount}</div>
            )}
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

export function Category({ category, currentCat, businessCode }) {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const categoryID = category._id;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/product/${categoryID}/?businessCode=${businessCode}`)
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
                <div key={i} className="product">
                  <div onClick={() => alert(categoryID)}>
                    <div className="namePrice">
                      <div className="name">
                        {product.name || <ProductNameLoader />}
                      </div>
                      {product.price && (
                        <div>{product.price || <ProductPriceLoader />}$</div>
                      )}{" "}
                    </div>
                    {product.description && (
                      <div className="description">
                        {product.description || <ProductDescriptionLoader />}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="product-img">
                      <FaImage />
                    </div>
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
                        "/api/product",
                        { productName, categoryID, businessCode },
                        { "content-type": "application/json" }
                      )
                      .then((res) => {
                        res.data === "done" && setProductName("");
                        res.data === "done" && setRefresh(!refresh);
                      });
                  }}
                >
                  add
                </div>
              </div>
            </div>
          </div>
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
          z-index: 5;
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
        .product-img {
          font-size: 3rem;
          ${styles.flexBothcenter}
          color: grey;
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
