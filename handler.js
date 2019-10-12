'use strict';

const AWS = require('aws-sdk');
const uuid = reuire('uuid/v4');
const Jimp = require('jimp');
const s3 = new AWS.S3();
const width = 200;
const height = 200;
const imageType = "image/png";
const bucket = process.env.Bucket;

module.exports.uploadImage = async (event, context) => {
  let requestBody = JSON.parse(event.body);
  let photoURL = requestBody.photoURL;
  let objectId = uuid();
  let objectKey = `resize-${width}X${height}-${objectId}.png`

  function fetchImage(url) {
    return Jimp.read(url)
  }

  function uploadToS3(data, key) {
    return s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: imageType
    }).promise()
  }

  fetchImage(photoURL)
    .then((image) => image.resize(width, height))
    .getBufferAsync(imageType)
    .then(resizedBuffer => uploadToS3(resizedBuffer, objectKey))
    .then(function (response) {
      console.log(`Image ${objectKey} was uploaded and resized`)
    }).catch(err => console.log(err));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Image ${objectKey} was uploaded and resized`,
      input: event,
    })
  };


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
