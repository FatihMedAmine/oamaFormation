require("dotenv").config();
const express = require("express");
const session = require('express-session');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const connectDB = require("./db/connectDB");
const loginRoute = require("./routes/LoginUser");
const mainRoute = require("./routes/main");
const studentRoute = require("./routes/student");
const professorsRoute = require("./routes/professorsRoutes");
const notFound = require("./middleware/notFound");

const app = express();
const port = process.env.PORT || 3000; // Utiliser PORT à partir du fichier .env ou 3000 par défaut

// Middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: 'abcd', // Changez ceci par une clé secrète aléatoire
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Si vous utilisez HTTPS, mettez cette valeur à true
}));

// Routes
app.use(mainRoute);
app.use(loginRoute);
app.use(studentRoute);
app.use(professorsRoute);

// Middleware pour les erreurs 404
app.use(notFound);

// Démarrage du serveur
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Error:", err);
  }
};

start();
