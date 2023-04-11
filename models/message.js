const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String, required: true, minLength: 3, maxLength: 100 },
  user: { type: String, required: true, minLength: 1, maxLength: 100 },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
