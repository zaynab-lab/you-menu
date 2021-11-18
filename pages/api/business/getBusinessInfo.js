import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";

dbConnection();

export default async function Businesses(req, res) {
  const { method } = req;
  if (method === "GET" && req.query.businessCode) {
    const business = await Business.findOne({
      businessCode: req.query.businessCode
    }).exec();
    return res.status(200).end(
      JSON.stringify({
        currency: business.currency,
        exRate: business.exRate,
        brand: business.brand,
        businessCode: business.businessCode,
        businessType: business.businessType,
        ownerNumber: business.ownerNumber,
        acceptOrders: business.acceptOrders
      })
    );
  } else {
    return res.status(200).end("invalid");
  }
}
