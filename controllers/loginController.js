// login
const getLoginPage = (req, res) => {
  res.status(200).sendFile("login.html", { root: "views" });
};

// authentication
const getAuthentification = (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    req.session.email = email;
    return res.status(200).json({LINK_DASHBOARD:process.env.DASHBOARD_URL}) // Redirect response
  }
  
  return res.status(401).json({ message: "Unauthorized" }); // Unauthorized response
};

module.exports = { getLoginPage, getAuthentification };
