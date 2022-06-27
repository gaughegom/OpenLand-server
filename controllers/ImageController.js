const networkNotification = require("../network/notification");
const { uploadFileS3, getFileStreamS3 } = require("../storage/awsS3");

//TODO: for only test MUST BE REMOVED LATER
exports.uploadImageTest = async function (req, res, next) {
  try {
    const file = req.files.file;

    const sendData = await uploadFileS3("test", file.data, file.name);

    console.log(sendData);

    return res.status(200).send();
  } catch (err) {
    return res.status(500).send(
      JSON.stringify({
        status: networkNotification.serverError.code,
        message: networkNotification.serverError.message
      })
    );
  }
};

exports.getStreamObject = async function (req, res, next) {
  try {
    const key = req.query.key;
    const data = getFileStreamS3(key);

    res.set("Content-Type", "image/jpeg");
    res.set("Content-Type", "image/jpg");
    res.set("Content-Type", "image/png");
    data.pipe(res);
  } catch (err) {
    return res.status(500).send(
      JSON.stringify({
        status: networkNotification.serverError.code,
        message: networkNotification.serverError.message
      })
    );
  }
};
