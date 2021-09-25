

const axios = require('axios');




/**o
 * A Lambda function that return a presigned URL t
 */
exports.handler = async (event) => {
  
  let search;
  try{
    search= event.queryStringParameters.search
  }catch{
    search = ""
  }


  const result = await getData(search)
  const data = result.data.hits.hits

var values  = []

data.forEach(element => {
  let reg = {}
  reg['id'] = element._id
  reg['image'] = element._source.image
  reg['labels'] = element._source.label
  reg['confidence'] = element._source.confidence

  values.push(reg)
});

  console.log(JSON.stringify(values))





  result.data.hits
  return {
    statusCode: 200,
    body: JSON.stringify(values)
  }
   
};




function getData(query){
  return new Promise(resolve => {
      axios
.get(`https://search-hackhaton-whtxdclfwgwkl6fkwvfw6lxxmy.us-east-1.es.amazonaws.com/images/_search?q=${query}`, 
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