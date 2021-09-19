import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import { dateSub } from "../../../util/dateChanger";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const { body } = req;

  if (method === "POST") {
    try {
      const token = req.cookies.jwt;
      if (!token) return res.end("noToken");
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.end("invalid");
        const user = await User.findById(decoded.id).exec();
        const number = body.split("*")[0];
        const code = body.split("*")[1];

        //////////////////////update///////////
        if (user.roles.includes("Manager")) {
          const customer = await User.findOne({ number }).exec();
          const coupon = customer.coupons.find(
            (coupon) => coupon.code === code
          );
          const validateDays = dateSub(coupon.date, coupon.validation);

          return validateDays < 0 || coupon.used
            ? res.end("notValid")
            : res.end("valid");
        }
        return res.end("invalid");
      });

      return res.end("done");
    } catch (err) {
      return res.end("invalid");
    }
  }
};
