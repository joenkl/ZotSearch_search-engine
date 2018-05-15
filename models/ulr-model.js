const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema(
  {
    docid: {
      type: String
    },
    url: {
      type: String
    }
  },
  { collection: "urlTab" }
);

module.exports = urlTab = mongoose.model("Url", UrlSchema);
