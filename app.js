const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// dotenv: env vars (environment variables)
require("dotenv").config();

const mongoose = require("mongoose");

const { MONGODB_USER, MONGODB_PASS } = process.env;
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.fz4tk.mongodb.net/goit`,
  {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

// const cat1 = new Cat({ age: 1 });
// const result1 = cat1.save();
// result1.then(console.log).catch(console.log);
// const cat2 = new Cat({ nickname: "Barsik", age: 1 });
// cat2.fullName();
// const result1 = cat2.save();
// result1
//   .then((c) => {
//     console.log(c.nickname);
//     Cat.create({ nickname: "Tommy", age: 2 }).then((d) => {
//       console.log(`Tommy: `, d.nickname);

//       Cat.count({}).then(console.log);
//       // .catch(console.log);
//     });
//     // .catch(console.log);
//   })
//   .catch(console.log);

require("./config/config-passport");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catsRouter = require("./routes/cats");
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cats", catsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
