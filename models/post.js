const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "general",
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: () => new Date(),
  },
});
module.exports = mongoose.model("Post", postSchema);
