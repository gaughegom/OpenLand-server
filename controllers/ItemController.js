const ItemModel = require("../models/itemModel");

const networkNotification = require("../network/notification");
const { uploadFileS3, getFileStreamS3 } = require("../storage/awsS3");

const helper = require("./helper");

// get
exports.getItemByToken = async (req, res) => {};

exports.getAllItem = async (req, res) => {};

exports.getItemsByFilter = async (req, res) => {};
//-----------
//insert
exports.insertItem = async (req, res) => {
  try {
    var {
      name,
      price,
      description,
      properties,
      collectionAddress,
      status,
      endAt,
      owner
    } = req.body;
    console.log(req.body);

    var hardcodeTokenId = "adfds";
    var hardcodeOwnerAddress = "asdfsdf32342234s";

    properties = JSON.parse(properties);

    var imgFile = req.files.file;
    var sendImg = await uploadFileS3("item", imgFile.data, hardcodeTokenId);
    var thumbLink = sendImg.Location;

    var item = {
      name,
      thumbLink,
      price,
      description,
      properties,
      tokenID: hardcodeTokenId,
      token: collectionAddress,
      owner,
      status,
      endAt: endAt ? new Date(+endAt) : undefined
    };

    var ipfsUrl = await helper.getIpfs(item, imgFile);
    item.ipfsUrl = ipfsUrl;

    var newItem = new ItemModel(item);
    await newItem.save();

    res.status(200).json("newItem");
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
};
