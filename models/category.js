const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    businessCode: { type: String },
    addingDates: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    colors: {
      hbg: { type: String },
      ht: { type: String },
      bbg: { type: String },
      tt: { type: String }
    },
    underCategoryId: { type: String }
  },
  { collection: "categories" }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
