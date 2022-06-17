const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const itemSchema = new mongoose.Schema({
  thumbLink: String,
  name: String,
  token: String,
  tokenId: String,
  price: String,
  // creator: String,
  owner: String,
  owneDisplay: String,
  ipfsUrl: String,
  status: String,
  endAt: Date
});

// authSchema.methods.isValid = function () {
//   console.log("valid");
// };

module.exports = mongoose.model("Item", itemSchema);
