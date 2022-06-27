const mongoose = require("mongoose");
const WalletModel = require("../models/WalletModel");
const { uploadFileS3 } = require("../storage/awsS3");

exports.getAWallet = async (req, res) => {
  try {
    var { address } = req.params;

    address = address.toLowerCase();

    var wallet = await WalletModel.findOne({ address }).lean().exec();
    if (wallet) {
      res.status(200).json(wallet);
    } else {
      var newWallet = new WalletModel({
        address
      });
      await newWallet.save();
      res.status(200).json(newWallet);
    }
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
};

exports.updateWallet = async (req, res) => {
  // lay thong req
  const address = req.verifiedAddress;
  const fileAvt = req.files?.fileAvt;
  const fileBanner = req.files?.fileBanner;
  const displayName = req.body.displayName;
  const description = req.body.description;
  const email = req.body.email;

  // lay upload
  var sendAvt;
  var sendBanner;
  if (fileAvt) {
    sendAvt = await uploadFileS3("wallet/avatar", fileAvt.data, address);
  }
  if (fileBanner)
    sendBanner = await uploadFileS3("wallet/banner", fileBanner.data, address);

  // update info
  var newWallet = {};
  if (displayName) {
    newWallet.displayName = displayName;
  }
  if (description) {
    newWallet.description = description;
  }
  if (email) {
    newWallet.email = email;
  }
  if (sendAvt) {
    newWallet.imageUrl = sendAvt.Location;
    console.log("set newWallet imageUrl");
  }
  if (sendBanner) {
    newWallet.bannerUrl = sendBanner.Location;
  }
  // find and update
  const updatedWallet = await WalletModel.findOneAndUpdate(
    { address },
    newWallet,
    { new: true }
  );
  res.status(200).json(updatedWallet);
};

// const mongoose = require("mongoose");
// const Wallet = require("../models/WalletModel");
// const dotenv = require("dotenv");
// ////////////////////////////////
// const networkNotification = require("../network/notification");

// dotenv.config({ path: "../.env" });

// exports.getAllWallets = async (req, res, next) => {
//   try {
//     const wallets = await Wallet.find();

//     return res.status(200).send(
//       JSON.stringify({
//         status: networkNotification.success.code,
//         message: networkNotification.success.message,
//         token: "Test token",
//         data: wallets
//       })
//     );
//   } catch (err) {
//     return res.status(500).send(
//       JSON.stringify({
//         status: networkNotification.serverError.code,
//         message: networkNotification.serverError.message,
//         token: "Test token"
//       })
//     );
//   }
// };

// exports.addWallet = async (req, res, next) => {
//   try {
//     const newWallet = { ...req.body.wallet };

//     if (Wallet.isValidWallet(newWallet)) {
//       const savedWallet = new Wallet(newWallet);
//       await savedWallet.save();

//       return res.status(200).send(
//         JSON.stringify({
//           status: networkNotification.success.code,
//           message: networkNotification.success.message,
//           token: "Test token",
//           data: savedWallet
//         })
//       );
//     } else {
//       return res.status(500).send(
//         JSON.stringify({
//           status: networkNotification.success.code,
//           message: networkNotification.success.message,
//           token: "Test token",
//           data: null
//         })
//       );
//     }
//   } catch (err) {
//     return res.status(501).send(
//       JSON.stringify({
//         status: networkNotification.serverError.code,
//         message: networkNotification.serverError.message,
//         token: "Test token"
//       })
//     );
//   }
// };

// exports.getAWallet = async (req, res, next) => {
//   try {
//     const ObjectId = mongoose.Types.ObjectId;
//     const id = req.params.id;

//     if (ObjectId.isValid(id)) {
//       const wallet = await Wallet.findById(id);

//       return res.status(200).send(
//         JSON.stringify({
//           status: networkNotification.success.code,
//           message: networkNotification.success.message,
//           token: "Test token",
//           data: wallet
//         })
//       );
//     } else {
//       return res.status(404).send(
//         JSON.stringify({
//           status: networkNotification.serverError.code,
//           message: networkNotification.serverError.message
//         })
//       );
//     }
//   } catch (err) {
//     return res.status(501).send(
//       JSON.stringify({
//         status: networkNotification.serverError.code,
//         message: networkNotification.serverError.message,
//         token: "Test token"
//       })
//     );
//   }
// };

// exports.updateWallet = async (req, res, next) => {
//   try {
//     const editWallet = { ...req.body.wallet };
//     const id = req.params.id;
//     const ObjectId = mongoose.Types.ObjectId;

//     if (ObjectId.isValid(id)) {
//       if (Wallet.isValidWallet(editWallet)) {
//         const editedWallet = await Wallet.findByIdAndUpdate(id, editWallet);

//         return res.status(200).send(
//           JSON.stringify({
//             status: networkNotification.success.code,
//             message: networkNotification.success.message,
//             token: "Test token",
//             data: editedWallet
//           })
//         );
//       } else {
//         return res.status(500).send(
//           //
//           JSON.stringify({
//             status: networkNotification.success.code,
//             message: networkNotification.success.message,
//             token: "Test token",
//             data: null
//           })
//         );
//       }
//     } else {
//       return res.status(404).send(
//         JSON.stringify({
//           status: networkNotification.serverError.code,
//           message: networkNotification.serverError.message
//         })
//       );
//     }
//   } catch (err) {
//     return res.status(500).send(
//       JSON.stringify({
//         status: networkNotification.serverError.code,
//         message: networkNotification.serverError.message,
//         token: "Test token"
//       })
//     );
//   }
// };

// exports.removeWallet = async (req, res) => {
//   try {
//     const ObjectId = mongoose.Types.ObjectId;
//     const id = req.params.id;

//     if (ObjectId.isValid(id)) {
//       await Wallet.findByIdAndDelete(id);

//       return res.status(200).send(
//         JSON.stringify({
//           status: networkNotification.success.code,
//           message: networkNotification.success.message,
//           token: "Test token",
//           data: null
//         })
//       );
//     } else {
//       return res.status(404).send(
//         JSON.stringify({
//           status: networkNotification.serverError.code,
//           message: networkNotification.serverError.message
//         })
//       );
//     }
//   } catch (err) {
//     return res.status(500).send(
//       JSON.stringify({
//         status: networkNotification.serverError.code,
//         message: networkNotification.serverError.message,
//         token: "Test token"
//       })
//     );
//   }
// };
