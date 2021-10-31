const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    businessCode: { type: String },
    addingDates: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    colors: {
      tbt: { type: String },
      bbg: { type: String },
      t: { type: String },
      tbg: { type: String }
    },
    parentCategoryId: { type: String }
  },
  { collection: "categories" }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
