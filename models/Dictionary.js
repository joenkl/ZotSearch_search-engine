const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DictionarySchema = new Schema(
  {
    _id: {
      type: Schema.Types.wordID,
      ref: "Posting"
    },
    frequency: {
      type: Number
    }
  },
  { collection: "Dictionary" }
);

module.exports = Dictionary = mongoose.model("Dictionary", DictionarySchema);
