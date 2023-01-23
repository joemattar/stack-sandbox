const express = require("express");
const router = express.Router();
const isAuthorized = require("../controllers/authentication");
const superheroViewController = require("../controllers/mongodb-superhero-controller-view");

// Display list of super heroes
// Route GET /superhero
router.get("/", isAuthorized, superheroViewController.superheroes_display_get);

// Display page - create superhero
// Route GET /superhero/create
router.get(
  "/create",
  isAuthorized,
  superheroViewController.superhero_create_get
);

// Create superhero on post
// Route POST /superhero/create
router.post(
  "/create",
  isAuthorized,
  superheroViewController.superhero_create_post
);

// Display superhero on get
// Route GET /superhero/:id
router.get("/:id", isAuthorized, superheroViewController.superhero_display_get);

// Display page - edit superhero
// Route GET /superhero/:id/edit
router.get(
  "/:id/edit",
  isAuthorized,
  superheroViewController.superhero_edit_get
);

// Update superhero on post
// Route POST /superhero/:id/edit
router.post(
  "/:id/edit",
  isAuthorized,
  superheroViewController.superhero_edit_post
);

// Delete superhero
// Route GET /superhero/:id/delete
router.get(
  "/:id/delete",
  isAuthorized,
  superheroViewController.superhero_delete_get
);

module.exports = router;
