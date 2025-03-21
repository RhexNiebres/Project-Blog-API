require("dotenv").config({path:"../../.env"});
const express = require("express");
const app = express();
const indexRoutes = require("./routes/index")
const authRoutes = require("./routes/auth")
const commentRoutes = require('./routes/comment')
const postRoutes = require('./routes/post')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRoutes);
app.use("/",authRoutes)
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);

app.listen(process.env.APP_PORT, () =>
  console.log(`App listening on port ${process.env.APP_PORT}!`)
);
