const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    assigned: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "staff" }
);

module.exports = mongoose.model("Staff", staffSchema);
