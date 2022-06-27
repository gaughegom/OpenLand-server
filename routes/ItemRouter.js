const itemController = require("../controllers/ItemController");
const express = require("express");
const router = express.Router();

// router
//   .route("/:id")
//   .delete(walletController.removeWallet)
//   .put(walletController.updateWallet)
//   .get(walletController.getAWallet);
router.route("/").post(itemController.insertItem);
router.route("/all").get(itemController.getAllItem);
router.route("/status").put(itemController.updateStatus);
router.route("/price").put(itemController.updatePrice);
router.route("/owner").put(itemController.updateOwner);
router.route("/detail/:token/:tokenId").get(itemController.getItemByTokenId)
router.route("/token/:token").get(itemController.getItemByToken)
router.route("/owner/:owner").get(itemController.getItemsByOwner)
router.route("/ipfs/:cid").get(itemController.getIpfs)

// .post(itemController.addWallet)
// .put(itemController);

module.exports = router;
