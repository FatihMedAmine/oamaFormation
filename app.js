// require dotenv configuration
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const connectDB = require("./db/connectDB");
const ApiError = require("./utils/ApiError");
const errorHandler = require("./middlewares/error");

// Require routes
const mainRoute = require("./routes/main");
const loginRoute = require("./routes/LoginUser");
const studentRoute = require("./routes/student");
const professorsRoute = require("./routes/professorsRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // false si pas en HTTPS
  })
);

// Routes
app.use(mainRoute);
app.use(loginRoute);
app.use(studentRoute);
app.use(professorsRoute);

// Gestion des routes non trouvées
app.all("*", (req, res, next) => {
  next(new ApiError(404, "Page not found"));
});

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
const startServer = async () => {
  try {
    await connectDB(); // Connexion à la base de données
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
};

startServer();

// Gestion des unhandledRejection
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.name} || ${err.message}`);
  process.exit(1);
});
