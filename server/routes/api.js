const express = require("express");
const router = express.Router();

// GET /api
router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the Stack Sandbox" });
});

module.exports = router;
