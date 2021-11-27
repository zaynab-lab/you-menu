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
        switch (update) {
          case "name":
            User.findByIdAndUpdate(user._id, { name: body.name }, (err) =>
              console.log(err)
            ).exec();
            return res.status(200).end("done");
          case "editAddress":
            return res.status(200).end("done");
          case "deleteAddress":
            console.log(body?.address);

            // const updated = await user?.addresses.map((address) =>
            //   address.content === body?.address
            //     ? { ...address, deleted: true }
            //     : address
            // );

            // User.findByIdAndUpdate(user._id, { addresses: updated }, (err) =>
            //   console.log(err)
            // ).exec();

            return res.status(200).end("done");

          case "address":
            let address = {};
            let addresses = [];
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
