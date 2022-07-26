const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  action: {
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
  Status: {
    default: false,
    type: Boolean,
    required: true,
  },
  collaborator_id: {
    type: Schema.Types.ObjectId,
    ref: "collaborator",
  },
});
module.exports = mongoose.model("activity", activitySchema);
