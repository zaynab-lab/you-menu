const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    code: { type: String },
    ownerID: { type: String },
    ownerName: { type: String },
    ownerNumber: { type: String },
    businessID: { type: String },
    products: { type: [Object] },
    date: { type: Date, default: Date.now },
    total: { currency: { type: String }, amount: { type: Number } },
    address: {
      content: { type: String },
      lang: { type: Number },
      lat: { type: Number }
    },
    type: { type: String },
    status: {
      confirmation: { done: { type: Boolean }, date: { type: Date } },
      payment: { done: { type: Boolean }, date: { type: Date } },
      preparing: { done: { type: Boolean }, date: { type: Date } },
      delivering: { done: { type: Boolean }, date: { type: Date } },
      received: { done: { type: Boolean }, date: { type: Date } },
      canceled: { done: { type: Boolean }, date: { type: Date } },
      returned: { done: { type: Boolean }, date: { type: Date } }
    }
  },
  { collection: "orders" }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
