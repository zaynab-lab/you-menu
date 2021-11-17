import dbConnection from "@/util/dbConnection";
import Product from "@/models/product";
import Category from "@/models/category";
import User from "@/models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async function (req, res) {
  const {
    method,
    query: { value }
  } = req;

  const token = req.cookies.jwt;
  if (!token) return res.status(200).end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(200).end("invalid");
    const user = await User.findById(decoded.id).exec();
    if (user.role === "GM" && method === "GET") {
      switch (value) {
        case "products":
          const products = await Product.find({ deleted: true }).exec();
          return res.status(200).end(JSON.stringify(products));
        case "categoryProducts":
          const pcategories = await Category.find({ deleted: true }).exec();
          const ids = await pcategories.map((p) => p._id);
          const productList = await Product.find({
            categoryID: { $in: ids }
          });
          return res.status(200).end(JSON.stringify(productList));

        case "categories":
          const categories = await Category.find({ deleted: true }).exec();
          return res.status(200).end(JSON.stringify(categories));

        default:
          return res.status(200).end("done");
      }
    } else if (user.role === "GM" && method === "DELETE") {
      switch (value) {
        case "products":
          Product.deleteMany({ deleted: true }).exec();
          return res.status(200).end("done");
        case "categories":
          const pcategories = await Category.find({ deleted: true }).exec();
          const ids = await pcategories.map((p) => p._id);
          await Product.deleteMany({
            categoryID: { $in: ids }
          }).exec();
          await Category.deleteMany({ deleted: true }).exec();
          return res.status(200).end("done");
        default:
          return res.status(200).end("done");
      }
    } else {
      return res.status(200).end("invalid");
    }
  });
}
