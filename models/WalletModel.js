const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({
  address: String,
  displayName: String,
  imageURL: String,
  description: String,
})

const Wallet = mongoose.model('Wallet', walletSchema)
module.exports = Wallet
// method
module.exports.isValidWallet = (newValid) => {
  //
  return true
}