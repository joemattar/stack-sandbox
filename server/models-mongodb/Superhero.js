const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define User model from Schema
const SuperheroSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

// Virtual for user's URL
SuperheroSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/superhero/${this._id}`;
});

// Export model
module.exports = mongoose.model("Superhero", SuperheroSchema);
