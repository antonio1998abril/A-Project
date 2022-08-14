const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  status: {
    type:String,
    default:"public"
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userImage: {
    type: Object,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Collaborator",
  },
  manager: {
    type:Object,
    required:false
  },
  notifications: {
    type: Array,
    default: [],
  },
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
