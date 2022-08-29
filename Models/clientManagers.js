const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientManagersSchema = new Schema({
  clientManagerName: {
    type: String,
    required: true,
  },
  clientManagerLastName: {
    type:String,
    required:true
  },

});

module.exports = mongoose.model("clientManagers", clientManagersSchema);
