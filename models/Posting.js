const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostingSchema = new Schema(
  {
    docID: {
      type: String
    },
    wordID: {
      type: String
    },
    frequency: {
      type: Number
    },
    tagscore: {
      type: Number
    },
    Position: {
      type: [Number]
    }
  },
  { collection: "Posting" }
);

module.exports = Posting = mongoose.model("Posting", PostingSchema);
