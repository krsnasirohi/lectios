// Update this variable to point to your domain.
var apigatewayendpoint = '<Enter your API gateway endpoint URL here. See intructions>';
var loadingdiv = $('#loading');
var noresults = $('#noresults');
var resultdiv = $('#results');
var searchbox = $('input#search');

async function search() {
  if (event.key === "Enter" || event.type==="click") {

    // Clear results before searching
    noresults.hide();
    resultdiv.empty();
    loadingdiv.show();

    // Get the query from the user
    let query = searchbox.val().toLowerCase();

    // Only run a query if the string contains at least three characters
    if (query.length > 2) {

      // Make the HTTP request with the query as a parameter and wait for the JSON results
      let response = await $.get(apigatewayendpoint, {  school: "<enter your partition key in DynamoDB here. See intructions.>", expression: query, size: 5 }, 'json');

      // Get the part of the JSON response that we care about
      let results = response;

      if (results.length > 5) {
        results = results.slice(0,5);
      } 
      if (results.length > 0) {

        loadingdiv.hide();

        // Iterate through the results and write them to HTML
        resultdiv.append('<p class="mt-3" style="color:gray; font-family:Inconsolata">Found ' + results.length + ' results.</p>');

        for (var item in results) {

          let fetchRes = await fetch( "https://www.googleapis.com/books/v1/volumes?q=intitle:"+results[item].title);
	        let res = await fetchRes.json();
          let accnumber = results[item].accno;
	        var item = res.items[0];
          let url = item.volumeInfo.canonicalVolumeLink;
	        let image = ''; 

          if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
		        image = item.volumeInfo.imageLinks.thumbnail;
	        } else {
		        image = 'images/no-image.png';
	        }

          let title = item.volumeInfo.title;
          let description = item.volumeInfo.description;
          let author = item.volumeInfo.authors;
	        let year = ''; 

          if (item.volumeInfo.publishedDate) {
		        year = item.volumeInfo.publishedDate.substring(0,4);
	        } else {
		        year = 'Unavailable';
	        }

          let rating = item.volumeInfo.averageRating || 'Unavailable';

          // Construct the full HTML string that we want to append to the div
          resultdiv.append('<div class="result1 card m-1 p-3 bg-dark" id="1resultcard" style="border: 2px solid gray;"><div class="card-body row" id="resultcard">' +
          '<div class="col-md-3 col-sm-12 p-1" id="1resultcard"><img class="img-fluid img-thumbnail" src="' + image + '" onerror="imageError(this)"></div>' +
          '<div class="col-md-9 col-sm-12 p-1" id="1resultcard"><h2 style="color:#e8e4dc; font-family:Inconsolata"><a target = "_blank" href="' + url + '" style="color:beige">' + title + '</a></h2><p style="color:#E8E4DC; font-family:Inconsolata">Author: ' + author + 
          ' </p><p style="color:#e8e4dc; font-family:Inconsolata">Description: ' + description + ' </p><p style="color:#e8e4dc; font-family:Inconsolata">Published year: ' + year + ' </p><p style="color:#e8e4dc; font-family:Inconsolata">Rating: ' + rating + ' </p><p style="color:#e8e4dc; font-family:Inconsolata">Accesion number: ' + accnumber + ' </p></div></div></div>');
	
	        //ending callback after fetch
        } //end for loop
      } else {
        resultdiv.append('<p id="noresults" class="mt-3" style="color:gray; font-family:Inconsolata">No results. Try another search term.</p>');
      }
    }

    loadingdiv.hide();

  // end if key=enter
  }

}

// Tiny function to catch images that fail to load and replace them
function imageError(image) {
  image.src = 'images/no-image.png';
}

