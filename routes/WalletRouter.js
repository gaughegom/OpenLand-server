const walletController = require('../controllers/WalletController')
const express = require('express')
const router = express.Router()

router
  .route('/wallet/:id')
  .delete(walletController.removeWallet)
  .put(walletController.updateWallet)
  .get(walletController.getAWallet)
router
  .route('/wallet')
  .post(walletController.addWallet)
  .get(walletController.getAllWallets)

module.exports = router
