const express = require("express");
const {
  getBookings,
  addBooking,
  deleteBookings,
} = require("../controllers/booking");

const router = express.Router();

router
  .route("/")
  .get(getBookings)
  .post(addBooking)
  .delete(deleteBookings);

module.exports = router;
