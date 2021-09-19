import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import cookie from "cookie";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body } = req;
    const user = await User.findOne({ number: body.phoneNumber }).exec();
    const d = Date.now();
    if (Math.ceil((d - user.date) / 60000) > 5) {
      return res.end("انتهت صلاحية رمز المصادقة");
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    await User.findByIdAndUpdate(user._id, { jwt: token }, (err) =>
      console.log(err)
    );

    if (user.otp === body.oTP) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: "864000",
          path: "/"
        })
      );

      // if (user.name) {
      //   return res.status(200).end("dataExist");
      // }

      return res.status(200).end("done");
    } else return res.status(200).end("رمز المصادقة غير صحيح");
  }

  return res.end("هناك خطأ في النظام");
};
