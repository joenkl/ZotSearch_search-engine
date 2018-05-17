const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DictionarySchema = new Schema(
  {
    _id: {
      ref: "Posting",
      type: Schema.Types.ObjectId
    },
    frequency: {
      type: Number
    }
  },
  { collection: "Dictionary" }
);

module.exports = Dictionary = mongoose.model("Dictionary", DictionarySchema);
