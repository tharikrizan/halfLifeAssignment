const Booking = require("../models/Booking");
const SubStations = require("../models/SubStations");
const Staff = require("../models/Staff");

//@desc Get all bookings for the day
//@route GET api/bookings/
//@ access public
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    console.log(bookings);
    res.status(200).json({
      success: true,
      length: bookings.length,
      data: bookings,
      message: "Successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

//@desc Add a bookings for the day
//@route POST api/bookings/
//@ access public
exports.addBooking = async (req, res, next) => {
  try {
    //check if booking possible for today

    const bookings = await Booking.find();
    if (bookings.length > 10) {
      return res.status(100).json({
        success: false,
        message: "Bookings Full",
      });
    }
    // assign available substation
    // I added 10 substations manually to the database

    const subStation = await SubStations.findOne({ assigned: false });

    //assign available staff
    // I added 10 staff members manually to the database

    const staff = await Staff.findOne({ assigned: false });

    let booking = new Booking({
      ...req.body,
      assignedSubStation: subStation.name,
      assignedStaff: staff.name,
    });

    const newBooking = await booking.save();

    return res.status(201).json({
      success: true,
      data: newBooking,
      message: "Successfully created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

//@desc Clear all bookings end of the day
//@route Delete api/bookings/
//@ access public

exports.deleteBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    let deleteCount = 0;
    if (bookings.length > 0) {
      bookings.forEach(async (booking) => {
        await Booking.deleteOne({ name: booking.custName });
        deleteCount++;
      });
    }

    return res.status(200).json({
      success: true,
      deleteCount,
      message: "Emptied Bookings for the day",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};