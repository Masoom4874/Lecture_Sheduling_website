import awsSDK from "aws-sdk";

const S3 = new awsSDK.S3({
  signatureVersion: "v4",
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  region: process.env.REGION,
  apiVersion: "latest",
});

export const uploadToS3Bucket = async (fileName, file) => {
  let ext = fileName.split(".").pop();
  let random = Math.floor(Math.random() * 900000000000);
  fileName = random + "." + ext;
  return new Promise((resolve, reject) => {
    S3.upload(
      {
        Key: fileName,
        Bucket: process.env.BUCKETNAME,
        ACL: process.env.FILEPERMISSION,
        Body: file,
      },
      (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
    );
  });
};