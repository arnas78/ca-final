const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const Lecture = mongoose.model("Lecture", lectureSchema);
module.exports = Lecture;
