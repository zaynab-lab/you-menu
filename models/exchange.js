const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema(
  {
    base: { type: String },
    target: { type: String },
    rate: { type: Number }
  },
  { collection: "exchange" }
);

export default mongoose.models.Exchange ||
  mongoose.model("Exchange", exchangeSchema);
