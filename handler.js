'use strict';
const AWS = require('aws-sdk');
const resizer = require('./resizer')

module.exports.resizer = (event, context, cb) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(event.Records[0].s3);
  console.log(event.Records[0].s3.bucket.name);
  console.log(event.Records[0].s3.object.key);

  resizer(bucket, key).then(() => {
    console.log("Thumbnail was created");
    cb(null, { message: 'The thumbnail was created' })

  }).catch(err => {
    console.log(err);
    cb(err)
  })
};

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

