const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
  requirements: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  posted: {
    type: String,
    required: true,
  },
  payrange: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
