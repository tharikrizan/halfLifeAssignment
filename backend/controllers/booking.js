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
    console.log(req.body);
    const bookings = await Booking.find();
    //console.log("bookings", bookings);
    if (bookings.length > 10) {
      return res.status(100).json({
        success: false,
        message: "Bookings Full",
      });
    }
    //check vehicle type , check availabilty , and assign particular substation accordingly
    // I added 10 substations manually to the database
    let subStation = "";

    subStation = await SubStations.findOne({
      assigned: false,
      type: req.body.vehicleType,
    });

    if (subStation == null) {
      return res.status(100).json({
        success: false,
        message: "Heavy vehicle subStations are full",
      });
    }
    //assign available staff
    // I added 10 staff members manually to the database

    const staff = await Staff.findOne({ assigned: false });

    let booking = new Booking({
      custName: req.body.custName,
      custEmail: req.body.custEmail,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vehicleType: req.body.vehicleType,

      assignedSubStation: subStation.name,
      assignedStaff: staff.name,
    });

    //update staff and substation as assigned is true
    await SubStations.findOneAndUpdate(
      { _id: subStation._id },
      { assigned: true }
    );
    await Staff.findOneAndUpdate({ _id: staff._id }, { assigned: true });

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

//@desc Clear all bookings end of the day and unassign all substations and staff members
//this is not a route
//called end of the day

exports.deleteBookings = async () => {
  console.log("I am called at 21:00");

  try {
    const bookings = await Booking.find();
    const staff = await Staff.find();
    const subStations = await SubStations.find();
    let deleteCount = 0;
    if (bookings.length > 0) {
      bookings.forEach(async (booking) => {
        await Booking.deleteOne({ name: booking.custName });
        deleteCount++;
      });
      //un assign staff members
      staff.forEach(async (staff) => {
        await Staff.findOneAndUpdate({ name: staff.name }, { assigned: false });
      });
      // unassign substations
      subStations.forEach(async (subStation) => {
        await Staff.findOneAndUpdate(
          { name: subStation.name },
          { assigned: false }
        );
      });
    }

    return {
      success: true,
      deleteCount,
      message:
        "Emptied Bookings and unassigned substations and staff for the day",
    };
  } catch (error) {
    return {
      success: false,
      message: "server error",
    };
  }
};
