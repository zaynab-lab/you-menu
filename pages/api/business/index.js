import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import Business from "@/models/business";

dbConnection();

export default async function (req, res) {
  const { method } = req;
  const token = req.cookies.jwt;
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
    } else {
      return res.status(200).end("invalid");
    }
  } catch {
    return res.status(200).end("invalid");
  }
}
