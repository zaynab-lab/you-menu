import TopBar from "./TopBar";
import { useEffect, useRef, useState } from "react";
import Line from "@/components/Line";
import { styles } from "@/public/js/styles";
import axios from "axios";
import dynamic from "next/dynamic";
import Alert from "@/components/Alert";
import FadeAlert from "./FadeAlert";
import BrandBar from "./BrandBar";
import CategoryList from "./CategoryList";

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
        <BrandBar business={business} />
        <TopBar
          sectionsRefs={sectionsRefs}
          categories={categories}
          currentCat={currentCat}
          setCurrentCat={setCurrentCat}
        />
        <CategoryList
          categories={categories}
          products={products}
          cartItems={cartItems}
          business={business}
          firebaseLink={firebaseLink}
          businessCode={businessCode}
          setAlert={setAlert}
          setFadeAlert={setFadeAlert}
          action={action}
        />
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
        .cartContainer {
          ${styles.flexJustifycenter}
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
