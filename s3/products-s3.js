const { S3 } = require('aws-sdk');

const bucketName = 'e-commerce-products-image-bucket';

const s3Upload = (file) => {
  const s3 = new S3();

  const param = {
    Bucket: bucketName,
    Key: `${file.originalname}`,
    Body: file.buffer,
  };

  return s3.upload(param).promise();
};

function getFileStream(fileKey) {
  const s3 = new S3();

  const params = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(params).createReadStream();
}

module.exports = { getFileStream, s3Upload };
