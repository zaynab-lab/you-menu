import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { body, method, cookies } = req;
  const token = cookies.jwt;

  const {
    query: { update }
  } = req;

  if (token) {
    const business = await Business.findOne({
      businessCode: body.businessCode
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
              case "name":
                Business.findByIdAndUpdate(
                  business._id,
                  { "brand.name": body.name },
                  (err) => console.log(err)
                ).exec();
                return res.status(200).end("done");
              case "businessType":
                Business.findByIdAndUpdate(
                  business._id,
                  { businessType: body.businessType },
                  (err) => console.log(err)
                ).exec();
                return res.status(200).end("done");
              case "exRate":
                Business.findByIdAndUpdate(
                  business._id,
                  { exRate: body.exRate },
                  (err) => console.log(err)
                ).exec();
                return res.status(200).end("done");
              case "currenc":
                Business.findByIdAndUpdate(
                  business._id,
                  { currency: body.currenc },
                  (err) => console.log(err)
                ).exec();
                return res.status(200).end("done");
              case "content":
                Business.findByIdAndUpdate(
                  business._id,
                  { "address.content": body.content },
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
};
