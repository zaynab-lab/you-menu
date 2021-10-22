import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import Product from "@/models/product";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;
  const { body } = req;

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
          switch (method) {
            case "POST":
              const product = new Product({
                name: body.productName,
                categoryID: body.categoryID
              });
              product.save().catch((err) => console.log(err));
              res.status(200).end("done");
              break;
            default:
              res.status(200).end("invalid");
          }
        } else {
          return res.status(200).end("invalid");
        }
      });
  } else {
    res.status(200).end("invalid");
  }
};
