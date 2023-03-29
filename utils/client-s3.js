require('dotenv').config({
    path:'./.env'
});

const AWS = require('aws-sdk');

exports.getClient = dirName => new AWS.S3({
    bucketName: process.env.AWS_BUCKET,
    dirName: dirName,
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});