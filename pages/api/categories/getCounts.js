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
    const business = await Business.findOne({
      businessCode: req.query.businessCode
    }).exec();
    business &&
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(200).end("invalid");
        const user = await User.findById(decoded.id).exec();
        if (
          user.number === business.ownerNumber ||
          user.promoCode === business.addedby ||
          user.role === "GM"
        ) {
          const categories = await Category.find({
            businessCode: business.businessCode
          }).exec();
          const Ids = await categories.map((category) => category.id);
          const products = await Product.find({
            categoryID: { $in: Ids }
          }).exec();
          return res.status(200).end(
            JSON.stringify({
              products: products.length,
              categories: categories.length
            })
          );
        } else {
          return res.status(200).end("invalid");
        }
      });
  } else {
    return res.status(200).end("invalid");
  }
};
