const collectionController = require("../controllers/CollectionController");
const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

// router
//   .route("/:id")
//   .delete(walletController.removeWallet)
//   .put(walletController.updateWallet)
//   .get(walletController.getAWallet);
router.route("/").post(auth, collectionController.insertCollection);
router.route("/:address").get(collectionController.getCollectionsByOwner);
// .post(itemController.addWallet)
// .put(itemController);

module.exports = router;
