const itemController = require("../controllers/ItemController");
const express = require("express");
const router = express.Router();

// router
//   .route("/:id")
//   .delete(walletController.removeWallet)
//   .put(walletController.updateWallet)
//   .get(walletController.getAWallet);
router.route("/").post(itemController.insertItem);
router.route('/status').put(itemController.updateStatus);
router.route('/price').put(itemController.updatePrice);
router.route('/owner').put(itemController.updateOwner);
// .post(itemController.addWallet)
// .put(itemController);

module.exports = router;
