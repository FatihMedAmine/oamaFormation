const getHomePage = (req, res) => {
  res.status(200).sendFile("index.html", { root: "views" });
};

module.exports = { getHomePage };
