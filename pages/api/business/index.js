import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import Business from "@/models/business";

dbConnection();

export default async function Businesses(req, res) {
  const { method } = req;
  const token = req.cookies.jwt;
  const { body } = req;
  try {
    if (method === "GET") {
      if (!token) return res.status(200).end("noToken");
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(200).end("invalid");
        const user = await User.findById(decoded.id).exec();
        if (user) {
          if (req.query.businessCode) {
            const business = await Business.findOne({
              businessCode: req.query.businessCode
            }).exec();
            return res.status(200).end(JSON.stringify(business));
          } else {
            const business = await Business.findOne({
              ownerNumber: user.number
            }).exec();
            return res.status(200).end(JSON.stringify(business));
          }
        } else {
          return res.status(200).end("invalid");
        }
      });
    } else if (token && method === "PUT") {
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
            Business.findByIdAndUpdate(
              business._id,
              {
                brand: { name: body?.state?.brand?.name },
                businessType: body?.state?.businessType,
                address: { content: body?.state?.address?.content },
                exRate: body?.state?.exRate,
                currency: body?.state?.currency
              },
              (err) => console.log(err)
            );
            return res.status(200).end("done");
          }
        });
    } else {
      return res.status(200).end("invalid");
    }
  } catch {
    return res.status(200).end("invalid");
  }
}
