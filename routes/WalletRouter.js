const walletController = require("../controllers/WalletController");
const express = require("express");
const router = express.Router();

router
  .route("/:id")
  .delete(walletController.removeWallet)
  .put(walletController.updateWallet)
  .get(walletController.getAWallet);
router
  .route("/")
  .post(walletController.addWallet)
  .get(walletController.getAllWallets);

module.exports = router;
