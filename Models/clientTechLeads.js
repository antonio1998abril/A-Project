const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientTechLeadSchema = new Schema({
    projectTechLeadName: {
    type: String,
    required: true,
  },
  projectTechLeadLastName: {
    type:String,
    required:true
  },
});

module.exports = mongoose.model("clientTechLeads", clientTechLeadSchema);