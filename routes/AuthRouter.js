const authController = require("../controllers/AuthController");
const express = require("express");
const router = express.Router();

router.route("/verify").post(authController.verifyAuthSignature);

module.exports = router;
