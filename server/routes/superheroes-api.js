const express = require("express");
const router = express.Router();
const superheroApiController = require("../controllers/mongodb-superhero-controller-api");

// API AUTHORIZATION TO BE REVIEWED !!!
// API AUTHORIZATION TO BE REVIEWED !!!
const isAuthorized = require("../controllers/authentication");

// Return list of super heroes
// Route GET /api/superhero
router.get("/", isAuthorized, superheroApiController.superheroes_get);

// Create superhero
// Route POST /api/superhero
router.post("/", isAuthorized, superheroApiController.superhero_post);

// Find superhero by id
// Route GET /api/superhero/:id
router.get("/:id", isAuthorized, superheroApiController.superhero_get);

// Update superhero by id
// Route PUT /api/superhero/:id
router.put("/:id", isAuthorized, superheroApiController.superhero_put);

// Delete superhero by id
// Route DELETE /api/superhero/:id
router.delete("/:id", isAuthorized, superheroApiController.superhero_delete);

module.exports = router;
