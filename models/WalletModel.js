const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  address: String,
  displayName: String,
  imageURL: String,
  bannerUrl: String,
  description: String
});

walletSchema.methods.isValid = function () {
  console.log("valid");
};

module.exports = mongoose.model("Wallet", walletSchema);
