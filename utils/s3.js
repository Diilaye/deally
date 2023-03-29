require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3');
const path = require('path');

const randomstring = require('randomstring');



const bucketName = process.env.AWS_BUCKET
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
exports.uploadFile = async (file) =>  {

  const fileName = 'deally/'+randomstring.generate() + path.extname(file.path);

  const fileStream = fs.createReadStream(file.path)

    const uploadParamsNormal = {
      Bucket: bucketName,
      Body: fileStream,
      Key: fileName
    };


    await  s3.upload(uploadParamsNormal).promise();

    fs.unlinkSync(file.path);

  return fileName;
}
