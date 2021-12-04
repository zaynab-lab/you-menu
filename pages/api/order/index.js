import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";
import Order from "@/models/order";
import Product from "@/models/product";
import jwt from "jsonwebtoken";
import { orderCode } from "@/util/dateChanger";

dbConnection();

export default async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.jwt;
  const { body } = req;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();

      if (user) {
        if (method === "POST") {
          const oCode = orderCode();
          const business = await Business.findOne({
            businessCode: body.businessCode
          }).exec();
          if (business.acceptOrders) {
            const Ids = Object.keys(body.cartItems);
            const products = await Product.find({ _id: { $in: Ids } });

            const cartProducts = await products?.map((product) =>
              Object({
                defaultID: product._id,
                name: product.name,
                hasImg: product.hasImg,
                imgLink: product.imgLink,
                price: product.price,
                quantity: body.cartItems[product._id]
              })
            );

            let total = await products
              ?.map((product) => body.cartItems[product._id] * product?.price)
              .reduce((a, b) => a + b);

            let shouldPay = body.useCredit
              ? Number((user?.credit - total).toFixed(2)) > 0
                ? 0
                : Math.abs(Number((user?.credit - total).toFixed(2)))
              : Number(total.toFixed(2));

            const newCredit = body.useCredit
              ? Number((user?.credit - total).toFixed(2)) < 0
                ? 0
                : Number((user?.credit - total).toFixed(2))
              : Number((user?.credit).toFixed(2));

            let currency = business?.defaultCurrency;

            if (body.selectedCurrency === false) {
              total = Number((total * business?.exRate).toFixed(2));
              shouldPay = Number((shouldPay * business?.exRate).toFixed(2));
              currency = business?.currency;
            }

            const order = new Order({
              ownerID: user._id,
              ownerName: user.name,
              ownerNumber: user.number,
              businessID: business._id,
              businessCode: business.businessCode,
              products: cartProducts,
              "total.amount": total,
              "total.currency": currency,
              paymentMethod: "cash",
              "address.content": body?.address,
              orderType: body.orderType,
              shouldPay: shouldPay,
              useCredit: body.useCredit,
              code: oCode,
              "status.paying.done": shouldPay === 0 && true,
              "status.paying.date": shouldPay === 0 && Date.now()
            });
            await order.save().catch((err) => console.log(err));
            await User.findByIdAndUpdate(user._id, { credit: newCredit });
            return res.status(200).end("done");
          } else {
            return res.status(200).end("invalid");
          }
        } else if (method === "GET") {
          const business = await Business.findOne({
            ownerNumber: user.number
          }).exec();
          const orders = await Order.find({
            businessID: business._id
          }).exec();
          return res.status(200).end(JSON.stringify(orders));
        } else {
          return res.status(200).end("invalid");
        }
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
