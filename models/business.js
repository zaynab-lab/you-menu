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
        validation: { type: Number }
      }
    ],
    messages: [
      {
        reciverNumber: { type: String },
        content: { type: String },
        date: { type: Date, default: Date.now }
      }
    ],
    addedby: { type: String }
  },
  { collection: "businesses" }
);

export default mongoose.models.Business ||
  mongoose.model("Business", businessSchema);
