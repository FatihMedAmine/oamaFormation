const express = require("express");
const router = express.Router();
const { createStudentValidator } = require("../utils/validators/studentValidtor");

const { getDashboard , getStudentInfo ,addStudentPage , addStudent} = require("../controllers/studentController");

//get dashboard admin
router.route("/admin.html").get(getDashboard);
//get student info
router.route("/detailsStudent.html").get(getStudentInfo);
//get page add student
router.route("/addStudent.html").get(addStudentPage) ;
//add student to database
router.route("/addStudent").post(createStudentValidator , addStudent);



module.exports = router;