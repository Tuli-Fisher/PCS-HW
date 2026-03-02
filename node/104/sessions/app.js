/* eslint-disable no-undef */
/* eslint-disable no-var */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

//var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(
  session({
    secret: "foo",
    resave: false,
    saveUninitialized: false,
  }),
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.userName = req.session.userName ?? "nobody";
  req.session.count = (req.session.count || 0) + 1;
  res.locals.count = req.session.count;
  
  next();
});

app.get("/", (req, res, next) => {
  res.render("index", {
    title: "Express",
    count: res.locals.count,
    UserName: res.locals.userName,
  });
});

app.post('/', (req, res, next) =>{
  req.session.userName = req.body.userName;
  console.log(req.session);
  res.redirect('/');
});

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
