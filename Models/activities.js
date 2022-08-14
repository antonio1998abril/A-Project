const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  observable: {
    default: "private",
    type: String,
    required: true,
  },
  dateToComplete: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  importanceLevel: {
    type: String,
    required: true,
    default: "low",
  },
  StatusDone: {
    default: false,
    type: Boolean,
    required: true,
  },
  collaborator_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("activity", activitySchema);
