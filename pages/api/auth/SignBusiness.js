import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import { codeGenerator } from "@/util/codeGenerator";
import User from "@/models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;

  try {
    if (method === "POST") {
      const { body } = req;
      const businessExist = await Business.findOne({
        ownerNumber: body.phoneNumber
      }).exec();
      if (businessExist) {
        return res.status(200).end("your all done");
      } else {
        const code = codeGenerator();
        if (token) {
          jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(200).end("invalid");
            const user = await User.findById(decoded.id).exec();
            if (user) {
              const business = new Business({
                ownerNumber: body.phoneNumber,
                ccode: body.ccode,
                businessCode: code,
                addedby: user.promoCode
              });
              business.save().catch((err) => console.log(err));
            } else {
              return res.status(200).end("invalid");
            }
          });
        } else {
          const business = new Business({
            ownerNumber: body.phoneNumber,
            businessCode: code
          });
          business.save().catch((err) => console.log(err));

          await User.findOneAndUpdate(
            { number: body.phoneNumber },
            { role: "BusinessOwner" },
            { returnOriginal: false },
            (err) => console.log(err)
          );
        }

        return res.status(200).end("it's on the way wait for it");
      }
    } else return res.status(200).end("an error in creating business");
  } catch {
    return res.status(200).end("system error");
  }
};
