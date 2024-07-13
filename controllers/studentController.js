const Student = require("../models/studentModel");
const notFound = require("../middleware/notFound");

//get dashboard admin
const getDashboard = (req, res) => {
  if (!req.session.email) {
    return notFound(req, res);
  }
  res.status(200).sendFile("admin.html", { root: "views" });
};

//get student info
const getStudentInfo = (req, res) => {
  if (!req.session.email) {
    console.log("no session for student");
    return notFound(req, res);
  }
  res.status(200).sendFile("detailsStudent.html", { root: "views" });
};

//get page add student
const addStudentPage = (req, res) => {
  console.log(req.session.email);
  if (!req.session.email) {
    return notFound(req, res);
  }
  res.status(200).sendFile("addStudent.html", { root: "views" });
};

//add student to database
const addStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    // check if student already exists
    const validStudent = await Student.findOne({ email: student.email });
    if (validStudent) {
      return res.status(400).send("Student already exists");
    }

    // save the new student
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = { getDashboard, getStudentInfo, addStudentPage, addStudent };
