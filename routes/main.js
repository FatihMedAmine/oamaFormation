const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// Routes
router.route("/").get(mainController.getHomePage);

module.exports = router;