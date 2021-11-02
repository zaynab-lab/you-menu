import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import Category from "@/models/category";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { body, method, cookies } = req;
  const token = cookies.jwt;
  const {
    query: { update }
  } = req;
  if (method === "GET" && update === "colors") {
    const category = await Category.findById(req.query.categoryID).exec();
    return res.status(200).end(JSON.stringify(category?.colors));
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
            if (method === "PUT") {
              switch (update) {
                case "color":
                  Category.findByIdAndUpdate(
                    body.categoryID,
                    { colors: body.colors },
                    (err) => console.log(err)
                  ).exec();
                  return res.status(200).end("done");
                case "theme":
                  Category.updateMany(
                    { businessCode: body.businessCode },
                    { colors: body.colors },
                    { multi: true },
                    (err) => console.log(err)
                  );
                  return res.status(200).end("done");
                case "name":
                  Category.findByIdAndUpdate(
                    body.categoryID,
                    { name: body.name },
                    (err) => console.log(err)
                  ).exec();
                  return res.status(200).end("done");
                case "remove":
                  Category.findByIdAndUpdate(
                    body.categoryID,
                    { deleted: true },
                    (err) => console.log(err)
                  ).exec();
                  return res.status(200).end("done");

                default:
                  return res.status(200).end("done");
              }
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
