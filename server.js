require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactsRouter = require("./routes/contactsRoute");
const userRouter = require("./routes/userRoute");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/contacts", contactsRouter);
app.use("/api/user", userRouter);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("db connected and running on port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
