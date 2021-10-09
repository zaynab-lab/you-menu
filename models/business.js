const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    ownerName: { type: String },
    ownerNumber: { type: String, require: true, unique: true },
    brand: {
      name: { type: String },
      imgLink: { type: String }
    },
    businessCode: { type: String },
    signDates: { type: Date, default: Date.now },
    orderTimes: Number,
    credit: Number,
    address: {
      content: { type: String },
      long: { type: Number },
      lat: { type: Number }
    },
    categories: [
      {
        name: { type: String },
        level: { type: Number, default: 1 },
        colors: {
          hbg: { type: String },
          ht: { type: String },
          bbg: { type: String }
        },
        category: { type: String },
        items: [
          {
            name: { type: String },
            price: { type: Number },
            unit: { type: String },
            quantity: { type: Number },
            hasImg: { type: Boolean },
            link: { type: String },
            appear: { type: Boolean },
            exist: { type: Boolean },
            options: [
              {
                name: { type: String },
                price: { type: Number },
                priceEffect: { type: Boolean },
                addable: { type: Boolean },
                removable: { type: Boolean }
              }
            ]
          }
        ]
      }
    ],
    messages: [
      {
        reciverNumber: { type: String },
        content: { type: String },
        date: { type: Date, default: Date.now }
      }
    ],
    addedby: { type: String }
  },

  { collection: "businesses" }
);

export default mongoose.models.Business ||
  mongoose.model("Business", businessSchema);
