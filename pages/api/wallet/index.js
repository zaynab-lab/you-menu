import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import Wallet from "@/models/wallet";
import Transaction from "@/models/transaction";
import jwt from "jsonwebtoken";

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
        const wallet = await Wallet.findOne({ ownerID: user._id }).exec();
        if (!!wallet) {
          return res.status(200).end(JSON.stringify(wallet));
        } else {
          const newWallet = new Wallet({
            ownerID: user._id,
            credit: [{ amount: 1, currency: "USD" }]
          });
          let createdWallet = {};
          await newWallet
            .save()
            .catch((err) => console.log(err))
            .then((w) => {
              createdWallet = w;
              const newTransaction = new Transaction({
                trnType: "gift",
                walletID: w._id,
                currency: "USD",
                amount: 1
              });
              newTransaction.save().catch((err) => console.log(err));
            });
          return res.status(200).end(JSON.stringify(createdWallet));
        }
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
}
