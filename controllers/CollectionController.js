const mongoose = require("mongoose");
const CollectionModel = require("../models/CollectionModel");
const { uploadFileS3 } = require("../storage/awsS3");

exports.insertCollection = async (req, res) => {
  try {
    const fileLogo = req.files.fileLogo;
    const fileBanner = req.files.fileBanner;
    const address = req.verifiedAddress;

    const { description, name, token } = req.body;

    var sendLogo;
    var sendBanner;
    if (fileLogo) {
      sendLogo = await uploadFileS3("collection/logo", fileLogo.data, token);
    }
    if (fileBanner)
      sendBanner = await uploadFileS3(
        "collection/banner",
        fileBanner.data,
        token
      );
    //

    var newCollection = {};
    if (description) {
      newCollection.description = description;
    }
    if (name) {
      newCollection.name = name;
    }
    newCollection.creator = address;
    const insertCollection = new CollectionModel(newCollection);
    const insertedCollection = await insertCollection.save();
    console.log(insertedCollection);
    res.status(200).json(insertedCollection);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
