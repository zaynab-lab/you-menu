import dbConnection from "@/util/dbConnection";
import User from "@/models/user";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body } = req;

    const user = await User.findOne({ number: body.phoneNumber }).exec();

    if (user.otp === body.oTP) {
      return res.status(200).end("done");
    } else return res.status(200).end("activation code is not correct");
  }

  return res.end("system error retry");
};
