import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import User from "@/models/user";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body } = req;
    const business = new Business({
      number: body.phoneNumber
    });
    business.save().catch((err) => console.log(err));

    await User.findAndUpdate(
      { number: body.phoneNumber },
      { businessId: business._id, role: "BusinessOwner" },
      { returnOriginal: false },
      (err) => console.log(err)
    );

    return res.status(200).end("business creation done");
  } else return res.status(200).end("an error in creating business");
};
