'use strict';

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
//const im = require('imagemagick');

const Jimp = require('jimp')

module.exports = (bucket, key) => {

    const newKey = replacePrefix(key);
    const height = 512

    return gets3Object(bucket, key).then((data) => resizer(data.Body, height)).then(buffer => puts3Object(bucket, newKey, buffer));

}
function gets3Object(bucket, key) {
    return s3.getObject({
        Bucket: bucket,
        Key: key
    }).promise();
}

function resizer(data, height) {
    return Jimp.read(data).then(image => {
        return image.resize(Jimp.AUTO, height)
            .quality(100)
            .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
                return buffer;
            })
    })
        .catch(err => err);
}

function replacePrefix(key) {
    const uploadPrefix = "uploads/";
    const ThumbnailPrefix = "thumbnails/";
    return key.replace(uploadPrefix, ThumbnailPrefix)
}
function puts3Object(bucket, key) {
    return s3.putObject({
        Body: body,
        Bucket: bucket,
        ContentType: "image/jpg",
        Key: key
    }).promise();
}

module.exports = resizer;