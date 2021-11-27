import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import Order from "@/models/order";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();

      if (user && method === "GET") {
        const orders = await Order.find({
          ownerID: user._id
        }).exec();
        return res.status(200).end(JSON.stringify(orders));
      }
    });
  }
};
