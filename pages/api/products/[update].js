import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import Product from "@/models/product";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;
  const { body } = req;
  const {
    query: { update }
  } = req;

  if (token) {
    const business = await Business.findOne({
      businessCode: body.businessCode
    }).exec();

    business &&
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(200).end("invalid");
        const user = await User.findById(decoded.id).exec();
        if (
          user.number === business.ownerNumber ||
          user.promoCode === business.addedby ||
          user.role === "GM"
        ) {
          if (method === "PUT") {
            switch (update) {
              case "all":
                Product.findByIdAndUpdate(
                  body.productID,
                  {
                    name: body.state.name,
                    price: body.state.price,
                    description: body.state?.description,
                    exist: body.state?.exist,
                    appear: body.state?.appear
                  },
                  (err) => console.log(err)
                );
                return res.status(200).end("done");

              case "img":
                Product.findByIdAndUpdate(
                  body.productID,
                  { hasImg: body.hasImg, imgLink: body.imgLink },
                  (err) => console.log(err)
                ).exec();

                return res.status(200).end("done");

              case "remove":
                Product.findByIdAndUpdate(
                  body.productID,
                  { deleted: true },
                  (err) => console.log(err)
                ).exec();
                return res.status(200).end("done");

              default:
                res.status(200).end("invalid");
            }
          }
        } else {
          return res.status(200).end("invalid");
        }
      });
  } else {
    return res.status(200).end("invalid");
  }
};
