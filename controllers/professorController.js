const getDashboardProfessor = (req, res) => {
  if (!req.session.email) {
    console.log("no session for professor");
    res.status(401).send("Unauthorized");
    console.log(req.session.email);
  }
  res.status(200).sendFile("professors.html", { root: "views" });
};


module.exports = { getDashboardProfessor};