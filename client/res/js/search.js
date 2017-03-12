'use strict';

const noResult = "There is no result for your search";
let resultElement;

function youtubeSearch() {
  let elements = document.querySelectorAll('.youtube-search');
  elements.forEach(element => {
    element.addEventListener('click', e => {
      e.preventDefault();
      //Get the selected recipe based on the index
      let selectedRecipe = recipeList[e.srcElement.dataset.index];
      // console.log("Youtube search", selectedRecipe);
      gapi.client.setApiKey('AIzaSyAVT9yy6z0lxpG0rzGavA7iAiSacQaRkMw');
      gapi.client.load('youtube', 'v3', () => {
        makeRequest(selectedRecipe.name)
          .then(result => {
            console.log("Youtube result", result);
            //Go to card-view and find search-result
            resultElement = $(e.srcElement).parent().parent().find('.search-results');
            resultElement.empty(); //Clear the last results
            displayResults(result);
          });
      });
    })
  });
}

function displayResults(result) {
  // console.log("object", $);
  $.each(result, (index, item) => {
    const vidTitle = `<h5>` + item.snippet.title + `</h5>`;
    const vidThumburl = item.snippet.thumbnails.default.url;
    const vidThumbimg = '<div><img id="thumb" src="' + vidThumburl + '" alt="No  Image  Available." style="width:204px;height:128px"></div>';
    //Display the searched result
    if (result) {
      resultElement.append('<pre>' + vidTitle + vidThumbimg + '</pre>');
    } else {
      resultElement.append('<pre>There is no result for your search</pre>');
    }
  });
}

function makeRequest(q) {
  //Make a new Promise
  return new Promise((resolve, reject) => {
    const request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet',
      maxResults: 10
    });
    request.execute(response => {
      const srchItems = response.result.items;
      console.log(srchItems);
      resolve(srchItems);
    })
  });

}