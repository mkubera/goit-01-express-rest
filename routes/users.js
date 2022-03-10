const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("./../services/schemas/user.js");
const { jsonResponse } = require("./../utils/index.js");
require("dotenv").config();
const secret = process.env.SECRET;

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      const jsonData = {
        status: "error",
        code: 401,
        data: {
          message: "Unauthorized",
        },
      };
      return jsonResponse(res, jsonData);
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    const jsonData = {
      status: "error",
      code: 400,
      data: {
        message: "Bad Request. Incorrect login or password",
      },
    };
    return jsonResponse(res, jsonData);
  }

  const { id, username } = user;
  const payload = { id, username };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  const jsonData = {
    status: "success",
    code: 200,
    data: {
      token,
    },
  };
  return jsonResponse(res, jsonData);
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const jsonData = {
      status: "error",
      code: 409,
      data: {
        message: "Email is already in use",
      },
    };
    return jsonResponse(res, jsonData);
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();

    const jsonData = {
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    };
    return jsonResponse(res, jsonData);
  } catch (error) {
    next(error);
  }
});

router.get("/profile", auth, (req, res, next) => {
  const { username } = req.user;
  const jsonData = {
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  };
  return jsonResponse(res, jsonData);
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { jsonResponse } = require("./../utils/index");
// const { nanoid } = require("nanoid");

// const contacts = [
//   {
//     id: nanoid(),
//     username: "Felix",
//     surname: "Brown",
//     email: "felix@test.com",
//   },
//   {
//     id: nanoid(),
//     username: "Sonya",
//     surname: "Redhead",
//     email: "sonya@test.com",
//   },
//   {
//     id: nanoid(),
//     username: "Conan",
//     surname: "Barbarian",
//     email: "conan@test.com",
//   },
// ];

// /* GET users listing. */
// router.get("/", (req, res, next) => {
//   jsonResponse(res, 200, contacts);
// });

// router.get("/:id", (req, res, next) => {
//   const { id } = req.params;
//   const contact = contacts.find((el) => el.id === id);
//   jsonResponse(res, 200, contact);
// });

// router.post("/login", (req, res, next) => {
//   const { email, password } = req.body;
//   res.render("response", { title: "Express", email, password });
// });

// module.exports = router;
