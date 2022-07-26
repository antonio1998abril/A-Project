const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collaboratorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role:{
    type: String,
    required: true,
  },
  imageCollaborator: {
    type: Object,
    required: true,
  }
});
module.exports = mongoose.model('collaborator',collaboratorSchema)
