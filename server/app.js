const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectToMongo = require("./db");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const placeRoutes = require("./routes/placeRoutes");

const app = express();

// connecting to db
connectToMongo();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//Routes middleware
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/places", placeRoutes);



const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on the ${PORT}`);
});
