const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const Wallet = require("./models/WalletModel");
const https = require("https");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: "./.env" });
const port = process.env.DEFAULT_PORT || 5000;

// const DB = process.env.DATABASE_DOMAIN.replace(
//   '<password>',
//   process.env.DATABASE_PASSWORD
// )
const DB = process.env.DATABASE_LOCAL;

// TODO:console
console.log("db", DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); // start the server

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem"))
  },
  app
);

sslServer.listen(4433, () => console.log("Server enable https"));
