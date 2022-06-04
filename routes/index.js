const walletRouter = require("./WalletRouter");
const authRouter = require("./AuthRouter");
const imageRouter = require("./ImageRouter");

function router(app) {
  app.use("/api/wallets", walletRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/image", imageRouter);
}

module.exports = router;
