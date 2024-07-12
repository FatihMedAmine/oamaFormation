const notFound = (req, res) => {
  res.status(404).sendFile("404.html", { root: "views" });
};
module.exports = notFound;
