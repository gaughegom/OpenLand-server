const mongoose = require("mongoose");
const CollectionModel = require("../models/CollectionModel");
const WalletModel = require("../models/WalletModel");
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
            sendLogo = await uploadFileS3(
                "collection/logo",
                fileLogo.data,
                token
            );
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
        if (sendBanner) newCollection.bannerUrl = sendBanner.Location;
        if (sendLogo) newCollection.logoUrl = sendLogo.Location;
        newCollection.token = token;
        newCollection.creator = address.toLowerCase();
        const insertCollection = new CollectionModel(newCollection);
        const insertedCollection = await insertCollection.save();
        console.log(insertedCollection);
        res.status(200).json(insertedCollection);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.getAllCollections = async (req, res) => {
    try {
        const collections = await CollectionModel.aggregate([
            {
                $lookup: {
                    from: "wallets",
                    localField: "creator",
                    foreignField: "address",
                    as: "creatorDisplayName",
                },
            },
            {
                $set: {
                    creatorDisplayName: {
                        $arrayElemAt: ["$creatorDisplayName.displayName", 0],
                    },
                },
            },
        ]).exec();

        res.status(200).json(collections);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
exports.getCollectionsByOwner = async (req, res) => {
    try {
        const { owner } = req.params;
        const ownerLowwerCase = owner.toLowerCase();
        const collections = await CollectionModel.aggregate([
            {
                $lookup: {
                    from: "wallets",
                    localField: "creator",
                    foreignField: "address",
                    as: "creatorDisplayName",
                },
            },
            {
                $match: {
                    creator: ownerLowwerCase,
                },
            },
            {
                $set: {
                    creatorDisplayName: {
                        $arrayElemAt: ["$creatorDisplayName.displayName", 0],
                    },
                },
            },
        ]).exec();
        res.status(200).json(collections);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
exports.getCollectionsByToken = async (req, res) => {
    try {
        const { token } = req.params;

        const collections = await CollectionModel.aggregate([
            {
                $match: {
                    token,
                },
            },
            {
                $lookup: {
                    from: "wallets",
                    localField: "creator",
                    foreignField: "address",
                    as: "creatorDisplayName",
                },
            },
            {
                $set: {
                    creatorDisplayName: {
                        $arrayElemAt: ["$creatorDisplayName.displayName", 0],
                    },
                },
            },
        ]).exec();

        res.status(200).json(collections);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
