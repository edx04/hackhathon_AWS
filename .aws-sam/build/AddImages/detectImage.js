const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const BUCKET_NAME = process.env.BucketName

const rekognition = new AWS.Rekognition();

const axios = require('axios')

/**o
 * A Lambda function that return a presigned URL t
 */





exports.handler = async (event) => {
    console.log(event)
    const bucket = event.Records[0].s3.bucket.name;
    console.log('bucket :' + bucket)
    console.log('key')
    console.log(event.Records[0].s3.object.key)
    //const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const key = event.Records[0].s3.object.key
    const params = {
        Image:{
            S3Object:{
                Bucket: bucket,
                Name: key
            }
        }
 
    }; 
    console.log('rekognition :')
    const data = await getLabels(params);

    const labels = []
    const confidence = []
    data['Labels'].forEach(element => {
        const {Name,Confidence} = element;
        labels.push(Name)
        confidence.push(Confidence)
        console.log(Name +" : " +Confidence)
    })
    

    //let data = await rekognition.detectLabels(params).promise();
    console.log(labels)


    const image_url = 'https://'+bucket+'.s3.amazonaws.com/'+key

    const result = await postData(image_url,labels,confidence)



    return {
        statuscode:200,
        body: result
    }
    
  
   
};
function getLabels(params){

    return new Promise(resolve =>{
        rekognition.detectLabels(params,(err,data)=>{
            if (err) console.log(err, err.stack); // an error occurred
            else resolve(data)
        })
    })
    
}


function postData(key,labels,confidence){
    return new Promise(resolve => {
        axios
  .post('https://search-hackhaton-whtxdclfwgwkl6fkwvfw6lxxmy.us-east-1.es.amazonaws.com/images/_doc', {
        image: key,
        label: labels,
        confidence: confidence
      
  }, {auth: {
    username: "admin",
    password: "Admin1234#"
  }})
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    resolve(res)
  })
  .catch(error => {
    console.log(error)
  })

    })

}
