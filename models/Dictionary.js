const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DictionarySchema = new Schema(
  {
    wordID: {
      type: String
    },
    frequency: {
      type: String
    }
  },
  { collection: "Dictionary" }
);

module.exports = Dictionary = mongoose.model("Dictionary", DictionarySchema);
