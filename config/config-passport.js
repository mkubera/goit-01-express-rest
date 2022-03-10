const passport = require("passport");
const passportJwt = require("passport-jwt");
const User = require("./../services/schemas/user.js");
require("dotenv").config();
const secret = process.env.SECRET;

const { ExtractJwt, Strategy } = passportJwt;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, ({ id }, done) => {
    User.findOne({ _id: id })
      .then((user) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);
