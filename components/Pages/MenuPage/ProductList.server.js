import { styles } from "@/public/js/styles";
import Image from "next/image";

export default function ProductList({
  category,
  products,
  defaultCurrency,
  currency,
  exRate,
  useExchange,
  onlyTarget,
  firebaseLink,
  businessCode,
  action,
  setAlert,
  setFadeAlert,
  selectedCurrency
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
                      {!useExchange
                        ? product.price + " " + defaultCurrency
                        : onlyTarget
                        ? Number((product.price * exRate).toFixed(2)) +
                          " " +
                          currency
                        : selectedCurrency
                        ? Number((product.price * exRate).toFixed(2)) +
                          " " +
                          currency
                        : product.price + " " + defaultCurrency}
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
                    {selectedCurrency
                      ? product.price + " " + defaultCurrency
                      : Number((product.price * exRate).toFixed(2)) +
                        " " +
                        currency}
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
          gap:1rem;
          padding: 0.3rem 0;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-flex-wrap;
          flex-wrap: wrap;
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
          cursor: pointer;
        }

        .productPartImg {
          border-radius: 0.5rem;
          overflow: hidden;
          width: 120px;
          height: 120px;
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
