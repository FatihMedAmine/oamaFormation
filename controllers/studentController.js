const Student = require("../models/studentModel");
const notFound = require("../middleware/notFound");

const getDashboard = (req, res) => {
  if (!req.session.email) {
    return notFound(req, res);
  }
  res.status(200).sendFile("admin.html", { root: "views" });
};

module.exports = { getDashboard };
