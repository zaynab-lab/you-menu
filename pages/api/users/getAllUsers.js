import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async function (req, res) {
  const { method } = req;
  if (method === "GET") {
    const token = req.cookies.jwt;
    if (!token) return res.status(200).end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user.role === "GM") {
        const users = await User.find({}).exec();
        return res.status(200).end(JSON.stringify(users));
      } else {
        return res.status(200).end("invalid");
      }
    });
  }
}
