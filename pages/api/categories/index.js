import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import Category from "@/models/category";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;
  const { body } = req;

  if (method === "GET" && req.query.businessCode !== undefined) {
    const categories = await Category.find({
      businessCode: req.query.businessCode,
      deleted: false
    });
    res.status(200).end(JSON.stringify(categories));
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
              const category = new Category({
                name: body.category,
                businessCode: body.businessCode
              });
              category.save().catch((err) => console.log(err));
              return res.status(200).end("done");
            } else {
              return res.status(200).end("invalid");
            }
          } else {
            return res.status(200).end("invalid");
          }
        });
    } else {
      return res.status(200).end("invalid");
    }
  }
};
