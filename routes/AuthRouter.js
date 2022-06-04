const authController = require("../controllers/AuthController");
const express = require("express");
const router = express.Router();

router.route("/digest").get(authController.getDigestKey);

module.exports = router;
