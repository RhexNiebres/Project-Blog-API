require("dotenv").config({path:"../../.env"});
const express = require("express");
const app = express();
const indexRoutes = require("./routes/index")
const authRoutes = require("./routes/auth")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRoutes);
app.use('/',authRoutes)

app.listen(process.env.APP_PORT, () =>
  console.log(`App listening on port ${process.env.APP_PORT}!`)
);
