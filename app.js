const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); // use PUT, Delete,...
const fileUpload = require("express-fileupload");

let app = express();

app.use(bodyParser.json({ limit: 10000 }));
app.use(bodyParser.urlencoded({ extended: true, limit: 10000 }));
app.use(fileUpload());
app.use(cors());

app.use(methodOverride("_method"));

const router = require("./routes");
router(app);

module.exports = app;
