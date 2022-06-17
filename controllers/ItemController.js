const ItemModel = require("../models/itemModel");

const networkNotification = require("../network/notification");
const { uploadFileS3, getFileStreamS3 } = require("../storage/awsS3");

const helper = require("./helper");

// get
exports.getItemByToken = async (req, res) => {
    try {
        const { token, tokenID } = req.body;
        const item = ItemModel.findOne({ token, tokenID }).exec();
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllItem = async (req, res) => {
    try {
        const allItem = await ItemModel.find({
            status: { $in: [1, 2] },
        }).exec();
        res.status(200).json(allItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getItemsByOwner = async (req, res) => {
    try {
        const { address } = req.body;
        const items = ItemModel.find({ owner: address }).exec();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
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
            owner,
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
            endAt: endAt ? new Date(+endAt) : undefined,
        };

        var ipfsUrl = await helper.getIpfs(item, imgFile);
        item.ipfsUrl = ipfsUrl;

        var newItem = new ItemModel(item);
        await newItem.save();

        res.status(200).json("newItem");
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
};
//update

exports.updatePrice = async (req, res) => {
  try {
    const {token, tokenId , price} = req.body
  item.price = price

  const updatedItem = await ItemModel.findOneAndUpdate({token,tokenId},{price})

  res.status(200).json(updatedItem);
  } catch (e) {
    res.status(500).json({message: e.message})
  }
}