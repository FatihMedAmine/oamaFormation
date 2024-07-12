const express = require("express");
const router = express.Router();
const {
  getLoginPage,
  getAuthentification,
} = require("../controllers/loginController");

// Routes

router.route("/login.html").get(getLoginPage);
router.route("/login").post(getAuthentification);

module.exports = router;
