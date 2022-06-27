const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const collectionSchema = new mongoose.Schema({
  token: String,
  name: String,
  creator: String,
  logoUrl: String,
  bannerUrl: String,
  amount: Number,
  description: String
});

module.exports = mongoose.model("Collection", collectionSchema);
