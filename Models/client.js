const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  clientManagers: [
    {
      type:Schema.Types.ObjectId,
      ref:'clientManagers'
    }
  ],
  clientTeachLeads:[
    {
      type:Schema.Types.ObjectId,
      ref:'clientTeachLeads'
    }
  ],
});

module.exports = mongoose.model("client", clientSchema);
