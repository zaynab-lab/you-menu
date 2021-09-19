const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    number: { type: String, require: true },
    date: { type: Date, default: Date.now },
    signDate: { type: Date, default: Date.now },
    otptimes: { type: Number },
    workingtimes: { type: Number, default: 1 },
    otp: { type: String },
    pages: { type: [String], default: [] },
    jwt: { type: String },
    credit: { type: Number, default: 0 },
    roles: { type: [String], default: ["customer"] },
    mail: { type: String },
    addresses: [
      {
        content: { type: String },
        long: { type: Number },
        lat: { type: Number }
      }
    ],
    cars: [
      {
        plateNumber: { type: String },
        plateType: { type: String, default: "p" },
        model: { type: Number },
        brand: { type: Number },
        logo: { type: String },
        valid: { type: Boolean }
      }
    ],
    coupons: [
      {
        code: { type: String },
        validation: { type: Number },
        date: { type: Date },
        used: { type: Date }
      }
    ],
    birth: { type: Date }
  },

  { collection: "users" }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
