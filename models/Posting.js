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
      type: String
    },
    tagscore: {
      type: String
    },
    Position: {
      type: String
    }
  },
  { collection: "Posting" }
);

module.exports = Posting = mongoose.model("Posting", PostingSchema);
