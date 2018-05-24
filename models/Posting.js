const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PostingSchema = new Schema(
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

PostingSchema.virtual('Location', {
  ref: "Location",
  localField: "docID",
  foreignField: "_id",
}, {toJSON: {virtual: true}});

module.exports = Posting = mongoose.model("Posting", PostingSchema);
