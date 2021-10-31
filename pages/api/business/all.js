import dbConnection from "@/util/dbConnection";

import Business from "@/models/business";

dbConnection();

export default async function Businesses(req, res) {
  const { method } = req;

  if (method === "GET") {
    const businesses = await Business.find({ verified: true }).exec();
    const LoB = await businesses.map((business) => ({
      businessCode: business.businessCode,
      brand: { name: business?.brand?.name }
    }));
    return res.status(200).end(JSON.stringify(LoB));
  } else {
    return res.status(200).end("invalid");
  }
}
