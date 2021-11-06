import Image from "next/image";
import TopBar from "./TopBar";
import { useEffect, useRef, useState } from "react";
import Line from "./Line";
import { styles } from "@/public/js/styles";
import TextLoader from "./Loaders/TextLoader";
import axios from "axios";

export default function Menu({ categories, products, businessCode }) {
  const [currentCat, setCurrentCat] = useState("");
  const [currency, setCurrency] = useState("");
  const [exRate, setExRate] = useState(1);
  const sectionsRefs = useRef({});
  const firebaseLink =
    "https://firebasestorage.googleapis.com/v0/b/za-menu-images.appspot.com/o/";

  useEffect(
    () =>
      businessCode !== undefined &&
      axios
        .get(`/api/business/currency?businessCode=${businessCode}`)
        .then((res) => {
          res?.data?.currency && setCurrency(res.data.currency);
          res?.data?.exRate && setExRate(res.data.exRate);
        }),
    [businessCode]
  );
  useEffect(() => {
    setCurrentCat(categories?.[0]?.name);
  }, [categories]);

  return (
    <>
      <Line />
      <TopBar
        sectionsRefs={sectionsRefs}
        categories={categories}
        currentCat={currentCat}
        setCurrentCat={setCurrentCat}
      />
      <div>
        {categories?.map((category, i) => (
          <div key={i}>
            <div
              ref={(el) =>
                (sectionsRefs.current = {
                  ...sectionsRefs.current,
                  [category.name]: el
                })
              }
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
                  height="200"
                  width="200"
                  src={`/img/products/${category.image}.png`}
                  alt={category.name}
                />
              )}
            </div>

            <div
              className="productList"
              style={{
                background: category?.colors?.bbg || "white"
              }}
            >
              {products
                ?.filter((product) => product.categoryID === category._id)
                .map((product, j) => (
                  <div key={j} className="product">
                    <div className="productPart">
                      <div className="productName">{product.name}</div>
                      <div className="description">{product.description}</div>
                      {product.hasImg && product.price && (
                        <div className="price">
                          {currency === "$"
                            ? product.price
                            : product.price * exRate}
                          {+" " + currency}
                        </div>
                      )}
                    </div>

                    {product.hasImg ? (
                      <div className="productPartImg">
                        <img
                          height="80"
                          width="80"
                          src={`${
                            firebaseLink +
                            businessCode +
                            `%2F${
                              product?._id + product?.imgLink
                            }.png?alt=media`
                          }`}
                          alt={product.name}
                        />
                      </div>
                    ) : (
                      product.price && (
                        <div className="price">
                          {currency === "$"
                            ? product.price
                            : product.price * exRate}
                          {+" " + currency}
                        </div>
                      )
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* <Link href="https://www.za-apps.com">
        <div className="watermark">Made with ❤ by za-apps.com</div>
      </Link> */}
      <style jsx>{`
      .productList {
        width: 100vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-flex-wrap;
        flex-wrap: wrap;
        gap:1rem;
      }
      .title {
        color:black;
        font-size: 2.6rem;
        padding: 0.2rem 0.8rem ;
        scroll-margin-top:3rem;
      }
      
      .description {
        color: grey;
        font-size: 0.8em;
        width:100%;
      }
      .productName {
        font-size: 1.2em;
        padding:0.3rem 0;
      }
      .price{
        padding:.2rem 0;
        color: grey;
        font-size: 1rem;

      }
      .product {
        padding: 0.8rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width:18rem;
        -webkit-box-flex:1;
        -ms-flex:1 0 18rem;
        flex:1 0 18rem;
        padding:0 1rem;
        gap:1rem;
      }
      .productPart {
        flex: 1 1 65%;
      }
      .productPartImg {
      }
      .watermark{
        font-size:.8em;
        text-align:center;
        padding:.5rem;
        cursor:pointer;
      }
      `}</style>
    </>
  );
}
