const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  desc: {
    type: String,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  count: {
    type: Number,
    required: false,
    default: 0,
  },
  isVegan: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPopular: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  type: {
    type: String,
    required: true,
    default: "main",
  },
  id: {
    type: Number,
    required: true,
  },
});

const Meal = mongoose.model("meal", mealSchema);
module.exports = Meal;
