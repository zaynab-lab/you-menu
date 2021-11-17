import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListOfUsers() {
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products/getDeletedProducts?value=products")
      .then((res) => Array.isArray(res.data) && setProducts(res.data));
    axios
      .get("/api/products/getDeletedProducts?value=categoryProducts")
      .then((res) => Array.isArray(res.data) && setCategoryProducts(res.data));
    axios
      .get("/api/products/getDeletedProducts?value=categories")
      .then((res) => Array.isArray(res.data) && setCategories(res.data));
  }, []);
  return (
    <>
      <div className="DeletedContainer">
        <div className="title">
          <div>products</div>
          <div
            onClick={() =>
              axios
                .delete("/api/products/getDeletedProducts?value=products")
                .then((res) => res.data === "done" && setRefresh(!refresh))
            }
            className="remove"
          >
            removeAll
          </div>
        </div>
        {products?.map((product, i) => (
          <div key={i}>{product.name}</div>
        ))}
        <div className="title">
          <div>categories</div>
          <div
            onClick={() =>
              axios
                .delete("/api/products/getDeletedProducts?value=categories")
                .then((res) => res.data === "done" && setRefresh(!refresh))
            }
            className="remove"
          >
            removeAll
          </div>
        </div>
        {categories?.map((product, i) => (
          <div key={i}>{product.name}</div>
        ))}
        <div className="title">categories products</div>

        {categoryProducts?.map((product, i) => (
          <div key={i}>{product.name}</div>
        ))}
      </div>

      <style jsx>{`
        .DeletedContainer {
          padding: 1rem;
        }
        .title {
          text-algin: center;
          font-size: 1.6rem;
          color: ${styles.secondaryColor};
          ${styles.flexAligncenter}
          justify-content:space-between;
        }
        .remove {
          font-size: 1rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
