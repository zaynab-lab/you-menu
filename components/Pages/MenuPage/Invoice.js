import { styles } from "@/public/js/styles";
import Image from "next/image";

export default function Invoice({ business, products, cartItems }) {
  const firebaseLink =
    "https://firebasestorage.googleapis.com/v0/b/za-menu-images.appspot.com/o/";

  return (
    <>
      <div className="productList">
        {products
          ?.filter((product) => cartItems[product._id] !== undefined)
          .map((product, i) => (
            <div key={i} className="product">
              {product.hasImg ? (
                <div className="productPartImg">
                  <Image
                    height="60"
                    width="60"
                    loader={({ src, width }) =>
                      `${
                        firebaseLink +
                        src +
                        `%2F${
                          product?._id + product?.imgLink
                        }.png?alt=media&tr=w-${width}`
                      }`
                    }
                    src={business?.businessCode}
                    alt={product.name}
                  />
                </div>
              ) : (
                <div>product</div>
              )}
              <div>x{cartItems[product._id]}</div>
              <div>{product.name}</div>
            </div>
          ))}
      </div>
      <style jsx>{`
        .productList {
          border: solid ${styles.secondaryColor};
          border-width: 1px 0px;
          ${styles.flexAligncenter}
          gap:1.2rem;
          overflow: auto;
        }
        .product {
          ${styles.flexColumn};
          ${styles.flexAligncenter}
          justify-content:flex-end;

          white-space: nowrap;
        }
      `}</style>
    </>
  );
}
