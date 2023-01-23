const express = require("express");
const router = express.Router();

// Homepage
// Route GET /
router.get("/", function (req, res, next) {
  res.render("index", { title: "Stack Sandbox", user: req.user });
});

module.exports = router;
