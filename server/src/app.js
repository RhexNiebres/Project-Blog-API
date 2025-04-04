require("dotenv").config();
const express = require("express");
const app = express();
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");
const postRoutes = require("./routes/post");
const cors = require("cors"); // Allows the frontend (on a different domain) to communicate with the backend

// const allowedOrigins = [
//   `http://localhost:${process.env.APP_PORT}`,
//   process.env.ADMIN_CLIENT_HOST,
//   process.env.USERS_CLIENT_HOST, 
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));

app.use(cors({ origin: "*", credentials: true }));
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
