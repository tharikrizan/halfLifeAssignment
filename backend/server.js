const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const schedule = require("node-schedule");

const bookingsRoutes = require("./routes/booking");
const { deleteBookings } = require("./controllers/booking");

require("dotenv").config();

const app = express();

//middlewares

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5001;

//handling cors error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    res.status(200).json({});
  }
  next();
});
//connect to mongoDB
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("DB  Connected"))
  .catch((err) => console.log("something wrong in mongo db connection", err));

//route middleware
app.use("/api/bookings", bookingsRoutes);

// clear booking at the end of the day , every day at 20:00 clear all booking

let job = schedule.scheduleJob({ hour: 20, minute: 0 }, async function() {
  console.log("Hello i am running!");
  await deleteBookings();
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error when serving the app", err);
  }
  console.log("Server is listning to ", port);
});
