const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
module.exports = mongoose.model("Post", postSchema);
