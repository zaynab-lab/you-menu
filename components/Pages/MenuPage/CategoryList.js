import Image from "next/image";
import TextLoader from "@/components/Loaders/TextLoader";
import ProductList from "./ProductList.server";
import { styles } from "@/public/js/styles";

export default function CategoryList({
  categories,
  products,
  cartItems,
  business,
  firebaseLink,
  businessCode,
  setAlert,
  setFadeAlert,
  action,
  selectedCurrency
}) {
  return (
    <>
      <div>
        {categories?.map((category, i) => (
          <div key={i}>
            <h1
              id={category.name}
              className="title"
              style={{
                background: category?.colors?.tbg || styles.secondaryColor,
                color: category?.colors?.t || "white"
              }}
            >
              {category.name || <TextLoader />}
            </h1>
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
              currency={business?.currency}
              onlyTarget={business?.onlyTarget}
              defaultCurrency={business?.defaultCurrency}
              useExchange={business?.useExchange}
              exRate={business?.exRate}
              firebaseLink={firebaseLink}
              businessCode={businessCode}
              setAlert={setAlert}
              setFadeAlert={setFadeAlert}
              action={action}
              selectedCurrency={selectedCurrency}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .title {
          font-size: 2.2rem;
          padding: 0.2rem 1.2rem;
          scroll-margin-top: 3.5rem;
          font-weight: 500;
          text-align: left;
        }
      `}</style>
    </>
  );
}
