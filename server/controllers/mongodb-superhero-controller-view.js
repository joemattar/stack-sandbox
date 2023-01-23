const Superhero = require("../models-mongodb/Superhero");
const async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of super heroes
// Route GET /superhero
module.exports.superheroes_display_get = function (req, res, next) {
  Superhero.find({}, "name")
    .sort({ name: 1 })
    .exec(function (err, superheroes) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("superhero", {
        title: "Stack Sandbox",
        user: req.user,
        superheroes: superheroes,
      });
    });
};

// Create superhero
// Route GET /superhero/create
module.exports.superhero_create_get = function (req, res, next) {
  // Successful, so render
  res.render("superhero-form", {
    title: "Stack Sandbox",
    user: req.user,
  });
};

// Create superhero on post
// Route POST /superhero/create
module.exports.superhero_create_post = [
  // Validate and sanitize fields.
  body("name", "Superhero name must be specified").trim().isLength({ min: 1 }),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Superhero object with trimmed data.
    const superhero = new Superhero({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      res.render("superhero-form", {
        title: "Stack Sandbox",
        user: req.user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Superhero with same name already exists.
      Superhero.findOne({ name: req.body.name }).exec(
        (err, found_superhero) => {
          if (err) {
            return next(err);
          }
          if (found_superhero) {
            // Superhero exists, redirect to its detail page.
            res.redirect(found_superhero.url);
          } else {
            // Data from form is valid.
            superhero.save((err) => {
              if (err) {
                return next(err);
              }
              // Successful: redirect to new record.
              res.redirect("/superhero");
            });
          }
        }
      );
    }
  },
];

// Display superhero on get
// Route GET /superhero/:id
module.exports.superhero_display_get = function (req, res, next) {
  Superhero.findOne({ _id: req.params.id }).exec((err, superhero) => {
    if (err) {
      return next(err);
    }
    // Successful, so render
    res.render("superhero-detail", {
      title: "Stack Sandbox",
      user: req.user,
      superhero,
    });
  });
};

// Display page - edit superhero
// Route GET /superhero/:id/edit
module.exports.superhero_edit_get = function (req, res, next) {
  Superhero.findOne({ _id: req.params.id }).exec((err, superhero) => {
    if (err) {
      return next(err);
    }
    // Successful, so render
    res.render("superhero-form", {
      title: "Stack Sandbox",
      user: req.user,
      superhero,
    });
  });
};

// Update superhero on post
// Route POST /superhero/:id/edit
module.exports.superhero_edit_post = [
  // Validate and sanitize fields.
  body("name", "Superhero name must be specified").trim().isLength({ min: 1 }),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Find the superhero in db
    Superhero.findOne({ name: req.body.name }).exec(
      (err, selected_superhero) => {
        if (err) {
          return next(err);
        }

        // Create a List object with trimmed data.
        const superhero = new Superhero({
          ...selected_superhero,
          name: req.body.name,
        });

        if (!errors.isEmpty()) {
          // There are errors.
          // Render form again with sanitized values and error messages.
          res.render("superhero-form", {
            title: "Stack Sandbox",
            user: req.user,
            superhero,
            errors: errors.array(),
          });
          return;
        } else {
          // Data from form is valid.
          Superhero.updateOne(
            { _id: req.params.id },
            { name: req.body.name }
          ).exec(function (err) {
            if (err) {
              return next(err);
            }
            // Successful: redirect to new record.
            res.redirect("/superhero");
          });
        }
      }
    );
  },
];

// Delete superhero
// Route GET /superhero/:id/delete
module.exports.superhero_delete_get = function (req, res, next) {
  Superhero.deleteOne({ _id: req.params.id }).exec(function (err) {
    if (err) {
      return next(err);
    }
    // Success - go to list
    res.redirect("/superhero");
  });
};
