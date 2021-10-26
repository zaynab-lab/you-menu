import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import Business from "@/models/business";

dbConnection();

export default async function Businesses(req, res) {
  const { method } = req;
  if (method === "GET") {
    const token = req.cookies.jwt;
    if (!token) return res.status(200).end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user) {
        const business = await Business.findOne({
          ownerNumber: user.number
        }).exec();
        return res.status(200).end(business.businessCode);
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
}
