const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.get("/sign-up", authController.getSignUp);
router.post("/sign-up", authController.postSignUp);
router.post("/log-in", authController.postLogin);
router.get("/log-in", authController.getLogin);
router.get("/log-out", authController.logout);

module.exports = router;