import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import Category from "@/models/category";
import Product from "@/models/product";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;

  const token = cookies.jwt;

  if (token && method === "GET") {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();

      if (user.role === "GM") {
        const businesses = await Business.find().exec();

        businesses.map(async (business) => {
          const categories = await Category.find({
            businessCode: business.businessCode
          }).exec();
          const Ids = await categories.map((category) => category.id);
          const products = await Product.find({
            categoryID: { $in: Ids }
          }).exec();

          Business.findByIdAndUpdate(
            business._id,
            {
              products: products.length,
              categories: Ids.length
            },
            (err) => console.log(err)
          ).exec();
        });
        return res.status(200).end("done");
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
