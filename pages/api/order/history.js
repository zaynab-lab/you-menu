import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
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
      const business = await Business.findOne({
        ownerNumber: user.number
      }).exec();

      if (
        (user.number === business.ownerNumber || user.role === "GM") &&
        method === "GET"
      ) {
        const orders = await Order.find({
          businessID: business._id,
          currentStatus: "history"
        }).exec();

        return res.status(200).end(JSON.stringify(orders));
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
