const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const AuthRout = require("./routes/authRoute");
const ProductRout = require("./routes/productRoute");
const CartRout = require("./routes/cartRoute");
const useRoute = require("./routes/userRoute");
const { cloudinaryConfig } = require("./config/Coudinary");
///////////  mongoconnection ////////////
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection is good"))
  .catch((err) => console.log(err));
app.use(cloudinaryConfig);
app.use(cors());
app.use(express.json());
app.use("/api/auth", AuthRout);
app.use("/api/prodcut", ProductRout);
app.use("/api/cart", CartRout);
app.use("/api/user", useRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`serever is running on ${process.env.PORT}`);
});
