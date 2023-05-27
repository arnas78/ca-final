const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    default: "",
  },
  type: {
    type: String,
    required: true,
    default: "",
  },
  obj_id: {
    type: String,
    required: true,
    default: {},
  },
  weekday: {
    type: String,
    required: false,
    default: "",
  },
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
