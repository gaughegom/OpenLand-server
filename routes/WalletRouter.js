const walletController = require("../controllers/WalletController");
const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.route("/:address").get(walletController.getAWallet);
router.route("/").put(auth, walletController.updateWallet);
//   .delete(walletController.removeWallet)
//   .put(walletController.updateWallet)
//   .get(walletController.getAWallet);
// router
//   .route("/")
//   .post(walletController.addWallet)
//   .get(walletController.getAllWallets);

module.exports = router;
