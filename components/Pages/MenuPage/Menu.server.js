import Image from "next/image";
import TopBar from "./TopBar";
import { useEffect, useRef, useState } from "react";
import Line from "@/components/Line";
import { styles } from "@/public/js/styles";
import TextLoader from "@/components/Loaders/TextLoader";
import axios from "axios";
import dynamic from "next/dynamic";
import Alert from "@/components/Alert";
import FadeAlert from "./FadeAlert";
import Logo from "@/components/Logo";

const Cart = dynamic(() => import("./Cart"));

export default function Menu({ businessCode }) {
  const [currentCat, setCurrentCat] = useState("");
  const [business, setBusiness] = useState({ currency: "", exRate: "1" });
  const sectionsRefs = useRef({});
  const [categories, setCategories] = useState([0, 0, 0]);
  const [products, setProducts] = useState([0, 0]);
  const [alert, setAlert] = useState("");
  const [fadeAlert, setFadeAlert] = useState("");
  const [cartItems, setCartItems] = useState({});

  const firebaseLink =
    "https://firebasestorage.googleapis.com/v0/b/za-menu-images.appspot.com/o/";

  const action = (id, add) => {
    // products.map(
    //   (product) =>
    //     product._id === id &&
    //     setCartItems([...cartItems, { id: id, quantity: 1 }])
    // );
  };

  useEffect(() => {
    businessCode &&
      axios
        .get(`/api/categories?businessCode=${businessCode}`)
        .then((res) => Array.isArray(res.data) && setCategories(res.data));

    businessCode &&
      axios
        .get(`/api/products?businessCode=${businessCode}`)
        .then((res) => Array.isArray(res.data) && setProducts(res.data));

    businessCode &&
      axios
        .get(`/api/business/getBusinessInfo?businessCode=${businessCode}`)
        .then((res) => {
          res?.data.brand &&
            setBusiness((business) => Object({ ...business, ...res.data }));
        });
  }, [businessCode]);
  useEffect(() => {
    if (categories) {
      const sections = document.querySelectorAll(".title");
      categories.map(
        (category, i) =>
          (sectionsRefs.current = {
            ...sectionsRefs.current,
            [category.name]: sections[i]
          })
      );
      setCurrentCat(categories?.[0]?.name);
    }
  }, [categories]);

  return (
    <>
      <Line />
      <div className="categoriesContainer">
        <div className="brand">
          {business?.brand?.imgLink ? (
            <Logo
              businessCode={business?.businessCode}
              hasImg={business?.brand?.hasImg}
              imgLink={business?.brand?.imgLink}
            />
          ) : (
            <div></div>
          )}

          <div>{business?.brand?.name}</div>
        </div>
        <TopBar
          sectionsRefs={sectionsRefs}
          categories={categories}
          currentCat={currentCat}
          setCurrentCat={setCurrentCat}
        />
        {categories?.map((category, i) => (
          <div key={i}>
            <div
              id={category.name}
              className="title"
              style={{
                background: category?.colors?.tbg || "white",
                color: category?.colors?.t || styles.secondaryColor
              }}
            >
              {category.name || <TextLoader />}
            </div>
            <div
              style={{
                background: category?.colors?.bbg || "white",
                textAlign: "center"
              }}
            >
              {category.image && (
                <Image
                  height="300"
                  width="300"
                  src={`/img/products/${category.image}.png`}
                  alt={category.name}
                />
              )}
            </div>
            <ProductList
              category={category}
              products={products}
              cartItems={cartItems}
              currency={business.currency}
              exRate={business.exRate}
              firebaseLink={firebaseLink}
              businessCode={businessCode}
              setAlert={setAlert}
              setFadeAlert={setFadeAlert}
              action={action}
            />
          </div>
        ))}
      </div>
      <Alert setAlert={setAlert} alert={alert} />
      <FadeAlert fadeAlert={fadeAlert} setFadeAlert={setFadeAlert} />
      <div className="cartContainer">
        <Cart
          currency={business.currency}
          exRate={business.exRate}
          setCartItems={setCartItems}
        />
      </div>

      <div href="https://www.za-apps.com">
        <div className="watermark">Made with ❤ for You</div>
      </div>

      <style jsx>{`
        .categoriesContainer {
          min-height: 100vh;
        }
        .brand {
          max-width: 100%;
          padding: 0.8rem 1rem;
          ${styles.flexBothcenter}
          font-size:2.6rem;
          color: ${business?.color || "gray"};
          background: ${business?.background || "#fefefe"};
          gap: 10vw;
          overflow: hidden;
          line-height: 2.3rem;
        }

        .cartContainer {
          ${styles.flexJustifycenter}
        }
        .title {
          color: black;
          font-size: 2.6rem;
          padding: 0.2rem 0.8rem;
          scroll-margin-top: 3rem;
        }

        .watermark {
          font-size: 0.8rem;
          text-align: center;
          padding: 0.5rem;
          cursor: pointer;
          position: sticky;
          bottom: 0;
          color: white;
          background: gray;
        }
      `}</style>
    </>
  );
}

export function ProductList({
  category,
  products,
  currency,
  exRate,
  firebaseLink,
  businessCode,
  action,
  setAlert,
  setFadeAlert
}) {
  return (
    <>
      <div
        className="productList"
        style={{
          background: category?.colors?.bbg || "white"
        }}
      >
        {products
          ?.filter((product) => product.categoryID === category._id)
          .map((product, j) => (
            <div
              key={j}
              className="product"
              onClick={() => {
                product.exist && action(product._id, true);
                product.exist
                  ? setFadeAlert("+1")
                  : setAlert("the product is out of stock");
              }}
            >
              <div className="productPart">
                <div className="productName">{product.name}</div>
                <div className="description">{product.description}</div>
                {product.hasImg &&
                  product.price &&
                  (product.exist ? (
                    <div className="price">
                      {currency === "$"
                        ? product.price
                        : Number((product.price * exRate).toFixed(2))}
                      {currency}
                    </div>
                  ) : (
                    <div className="out">out of stock</div>
                  ))}
              </div>

              {product.hasImg ? (
                <div className="productPartImg">
                  <Image
                    height="120"
                    width="120"
                    loader={({ src, width }) =>
                      `${
                        firebaseLink +
                        src +
                        `%2F${
                          product?._id + product?.imgLink
                        }.png?alt=media&tr=w-${width}`
                      }`
                    }
                    src={businessCode}
                    alt={product.name}
                  />
                </div>
              ) : (
                product.price &&
                (product.exist ? (
                  <div className="price">
                    {currency === "$"
                      ? product.price
                      : Number((product.price * exRate).toFixed(2))}
                    {currency}
                  </div>
                ) : (
                  <div className="out">out of stock</div>
                ))
              )}
            </div>
          ))}
      </div>
      <style jsx>{`
        .productList {
          width: 100vw;
          ${styles.flexBothcenter}
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-flex-wrap;
          flex-wrap: wrap;
          gap:1rem;
          padding:.3rem 0;
          }
          
        .description {
          color: grey;
          font-size: 0.9rem;
          width: 100%;
          line-height: 0.9rem;
        }

        .productName {
          font-size: 1.4rem;
          padding: 0.3rem 0;
        }

        .price {
          padding: 0.2rem 0;
          font-size: 1rem;
        }

        .product {
          padding: 0.8rem;
          ${styles.flexAligncenter}
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          width: 18rem;
          -webkit-box-flex: 1;
          -ms-flex: 1 0 18rem;
          flex: 1 0 18rem;
          padding: 0 1rem;
          gap: 1rem;
          cursor:pointer;
        }
        .productPartImg {
          border-radius:.5rem;
          overflow:hidden;
          width:120px;
          height:120px;
        }
        .productPart {
          flex: 1 1 65%;
        }

        .out {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
