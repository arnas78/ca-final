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
    type: Array,
    required: false,
  },
  desc: {
    type: Array,
    required: true,
  },
});

const Lecture = mongoose.model("Lecture", lectureSchema);
module.exports = Lecture;
