require("dotenv").config({ path: "../.env" });
const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ID,
  secretAccessKey: process.env.AWS_S3_SECRET
});

/**
 * Prefix: để chỉ rõ cho từng mục để lưu ảnh (ví dụ avatar user sẽ có prefix là `user`)
 * Upload sẽ tự động override file có key cũ, nên ko cần xóa để thêm lại
 * (ví dụ avatar sẽ lưu với key là `wallet/avatar/${address}` hay `wallet/banner/${address}`)
 * Sử dụng kèm middleware để có address để upload
 * LƯU Ý: Dùng postman gửi bằng form-data
 */
exports.uploadFileS3 = function (prefix, buffer, postKey) {
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: buffer,
    Key: `${prefix}/${postKey}`
  };

  return s3.upload(uploadParams).promise();
};

/**
 * Dùng key đã sử dụng ở uploadParams phía trên để lấy stream object
 * Hiện có 1 key test/giftdemo.jpg ở storage có thể lấy test thử hoặc upload 1 file mới
 */
exports.getFileStreamS3 = function (key) {
  const getParams = {
    Key: key,
    Bucket: process.env.AWS_S3_BUCKET_NAME
  };

  return s3.getObject(getParams).createReadStream();
};
