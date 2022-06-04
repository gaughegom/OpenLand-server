const dotenv = require("dotenv");
const ethers = require("ethers");
const jwt = require("jsonwebtoken");

////////////////////////////////
const networkNotification = require("../network/notification");

dotenv.config({ path: "../config/.env" });

exports.getDigestKey = async function (req, res, next) {
  try {
    const digest = process.env.PUBLIC_DIGEST_KEY;

    return res.status(200).send(
      JSON.stringify({
        digest
      })
    );
  } catch (err) {
    return res.status(500).send(
      JSON.stringify({
        status: networkNotification.serverError.code,
        message: networkNotification.serverError.message
      })
    );
  }
};

exports.verifyAuthSignature = async function (req, res, next) {
  try {
    // hash message
    const rawDigest = process.env.PUBLIC_DIGEST_KEY;
    const rawDigestLength = new Blob([rawDigest]).size;
    let message = ethers.utils.toUtf8Bytes(
      "\x19Ethereum Signed Message:\n" + rawDigestLength + rawDigest
    );
    message = ethers.utils.keccak256(message);

    // recover signature => address
    const recoverAddress = ethers.utils.recoverAddress(
      message,
      req.body.authSignature
    );

    // generate jwt
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      address: recoverAddress
    };
    const accessToken = jwt.sign(data, jwtSecretKey);

    return res.status(200).send(JSON.stringify({ accessToken }));
  } catch (err) {
    return res.status(500).send(
      JSON.stringify({
        status: networkNotification.serverError.code,
        message: networkNotification.serverError.message
      })
    );
  }
};
