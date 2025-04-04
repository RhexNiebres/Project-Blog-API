require('dotenv').config();
const express = require("express");
const app = express();
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");
const postRoutes = require("./routes/post");
const cors = require("cors");// Allows the frontend (on a different domain) to communicate with the backend

app.use(cors({
  origin: [`http://localhost:${process.env.APP_PORT}`, process.env.ADMIN_CLIENT_HOST, process.env.USERS_CLIENT_HOST], // Allow both local and deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies if needed
}));

app.options("*", cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/", indexRoutes);
app.use("/", authRoutes);


app.listen(process.env.APP_PORT, () =>
  console.log(`App listening on port ${process.env.APP_PORT}!`)
);
