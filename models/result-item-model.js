const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SearchItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tf_idf: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  }
});
