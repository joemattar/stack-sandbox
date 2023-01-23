const express = require("express");
const router = express.Router();
const isAuthorized = require("../controllers/authentication");

// Dashboard page
// Route GET /dashboard
router.get("/", isAuthorized, function (req, res, next) {
  res.render("dashboard", { title: "Stack Sandbox", user: req.user });
});

module.exports = router;
