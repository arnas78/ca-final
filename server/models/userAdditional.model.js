const mongoose = require("mongoose");

const userAdditionalSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  vacation_days: {
    type: Number,
    required: false,
    default: 0,
  },
  shirt_size: {
    type: String,
    required: false,
    default: "",
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  personal_email: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  car: {
    type: String,
    required: false,
    default: "",
  },
  github: {
    type: String,
    required: false,
    default: "",
  },
  linkedin: {
    type: String,
    required: false,
    default: "",
  },
  bank_name: {
    type: String,
    required: false,
    default: "",
  },
  bank_number: {
    type: String,
    required: false,
    default: "",
  },
  image: {
    type: String,
    required: false,
    default:
      "https://res.cloudinary.com/dqcj3vyhm/image/upload/v1673595155/r6w23ygddxuhy4uerbby.png",
  },
});

const UserAdditional = mongoose.model("userAdditional", userAdditionalSchema);
module.exports = UserAdditional;
