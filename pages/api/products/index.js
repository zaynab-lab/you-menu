import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import Product from "@/models/product";
import jwt from "jsonwebtoken";
import Category from "@/models/category";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;
  const { body } = req;

  try {
    if (method === "GET") {
      const categories = await Category.find({
        businessCode: req.query.businessCode,
        deleted: false
      });
      const arrayofCategories = categories?.map((category) => category._id);
      const products = await Product.find({
        categoryID: { $in: arrayofCategories },
        deleted: false,
        appear: true
      });
      return res.status(200).end(JSON.stringify(products));
    } else {
      if (token) {
        const business = await Business.findOne({
          businessCode: body.businessCode || req.query.businessCode
        }).exec();
        business &&
          jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(200).end("invalid");
            const user = await User.findById(decoded.id).exec();
            if (
              user.number === business.ownerNumber ||
              user.promoCode === business.addedby
            ) {
              if (method === "POST") {
                const product = new Product({
                  name: body.productName,
                  categoryID: body.categoryID
                });
                product.save().catch((err) => console.log(err));
                return res.status(200).end("done");
              } else {
                return res.status(200).end("invalid");
              }
            } else {
              return res.status(200).end("invalid");
            }
          });
      }
    }
  } catch {
    return res.status(200).end("invalid");
  }
};
