const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    code: { type: String },
    ownerID: { type: String },
    ownerName: { type: String },
    ownerNumber: { type: String },
    businessID: { type: String },
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
    status: {
      confirmation: {
        done: { type: Boolean },
        pending: { type: Boolean, default: true },
        startDate: { type: Date, default: Date.now },
        doneDate: { type: Date }
      },
      payment: {
        done: { type: Boolean },
        pending: { type: Boolean },
        startDate: { type: Date },
        doneDate: { type: Date }
      },
      preparing: {
        done: { type: Boolean },
        pending: { type: Boolean },
        startDate: { type: Date },
        doneDate: { type: Date }
      },
      delivering: {
        done: { type: Boolean },
        pending: { type: Boolean },
        startDate: { type: Date },
        doneDate: { type: Date }
      },
      received: {
        done: { type: Boolean },
        pending: { type: Boolean },
        startDate: { type: Date },
        doneDate: { type: Date }
      },
      canceled: {
        done: { type: Boolean },
        pending: { type: Boolean },
        startDate: { type: Date },
        doneDate: { type: Date }
      },
      returned: {
        done: { type: Boolean },
        pending: { type: Boolean },
        startDate: { type: Date },
        doneDate: { type: Date }
      }
    }
  },
  { collection: "orders" }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
