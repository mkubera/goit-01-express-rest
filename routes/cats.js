const services = require("../services");
const express = require("express");
const router = express.Router();
const { jsonResponse } = require("./../utils/index");

/* GET home page. */
router.get("/", (req, res, next) => {
  services
    .getAllCats()
    .then((cx) => {
      console.log(`cx`, cx);
      jsonResponse(res, 200, cx);
    })
    .catch(console.log);
});
router.post("/", (req, res, next) => {
  services
    .createCat({ nickname: req.body.nickname })
    .then((c) => {
      console.log(`c`, c);
      jsonResponse(res, 200, c);
    })
    .catch(console.log);
});

module.exports = router;
