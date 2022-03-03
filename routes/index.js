const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Express",
    lorem: `
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit, odit a vitae suscipit deserunt fugit accusamus dolores culpa fugiat veniam voluptas dicta dolorem, laudantium nihil voluptatum, ipsum asperiores molestiae esse?
  `,
  });
});

module.exports = router;
