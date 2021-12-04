const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    code: { type: String },
    ownerID: { type: String },
    ownerName: { type: String },
    ownerNumber: { type: String },
    businessID: { type: String },
    businessCode: { type: String },
    products: [
      {
        defaultID: { type: String },
        name: { type: String },
        hasImg: { type: Boolean },
        imgLink: { type: Number },
        price: { type: Number },
        quantity: { type: Number }
      }
    ],
    date: { type: Date, default: Date.now },
    total: { currency: { type: String }, amount: { type: Number } },
    address: {
      content: { type: String },
      lang: { type: Number },
      lat: { type: Number }
    },
    paymentMethod: { type: String },
    orderType: { type: String },
    shouldPay: { type: Number },
    useCredit: { type: Boolean },
    table: { type: Number },
    preparingTime: { type: Number },
    currentStatus: { type: String, default: "confirming" },
    status: {
      confirming: {
        done: { type: Boolean },
        date: { type: Date }
      },
      paying: {
        done: { type: Boolean },
        pending: { type: Boolean },
        date: { type: Date }
      },
      preparing: {
        done: { type: Boolean },
        date: { type: Date }
      },
      delivering: {
        done: { type: Boolean },
        date: { type: Date }
      },
      serving: {
        done: { type: Boolean },
        date: { type: Date }
      },
      received: {
        done: { type: Boolean },
        date: { type: Date }
      },
      canceled: {
        done: { type: Boolean },
        date: { type: Date }
      },
      returning: {
        done: { type: Boolean },
        pending: { type: Boolean },
        date: { type: Date }
      },
      returned: {
        done: { type: Boolean },
        date: { type: Date }
      }
    }
  },
  { collection: "orders" }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
