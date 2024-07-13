const express = require("express");
const router = express.Router();

const { getDashboardProfessor } = require("../controllers/professorController");

router.route("/professors.html").get(getDashboardProfessor);

module.exports = router;
