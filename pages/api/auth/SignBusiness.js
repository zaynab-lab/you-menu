import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  try {
    if (method === "POST") {
      const { body } = req;
      const businessExist = await Business.findOne({
        ownerNumber: body.phoneNumber
      }).exec();

      if (businessExist) {
        return res.status(200).end("your all done");
      } else {
        const business = new Business({
          ownerNumber: body.phoneNumber
        });
        business.save().catch((err) => console.log(err));

        await User.findOneAndUpdate(
          { number: body.phoneNumber },
          { role: "BusinessOwner" },
          { returnOriginal: false },
          (err) => console.log(err)
        );

        return res.status(200).end("your all done");
      }
    } else return res.status(200).end("an error in creating business");
  } catch {
    return res.status(200).end("system error");
  }
};
