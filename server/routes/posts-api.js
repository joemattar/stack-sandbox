const express = require("express");
const router = express.Router();
const mysqlPostApiController = require("../controllers/mysql-post-controller-api");

// Route GET /api/post
router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the Stack Sandbox API" });
});

// Create a new Post
// Route POST /api/post/create
router.post("/create", mysqlPostApiController.create);

// Retrieve all Posts
// Route GET /api/post/
router.get("/", mysqlPostApiController.findAll);

// Retrieve a single Post with id
// Route GET /api/post/:id
router.get("/:id", mysqlPostApiController.findOne);

// Update a Post with id
// Route PUT /api/post/:id
router.put("/:id", mysqlPostApiController.update);

// Delete a Post with id
// Route DELETE /api/post/:id
router.delete("/:id", mysqlPostApiController.delete);

// Delete all Posts
// Route DELETE /api/post/
router.delete("/", mysqlPostApiController.deleteAll);

module.exports = router;
