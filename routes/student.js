const express = require("express");
const router = express.Router();

const { getDashboard , getStudentInfo ,addStudentPage , addStudent} = require("../controllers/studentController");

//get dashboard admin
router.route("/admin.html").get(getDashboard);
//get student info
router.route("/detailsStudent.html").get(getStudentInfo);
//get page add student
router.route("/addStudent.html").get(addStudentPage) ;
//add student to database
router.route("/addStudent").post(addStudent);



module.exports = router;