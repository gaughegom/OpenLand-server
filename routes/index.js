const walletRouter = require("./WalletRouter");
const authRouter = require("./AuthRouter");

function router(app) {
  app.use("/api/wallets", walletRouter);
  app.use("/api/auth", authRouter);
}

module.exports = router;
