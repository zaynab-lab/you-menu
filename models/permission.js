const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String }
  },

  { collection: "permissions" }
);

export default mongoose.models.Permission ||
  mongoose.model("Permission", userSchema);
