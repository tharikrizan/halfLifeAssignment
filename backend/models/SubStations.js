const mongoose = require("mongoose");

const subStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  assigned: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("SubStation", subStationSchema);
