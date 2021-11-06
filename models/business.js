const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    ownerName: { type: String },
    ownerNumber: { type: String, require: true, unique: true },
    ccode: { type: String },
    brand: {
      name: { type: String },
      img: { type: Boolean }
    },
    businessCode: { type: String },
    businessType: { type: String },
    verified: { type: Boolean, default: false },
    exRate: { type: Number },
    currency: { type: String },
    acceptOrders: { type: Boolean },
    acceptDelivery: { type: Boolean },
    signDates: { type: Date, default: Date.now },
    orderTimes: Number,
    credit: Number,
    address: {
      content: { type: String },
      long: { type: Number },
      lat: { type: Number }
    },
    subscribe: {
      date: { type: Date },
      plan: { type: String },
      validTill: { type: Number }
    },
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
