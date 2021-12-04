const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    owenerID: { type: String },
    transactions: [
      {
        trnType: { type: String },
        currency: { type: String },
        amount: { type: Number },
        date: { type: Date, default: Date.now() },
        to: { type: String },
        from: { type: String }
      }
    ],
    credit: [{ amount: { type: Number }, currency: { type: String } }]
  },

  { collection: "wallets" }
);

export default mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);
