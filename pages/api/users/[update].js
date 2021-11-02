import dbConnection from "@/util/dbConnection";
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
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user && method === "PUT") {
        switch (update) {
          case "name":
            User.findByIdAndUpdate(user._id, { name: body.name }, (err) =>
              console.log(err)
            ).exec();
            return res.status(200).end("done");
          default:
            return res.status(200).end("done");
        }
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
