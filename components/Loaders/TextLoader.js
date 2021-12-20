import ContentLoader from "react-content-loader";

const TextLoader = () => (
  <ContentLoader
    uniqueKey="text"
    speed={2}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 100 10"
    backgroundColor="#f3f3f300"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="3" rx="0" ry="0" width="150" height="10" />
  </ContentLoader>
);

export default TextLoader;

export const ImageLoader = () => (
  <ContentLoader
    uniqueKey="productdescription"
    speed={2}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 160 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" width="170" height="170" />
  </ContentLoader>
);

export const BrandLoader = () => (
  <ContentLoader
    uniqueKey="productdescription"
    speed={2}
    width={"80%"}
    height={"100%"}
    viewBox="-30 0 120 10"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" width="80" height="10" />
  </ContentLoader>
);

export const ProductDescriptionLoader = () => (
  <ContentLoader
    uniqueKey="productdescription"
    speed={2}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 200 15"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" width="170" height="15" />
  </ContentLoader>
);

export const ProductNameLoader = () => (
  <ContentLoader
    uniqueKey="productName"
    speed={2}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 100 10"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="2" ry="2" width="80" height="10" />
  </ContentLoader>
);

export const ProductPriceLoader = () => (
  <ContentLoader
    uniqueKey="productPrice"
    speed={2}
    width={"15%"}
    height={"15%"}
    viewBox="0 0 15 10"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="2" ry="2" width="15" height="10" />
  </ContentLoader>
);
