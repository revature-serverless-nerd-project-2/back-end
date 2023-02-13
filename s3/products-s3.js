const { S3 } = require('aws-sdk');

const bucketName = 'e-commerce-products-image-bucket';

function getFileStream(fileKey) {
  const s3 = new S3();

  const params = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(params).createReadStream();
}

module.exports = { getFileStream };
