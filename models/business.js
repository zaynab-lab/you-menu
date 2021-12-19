const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    ownerName: { type: String },
    ownerNumber: { type: String, require: true, unique: true },
    ccode: { type: String },
    brand: {
      name: { type: String },
      hasImg: { type: Boolean },
      imgLink: { type: Number },
      color: { type: String },
      background: { type: String }
    },
    businessCode: { type: String },
    businessType: { type: String, default: "cafe" },
    verified: { type: Boolean, default: false },
    useExchange: { type: Boolean },
    onlyTarget: { type: Boolean },
    defaultCurrency: { type: String },
    exRate: { type: Number, default: 1 },
    currency: { type: String },
    acceptOrders: { type: Boolean },
    acceptDelivery: { type: Boolean },
    signDates: { type: Date, default: Date.now },
    orderTimes: { type: Number },
    credit: { type: Number },
    address: {
      content: { type: String },
      long: { type: Number },
      lat: { type: Number }
    },
    products: { type: Number },
    categories: { type: Number },
    subscribe: [
      {
        date: { type: Date },
        plan: { type: String },
        forever: { type: Boolean, default: false },
        validation: { type: Number }
      }
    ],
    twentyfour: { type: Boolean },
    everyday: { type: Boolean },
    everyDayInterval: { type: [Object] },
    daysInterval: { type: [Object] },
    addedby: { type: String }
  },
  { collection: "businesses" }
);

export default mongoose.models.Business ||
  mongoose.model("Business", businessSchema);
