const mongoose = require("mongoose");
const { Schema } = mongoose;

const Todo = new Schema({
  id: Number,
  text: String,
  done: Boolean
});

module.exports = mongoose.model("Todo", Todo);
