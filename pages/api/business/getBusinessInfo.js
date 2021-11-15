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
        brand: business.brand.name,
        imgLink: business.brand.imgLink,
        color: business.brand.color
      })
    );
  } else {
    return res.status(200).end("invalid");
  }
}
