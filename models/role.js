const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    level: { type: Number },
    permissions: { type: [String] }
  },
  { collection: "roles" }
);

export default mongoose.models.Role || mongoose.model("Role", userSchema);
