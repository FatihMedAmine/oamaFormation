const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/studentController");

router.route("/admin.html").get(getDashboard);



module.exports = router;