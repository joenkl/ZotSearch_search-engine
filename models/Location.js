const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema(
  {
    _id: {
      type: String
    },
    url: {
      type: String
    },
    numOfTerm: {
      type: Number
    },
    title: {
      type: String
    }
  },
  { collection: "Location" }
);

module.exports = location = mongoose.model("Location", LocationSchema);
