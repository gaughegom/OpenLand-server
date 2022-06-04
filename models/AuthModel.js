const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  wallet: String,
  accessToken: String,
  expired: Date
});

authSchema.methods.isValid = function () {
  console.log("valid");
};

module.exports = mongoose.model("AuthModel", authSchema);
