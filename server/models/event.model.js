const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  date: {
    type: String,
    required: true,
    default: "",
  },
  place: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  tags: {
    type: Array,
    required: false,
    default: [],
  },
  image: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/dqcj3vyhm/image/upload/v1684690263/conference-1_zgorc1.jpg",
  },
});

const Event = mongoose.model("event", eventSchema);
module.exports = Event;
