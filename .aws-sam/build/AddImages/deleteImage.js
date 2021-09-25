
const axios = require('axios');




/**o
 * A Lambda function that return a presigned URL t
 */
exports.handler = async (event) => {
  
  var search
  try{
   search = event.queryStringParameters.id
  }catch{
    return {
        statusCode: 404,
        body: "Not id"
      }
  }





  const result = await deleteData(search)


  return {
    statusCode: 200,
    body: 'delete'
  }
   
};




function deleteData(query){
  return new Promise(resolve => {
      axios
.delete('https://search-hackhaton-whtxdclfwgwkl6fkwvfw6lxxmy.us-east-1.es.amazonaws.com/images/_doc/'+query, 
 {auth: {
  username: "admin",
  password: "Admin1234#"
}}
)
.then(res => {
  //console.log(`statusCode: ${res.status}`)
  resolve(res)
})
.catch(error => {
  console.log(error)
})

  })

}