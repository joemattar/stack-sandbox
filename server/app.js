const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

// Initialize mongodb database connection from database controller
require("./controllers/database-mongodb");
// Passport - pass the passport variable into the passport.js controller to be used in the middleware
require("./controllers/passport")(passport);

const db = require("./controllers/database-mysql");
db.sequelize.sync().then(
  function () {
    console.log("DB connection sucessful.");
  },
  function (err) {
    // catch error here
    console.log(err);
  }
);

require("dotenv").config(); // to use environment variable

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const apiPostsRouter = require("./routes/api-posts");
const usersRouter = require("./routes/users");

const app = express();

// Cors options
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// Session - stored in mongodb
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

// parse html requests of content-type - application/json
app.use(express.json());

// parse html requests of content-type - application/x-www-form-urlencoded
// extended: false by default
app.use(express.urlencoded({ extended: true }));

// Set the Cookie-parser
// Define Cookie-parser usage so that the server can
// access the necessary option to save, read and access a cookie.
app.use(cookieParser());

// Static folder ~ contains all puplic assets
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api", apiPostsRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
