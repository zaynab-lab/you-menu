import dbConnection from "@/util/dbConnection";
import User from "@/models/user";
import { codeGenerator, OTPGenerator } from "@/util/codeGenerator";
import axios from "axios";
import { countries } from "@/util/countryCode";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body } = req;
    try {
      const parfixList = countries.filter(
        (country) => country.code === body.ccode
      )[0].parafix;

      if (parfixList.includes(body.phoneNumber.length)) {
        const otp = OTPGenerator();
        const code = codeGenerator();
        const d = Date.now();
        const user = await User.findOne({
          number: body.phoneNumber
        }).exec();
        if (user) {
          const min = 2 - (d - user.date) / 60000;
          if (min < 2 && min > 0) {
            var mins = Math.ceil(min);
            return res
              .status(200)

              .end(`please retry in ${mins} min.`);
          } else {
            await User.findByIdAndUpdate(
              user._id,
              {
                date: new Date(),
                otptimes: user.otptimes + 1,
                otp
              },
              (err) => console.log(err)
            ).exec();
          }
        } else {
          const createdUser = new User({
            number: body.phoneNumber,
            otp,
            otptimes: 1,
            promoCode: code,
            ccode: body.ccode
          });
          createdUser.save().catch((err) => console.log(err));
        }

        const receptor = body.ccode + body.phoneNumber;
        await axios.get(
          process.env.SMS_URL +
            "to=" +
            receptor +
            "&message=your activation code is : " +
            otp +
            " (you menu)"
        );

        // .then((response) => {
        // return response.data.REQUEST_RESULT === 200;
        // });

        return res.status(200).end("done");
      } else {
        res.status(200).end("please check the phone number");
      }
    } catch (err) {
      console.log(err);

      return res.status(200).end("system error retry later");
    }
  }
  return res.status(200).end("system error retry later");
};
