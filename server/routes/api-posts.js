const express = require("express");
const router = express.Router();
const mysqlPostController = require("../controllers/mysql-post-controller");

// GET /api
router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the Stack Sandbox" });
});

// Create a new Post
router.post("/posts/create", mysqlPostController.create);

// Retrieve all Posts
router.get("/posts", mysqlPostController.findAll);

// Retrieve a single Post with id
router.get("/posts/:id", mysqlPostController.findOne);

// Update a Post with id
router.put("/posts/:id", mysqlPostController.update);

// Delete a Post with id
router.delete("/posts/:id", mysqlPostController.delete);

// Delete all Posts
router.delete("/posts", mysqlPostController.deleteAll);

module.exports = router;
