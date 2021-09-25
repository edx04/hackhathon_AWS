// Update this variable to point to your domain.
var apigatewayendpoint = 'https://33e0t17khk.execute-api.us-east-1.amazonaws.com/search';
var loadingdiv = $('#loading');
var noresults = $('#noresults');
var resultdiv = $('#results');
var searchbox = $('input#search');
var timer = 0;

// Executes the search function 250 milliseconds after user stops typing
searchbox.keyup(function () {
  clearTimeout(timer);
  timer = setTimeout(search, 250);
});

async function search() {
  // Clear results before searching
  noresults.hide();
  resultdiv.empty();
  loadingdiv.show();
  // Get the query from the user
  let query = searchbox.val();
  // Only run a query if the string contains at least three characters
  if (query.length > 2) {
    // Make the HTTP request with the query as a parameter and wait for the JSON results
    let response = await $.get(apigatewayendpoint, { search: query }, 'json');
    // Get the part of the JSON response that we care about
    //console.log(response)
    console.log(JSON.parse(response))
    let results = JSON.parse(response);
    
    if (results.length > 0) {
      loadingdiv.hide();
      // Iterate through the results and write them to HTML
      resultdiv.append('<p>Found ' + results.length + ' results.</p>');
      for (var item in results) {
        let url = results[item].image;
        let image = results[item].image;
        let title = results[item].id;
        let labels = results[item].labels;
        //let year = results[item].confidence;
        // Construct the full HTML string that we want to append to the div
        resultdiv.append('<div class="result">' +
        '<a href="' + url + '"><img src="' +image + '" onerror="imageError(this)"></a>' +
        '<div></div><h3> <b>Labels:</b> '+labels+'   </h3><div><input type = "button" onclick = "myfunction()" id="'+title+'"value = "Delete">  </div></div>');
      }
    } else {
      noresults.show();
    }
  }
  loadingdiv.hide();
}

// Tiny function to catch images that fail to load and replace them
function imageError(image) {
  image.src = 'images/no-image.png';
}


