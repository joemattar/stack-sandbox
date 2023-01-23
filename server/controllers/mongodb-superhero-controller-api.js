const Superhero = require("../models-mongodb/Superhero");
const async = require("async");
const { body, validationResult } = require("express-validator");

// Return list of super heroes
// Route GET /api/superhero
module.exports.superheroes_get = function (req, res, next) {
  Superhero.find({})
    .sort({ name: 1 })
    .exec(function (err, superheroes) {
      if (err) {
        return next(err);
      }
      // Successful, so send
      res.send(superheroes);
    });
};

// Create superhero
// Route POST /api/superhero
module.exports.superhero_post = function (req, res, next) {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Superhero name can not be empty!",
    });
    return;
  }

  // Create a Superhero object.
  const superhero = new Superhero({
    name: req.body.name,
  });

  Superhero.findOne({ name: req.body.name }).exec((err, found_superhero) => {
    if (err) {
      return next(err);
    }
    if (found_superhero) {
      // Superhero exists, send error.
      res.status(400).send({
        message: "Superhero already exists!",
      });
      return;
    } else {
      // Data from form is valid.
      superhero.save((err) => {
        if (err) {
          return next(err);
        }
        // Successful: redirect to new record.
        res.send(superhero);
      });
    }
  });
};

// Find superhero by id
// Route GET /api/superhero/:id
module.exports.superhero_get = function (req, res, next) {
  Superhero.findOne({ _id: req.params.id }).exec((err, superhero) => {
    if (err) {
      return next(err);
    }
    // Successful, so send
    res.send(superhero);
  });
};

// Update superhero by id
// Route PUT /api/superhero/:id
module.exports.superhero_put = function (req, res, next) {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Superhero name can not be empty!",
    });
    return;
  }

  Superhero.updateOne({ _id: req.params.id }, { name: req.body.name }).exec(
    (err, result) => {
      if (err) {
        return next(err);
      }
      // Successful, so send
      res.send(result);
    }
  );
};

// Delete superhero by id
// Route DELETE /api/superhero/:id
module.exports.superhero_delete = function (req, res, next) {
  Superhero.deleteOne({ _id: req.params.id }).exec((err, result) => {
    if (err) {
      return next(err);
    }
    // Successful, so send
    res.send(result);
  });
};
