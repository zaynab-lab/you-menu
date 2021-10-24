import Image from "next/image";
import TopBar from "./TopBar";
import Link from "next/link";
import { useState } from "react";
import Line from "./Line";
import { styles } from "@/public/js/styles";

export default function Menu({ categories, products }) {
  const [state, setState] = useState("");

  return (
    <>
      <Line />
      <TopBar categories={categories} state={state} setState={setState} />
      <div>
        {categories?.map((category, i) => (
          <div key={i}>
            <div
              id={category.name}
              className="title"
              style={{
                background: styles.secondaryColor || category.color.tbg,
                color: "white" || category.color.ht
              }}
            >
              {category.name}
            </div>
            <div
              style={{
                background: "#ffefed" || category.color.bbg,
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
                background: "#ffefed" || category.color.bbg
              }}
            >
              {products
                ?.filter((product) => product.categoryID === category._id)
                .map((product, j) => (
                  <div key={j} className="product">
                    <div className="productPart">
                      <div className="productName">{product.name}</div>
                      <div className="description">{product.description}</div>
                      {product.hasImg && (
                        <div className="price">${product.price}</div>
                      )}
                    </div>

                    {product.hasImg ? (
                      <div className="productPartImg">
                        <Image
                          height="260"
                          width="260"
                          src={`/img/products/${product.image}.png`}
                          alt={product.name}
                        />
                      </div>
                    ) : (
                      <div className="price">${product.price}</div>
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
      }
      .title:target:before {
        content: "";
        display: block;
        margin-top: 3.4rem;
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
        flex: 1 1 35%;
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
