const mongoose = require("mongoose");

const vacationSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
});

const Vacation = mongoose.model("vacation", vacationSchema);
module.exports = Vacation;
