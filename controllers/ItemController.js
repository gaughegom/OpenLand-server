const { default: axios } = require("axios");
const ItemModel = require("../models/itemModel");

const networkNotification = require("../network/notification");
const { uploadFileS3, getFileStreamS3 } = require("../storage/awsS3");

const helper = require("./helper");

// get
exports.getItemByTokenId = async (req, res) => {
    try {
        const { token, tokenId } = req.params;

        const item = await ItemModel.aggregate([
            {
                $lookup: {
                    from: "collections",
                    localField: "token",
                    foreignField: "token",
                    as: "collectionName",
                },
            },
            {
                $match: {
                    token,
                    tokenId,
                },
            },
            {
                $set: {
                    collectionName: {
                        $arrayElemAt: ["$collectionName.name", 0],
                    },
                },
            },
        ]).exec();

        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getItemByToken = async (req, res) => {
    try {
        const { token } = req.params;
        const items = await ItemModel.aggregate([
            {
                $lookup: {
                    from: "collections",
                    localField: "token",
                    foreignField: "token",
                    as: "collectionName",
                },
            },
            {
                $match: {
                    token,
                },
            },
            {
                $set: {
                    collectionName: {
                        $arrayElemAt: ["$collectionName.name", 0],
                    },
                },
            },
        ]).exec();

        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllItem = async (req, res) => {
    try {
        const allItems = await ItemModel.aggregate([
            {
                $lookup: {
                    from: "collections",
                    localField: "token",
                    foreignField: "token",
                    as: "collectionName",
                },
            },
            {
                $set: {
                    collectionName: {
                        $arrayElemAt: ["$collectionName.name", 0],
                    },
                },
            },
        ]).exec();
        res.status(200).json(allItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    // ItemModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "wallets",
    //       localField: "owner",
    //       foreignField: "address",
    //       as: "ownerInfo"
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "collections",
    //       localField: "token",
    //       foreignField: "token",
    //       as: "collectionInfo"
    //     }
    //   }
    // ]).exec((err, result) => {
    //   if (err) {
    //     console.log("error", err);
    //   }
    //   if (result) {
    //     res.status(200).json(result);
    //   }
    // });
};

exports.getItemsByOwner = async (req, res) => {
    try {
        const { address } = req.params;
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
            tokenId,
        } = req.body;
        console.log(req.body);

        properties = JSON.parse(properties);

        var imgFile = req.files.file;
        var sendImg = await uploadFileS3("item", imgFile.data, tokenId);
        var thumbLink = sendImg.Location;

        var item = {
            name,
            thumbLink,
            price,
            description,
            properties,
            tokenId: tokenId,
            token: collectionAddress,
            owner: owner.toLowerCase(),
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
        const { token, tokenId, price } = req.body;

        const updatedItem = await ItemModel.findOneAndUpdate(
            { token, tokenId },
            { price },
            { new: true }
        );

        res.status(200).json(updatedItem);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { token, tokenId, status } = req.body;

        const updatedItem = await ItemModel.findOneAndUpdate(
            { token, tokenId },
            { status },
            { new: true }
        );

        res.status(200).json(updatedItem);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.updateOwner = async (req, res) => {
    try {
        const { token, tokenId, owner } = req.body;

        const updatedItem = await ItemModel.findOneAndUpdate(
            { token, tokenId },
            { owner: owner.toLowerCase() },
            { new: true }
        );

        res.status(200).json(updatedItem);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.getIpfs = async (req, res) => {
    try {

        const {cid} = req.params

        const handledUrl = `https://${cid}.ipfs.nftstorage.link/metadata.json`;

        const result = await axios.get(handledUrl);

        console.log(result)

        res.status(200).json(result.data);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
