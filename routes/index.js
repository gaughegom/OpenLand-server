const walletRouter = require("./WalletRouter");
const authRouter = require("./AuthRouter");
const imageRouter = require("./ImageRouter");
const itemRouter = require("./ItemRouter");
const collectionRouter = require("./CollectionRouter");

function router(app) {
  app.use("/api/wallet", walletRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/image", imageRouter);
  app.use("/api/item", itemRouter);
  app.use("/api/collection", collectionRouter);
}

module.exports = router;
