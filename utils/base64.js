const mime = require('mime');
const uid = require('uid');
const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
  })
  

exports.base64 =  async (base) => {

    if (base === undefined) {
        return false;
    } else {
        // to declare some path to store your converted image
        const matches = base.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};



        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];

        response.data = Buffer(matches[2], 'base64');

        let decodedImg = response;



        let imageBuffer = decodedImg.data;

        let type = decodedImg.type;

        let extension = mime.getExtension(type);

        let fileName = uid.uid();






        // const uploadParamsNormal = {
        //     Bucket: bucketName,
        //     Body: imageBuffer,
        //     Key: 'deally/'+fileName+'.'+extension
        //   };
      
      
        //   await  s3.upload(uploadParamsNormal).promise();
      
        //   fs.unlinkSync(file.path);

        fs.writeFileSync(path.join(__dirname,'..','uploads',fileName+'.'+extension), imageBuffer, 'utf8');


        console.log(path.join('..','uploads'));
        

        return `https://api.deally.fr/deally-file/${fileName}.${extension}`;

    }

}
