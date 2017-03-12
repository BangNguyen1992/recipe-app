'use strict';

// import youtubeSearch from './search.js';

const app_id = "app_id=7c45e351";
const app_key = "&app_key=eb5c841e0a771dda48ffdd188a33616f";
const range = "&from=0&to=20";
const q = "&q=";
let api;
let query;
let recipeList = [];
let template = $.templates("#template");
let test;

let Recipe = function(input, index) {
  this.index = index;
  this.name = input.recipe.label;
  this.author = input.recipe.source;
  this.imageUrl = input.recipe.image;
  this.source = input.recipe.url;
  this.ingredients = input.recipe.ingredientLines;
  this.calories = input.recipe.calories;
  this.nutrients = input.recipe.totalNutrients;
}

const form = document.querySelector('#searchForm');
form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  query = document.querySelector('#inpt_search').value;
  api = "http://api.edamam.com/search?" + app_id + app_key + range + q + query;
  // console.log(api);
  getRecipe(api);
};

let getRecipe = (api) => {
  fetch(api)
    .then(response => { return response.json() })
    .then(result => {
      recipeList = result.hits.map((item, index) => { return new Recipe(item, index) })
      loadRecipe();
    })
    .catch(err => {
      console.error(err);
    })
}

function loadRecipe() {
  $('.flex-container').empty();
  $('.flex-container').html(template.render(recipeList));
  // console.log(recipeList);
  youtubeSearch();
}

$("#inpt_search").on('focus', function() {
  $(this).parent('label').addClass('active');
});

$("#inpt_search").on('blur', function() {
  if ($(this).val().length == 0)
    $(this).parent('label').removeClass('active');
});