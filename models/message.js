const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String, required: true, minLength: 1, maxLength: 100 },
  user: { type: String, required: true, minLength: 1, maxLength: 100 },
  date: { type: Date, required: true, default: Date.now },
});

messageSchema.virtual("date_formatted").get(function () {
  let day = DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
  let hour = DateTime.fromJSDate(this.date).toISOTime();
  hour = hour.slice(0, 5);
  return hour + " " + day;
});

module.exports = mongoose.model("Message", messageSchema);
