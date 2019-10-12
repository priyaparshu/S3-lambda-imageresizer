# S3-lambda-imageresizer

In this Application we will build a Lambda app that gets images from a URL, resize it and uploads it to an s3 bucket.
In IamRoleStatement we provide the necessary permissions to Lambda to access other AWS resources such as write to S3 bucket.We have a function called fetchImage that is
responsible for getting the image from URL.We use Jimp Package to resize and then upload it to S3 bucket using putObject method of AWS sdk.


curl -H "Content-type: application/json" -d '{"photoUrl" : "https://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg"}' 'https://<endpoint>'
