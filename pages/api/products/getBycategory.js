import dbConnection from "@/util/dbConnection";
import Product from "@/models/product";

dbConnection();

export default async (req, res) => {
  const {
    method,
    query: { categoryID }
  } = req;

  if (method === "GET") {
    const products = await Product.find({
      categoryID: categoryID,
      deleted: false
    });
    return res.status(200).end(JSON.stringify(products));
  }
};
