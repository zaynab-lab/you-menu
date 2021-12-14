import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { body, method, cookies } = req;
  const token = cookies.jwt;
  const {
    query: { update }
  } = req;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(200).end("invalid");
      const user = await User.findById(decoded.id).exec();
      if (user && method === "PUT") {
        let address = {};
        let addresses = [];
        let updatedAddresses = [];

        switch (update) {
          case "name":
            User.findByIdAndUpdate(user._id, { name: body.name }, (err) =>
              console.log(err)
            ).exec();
            return res.status(200).end("done");
          case "editAddress":
            addresses = user?.addresses;
            updatedAddresses = await addresses.map((address) =>
              address._id.toString() === body?.addressId
                ? { _id: address._id, content: body.address }
                : address
            );
            User.findByIdAndUpdate(
              user._id,
              { addresses: updatedAddresses },
              (err) => console.log(err)
            ).exec();
            return res.status(200).end("done");

          case "deleteAddress":
            addresses = user?.addresses;
            updatedAddresses = await addresses.map((address) =>
              address._id.toString() === body?.addressId
                ? { _id: address._id, content: address.content, deleted: true }
                : address
            );
            User.findByIdAndUpdate(
              user._id,
              { addresses: updatedAddresses },
              (err) => console.log(err)
            ).exec();
            return res.status(200).end("done");

          case "addAddress":
            if (user?.addresses?.length > 0) {
              address = {
                id: user?.addresses?.length + 1,
                content: body.address
              };
              addresses = [...user?.addresses];
            } else {
              address = { id: 1, content: body.address };
            }
            addresses.push(address);

            await User.findByIdAndUpdate(
              user._id,
              { addresses: addresses },
              (err) => console.log(err)
            ).exec();
            return res.status(200).end("done");
          default:
            return res.status(200).end("done");
        }
      } else {
        return res.status(200).end("invalid");
      }
    });
  } else {
    return res.status(200).end("invalid");
  }
};
