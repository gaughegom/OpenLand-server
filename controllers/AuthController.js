const ethers = require("ethers");

////////////////////////////////
const networkNotification = require("../network/notification");

exports.verifyAuthSignature = async function (req, res, next) {
  try {
    // recover signature => address
    const recoverAddress = ethers.utils.verifyMessage(
      req.body.nonce,
      req.body.signature
    );

    // generate jwt
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      address: recoverAddress
    };
    const accessToken = jwt.sign(data, jwtSecretKey, { expiresIn: "2h" });

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
