const ApiError = require("../utils/ApiError");

//get dashboard admin
const getDashboard = (req, res , next) => {
  if (!req.session.email) {
   return  next(new ApiError(401,"unauthorized"));
  }
  res.status(200).sendFile("admin.html", { root: "views" });
};

//get student info
const getStudentInfo = (req, res, next) => {
  if (!req.session.email) {
    const err = new Error("No session for student");
    err.status = 401; // Unauthorized
    return next(err);
  }
  res.status(200).sendFile("detailsStudent.html", { root: "views" });
};


//get page add student
const addStudentPage = (req, res) => {
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
