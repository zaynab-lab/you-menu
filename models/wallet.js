const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    owenerID: { type: String },
    transactionsIDs: [String],
    credit: [{ amount: { type: Number }, currency: { type: String } }]
  },

  { collection: "wallets" }
);

export default mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);
