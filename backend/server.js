const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const bookingsRoutes = require("./routes/booking");

require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5001;

//connect to mongoDB
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

//route middleware
app.use("/api/bookings", bookingsRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log("Error when serving the app", err);
  }
  console.log("Server is listning to ", port);
});
