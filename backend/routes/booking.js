const express = require("express");
const { getBookings, addBooking } = require("../controllers/booking");

const router = express.Router();

router
  .route("/")
  .get(getBookings)
  .post(addBooking);

module.exports = router;
