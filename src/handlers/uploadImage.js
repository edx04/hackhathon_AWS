const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const BUCKET_NAME = process.env.BucketName
const URL_EXPIRATION_SECONDS = 300

/**o
 * A Lambda function that return a presigned URL t
 */
exports.handler = async (event) => {
  

  return {
    statusCode: 200,
    body: await generateUrl()
  }
   
};


async function generateUrl(){
  const randomID = parseInt(Math.random() * 10000000)
  const Key = `${randomID}.jpg`
  const s3Params = {
    Bucket: BUCKET_NAME,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  }


  const url = await s3.getSignedUrlPromise('putObject', s3Params)
  
  console.log(url)
  return JSON.stringify({
    uploadURL: url,
    Key
  })
}