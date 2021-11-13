import dbConnection from "@/util/dbConnection";
import Business from "@/models/business";
import { countries } from "@/util/countryCode";

dbConnection();

export default async function Businesses(req, res) {
  const { method } = req;

  if (method === "GET") {
    // const country = await countries.filter(
    //   (c) => c?.code === req.headers["cf-ipcountry"]
    // );
    const businesses = await Business.find({
      // verified: true
      // ccode: country[0]?.usedCode,
      "brand.hasImg": true
    }).exec();
    const LoB = await businesses?.map((business) => ({
      businessCode: business?.businessCode,
      brand: business?.brand
    }));
    return res.status(200).end(JSON.stringify(LoB));
  } else {
    return res.status(200).end("invalid");
  }
}
