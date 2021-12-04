import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import Order from "@/models/order";
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

        if (user.number === business.ownerNumber || user.role === "GM") {
          if (method === "PUT") {
            const order = await Order.findById(body.orderID).exec();
            switch (update) {
              case "cancel":
                Order.findByIdAndUpdate(
                  body.orderID,
                  {
                    "status.canceled.done": true,
                    "status.canceled.date": Date.now(),
                    "status.confirming.pending": false,
                    "status.paying.pending": false,
                    "status.preparing.pending": false,
                    "status.delivering.pending": false
                  },
                  (err) => console.log(err)
                );
                return res.status(200).end("done");
              case "confirming":
                Order.findByIdAndUpdate(
                  body.orderID,
                  {
                    currentStatus:
                      order.shouldPay === 0 ? "preparing" : "paying",
                    "status.confirming.done": true,
                    "status.confirming.date": Date.now()
                  },
                  (err) => console.log(err)
                );
                return res.status(200).end("done");
              case "paying":
                Order.findByIdAndUpdate(
                  body.orderID,
                  {
                    currentStatus: "preparing",
                    "status.paying.done": true,
                    "status.paying.date": Date.now()
                  },
                  (err) => console.log(err)
                );
                return res.status(200).end("done");
              case "preparing":
                Order.findByIdAndUpdate(
                  body.orderID,
                  {
                    currentStatus:
                      order.orderType === "delivery" ? "delivering" : "serving",
                    "status.preparing.done": true,
                    "status.preparing.date": Date.now()
                  },
                  (err) => console.log(err)
                );
                return res.status(200).end("done");
              case "delivering":
                Order.findByIdAndUpdate(
                  body.orderID,
                  {
                    currentStatus: "serving",
                    "status.delivering.done": true,
                    "status.delivering.date": Date.now()
                  },

                  (err) => console.log(err)
                );
                return res.status(200).end("done");
              case "serving":
                Order.findByIdAndUpdate(
                  body.orderID,
                  {
                    currentStatus: "received",
                    "status.serving.done": true,
                    "status.serving.date": Date.now()
                  },
                  (err) => console.log(err)
                );

                return res.status(200).end("done");

              default:
                return res.status(200).end("done");
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
