const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    trnType: { type: String },
    walletID: { type: String },
    currency: { type: String },
    amount: { type: Number },
    date: { type: Date, default: Date.now() },
    from: { type: String },
    to: { type: String }
  },
  { collection: "transactions" }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
