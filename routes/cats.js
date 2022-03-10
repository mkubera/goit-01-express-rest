const services = require("../services");
const express = require("express");
const router = express.Router();
const { jsonResponse } = require("./../utils/index");

/* GET home page. */
router.get("/", (req, res, next) => {
  services
    .getAllCats()
    .then((cx) => {
      const jsonData = {
        status: "OK",
        code: 200,
        data: { cats: cx },
      };
      jsonResponse(res, jsonData);
    })
    .catch(console.log);
});

router.post("/", (req, res, next) => {
  const { nickname } = req.body;
  services
    .createCat({ nickname })
    .then((c) => {
      const jsonData = {
        status: "Created",
        code: 201,
        data: { message: "Cat created.", cat: c },
      };
      jsonResponse(res, jsonData);
    })
    .catch(console.log);
});

router.put("/:id", (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;
  services
    .updateCat(id, body)
    .then((c) => {
      const jsonData = {
        status: "OK",
        code: 200,
        data: { message: "Cat updated.", cat: c },
      };
      jsonResponse(res, jsonData);
    })
    .catch(console.log);
});

module.exports = router;
