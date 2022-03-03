const express = require("express");
const router = express.Router();
const { jsonResponse } = require("./../utils/index");
const { nanoid } = require("nanoid");

const contacts = [
  {
    id: nanoid(),
    username: "Felix",
    surname: "Brown",
    email: "felix@test.com",
  },
  {
    id: nanoid(),
    username: "Sonya",
    surname: "Redhead",
    email: "sonya@test.com",
  },
  {
    id: nanoid(),
    username: "Conan",
    surname: "Barbarian",
    email: "conan@test.com",
  },
];

/* GET users listing. */
router.get("/", (req, res, next) => {
  jsonResponse(res, 200, contacts);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const contact = contacts.find((el) => el.id === id);
  jsonResponse(res, 200, contact);
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  res.render("response", { title: "Express", email, password });
});

module.exports = router;
