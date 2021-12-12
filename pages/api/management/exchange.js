import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import Exchange from "@/models/exchange";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method, cookies, body } = req;
  const token = cookies.jwt;

  if (method === "GET") {
    const exchanges = await Exchange.find({}).exec();
    return res.status(200).end(JSON.stringify(exchanges));
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");

      const user = await User.findById(decoded.id).exec();

      if (user.role === "GM") {
        switch (method) {
          case "POST":
            const exchange = new Exchange({
              base: body.base,
              target: body.target,
              rate: body.rate
            });
            await exchange.save().catch((err) => console.log(err));
            return res.status(200).end("done");
          case "PUT":
            await Exchange.findByIdAndUpdate(
              body.exchangeID,
              { rate: body.rate },
              (err) => console.log(err)
            ).exec();
            return res.status(200).end("done");

          default:
            return res.status(200).end("done");
        }
      } else {
        return res.status(200).end("invalid");
      }
    });
  }
};
