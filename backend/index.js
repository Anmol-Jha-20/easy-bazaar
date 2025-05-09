const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db.js");
const router = require("./routes");

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "https://easy-bazaar-eta.vercel.app"],
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" })); // JSON body size limit
app.use(express.urlencoded({ extended: true, limit: "5mb" })); // Form body limit
// app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
