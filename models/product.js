const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    categoryID: { type: String },
    description: { type: String },
    price: { type: Number, default: 0.0 },
    unit: { type: String },
    quantity: { type: Number },
    hasImg: { type: Boolean },
    link: { type: String },
    appear: { type: Boolean },
    exist: { type: Boolean },
    deleted: { type: Boolean, default: false },
    options: [
      {
        name: { type: String },
        price: { type: Number },
        priceEffect: { type: Boolean },
        addable: { type: Boolean },
        removable: { type: Boolean }
      }
    ]
  },
  { collection: "products" }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
