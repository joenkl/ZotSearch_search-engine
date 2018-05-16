const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DictionarySchema = new Schema(
  {
    _id: {
      type: String
    },
    frequency: {
      type: String
    }
  },
  { collection: "Dictionary" }
);

module.exports = Dictionary = mongoose.model("Dictionary", DictionarySchema);
