const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  work_email: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  personal_number: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
