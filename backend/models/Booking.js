const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    custName: {
      type: String,
      required: true,
    },

    custEmail: {
      type: String,
      required: true,
    },
    vehicleMake: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    assignedSubStation: {
      type: String,
    },
    assignedStaff: {
      type: String,
    },
  },
  { collection: "bookings" }
);

module.exports = mongoose.model("Booking", bookingSchema);
