const imageController = require("../controllers/ImageController");
const express = require("express");
const router = express.Router();

router.route("/test").post(imageController.uploadImageTest);
router.route("/").get(imageController.getStreamObject);

module.exports = router;
