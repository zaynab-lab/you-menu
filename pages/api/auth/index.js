import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import Role from "@/models/role";

dbConnection();

export default async function Auth(req, res) {
  const { method } = req;

  if (method === "GET") {
    const token = req.cookies.jwt;
    if (!token) return res.status(200).end("noToken");
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user) {
        User.findByIdAndUpdate(
          user._id,
          { workingtimes: user.workingtimes + 1 },
          (err) => console.log(err)
        );
        const role = await Role.findOne({ role: user.role }).exec();

        return res.status(200).end(
          JSON.stringify({
            name: user.name,
            number: user.number,
            permissions: role?.permissions
          })
        );
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
}
