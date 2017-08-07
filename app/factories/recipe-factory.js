'use strict';

olive.factory("RecipeFactory", function($q, $http, FirebaseUrl, Food2ForkUrl, APICreds) {

// ********** from API ***********
// need to fetch recipes from DB for searching
// need to fetch trending recipes to populate DOM upon user login

// just to get the single recipe after initial search
let getRecipe = (recipe_id) => {
  return $q( ( resolve, reject) => {
    // do I need to put in the user search here or can I do it in a different function
    $http.get(`http://localhost:5000/api/search/${recipe_id}`)
      .then( (recipeData) => {
        console.log(recipeData.data.recipes);
        resolve(recipeData.data.recipes);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
    });
  });
};

// user searchs by keyword 
let searchRecipes = (searchText) => {
  return $q( ( resolve, reject) => {
    // do I need to put in the user search here or can I do it in a different function
    $http.get(`http://localhost:5000/api/search/'${searchText}'`)
      .then( (recipeData) => {
        console.log(recipeData.data.recipes);
        resolve(recipeData.data.recipes);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
    });
  });
};
  return {getRecipe, searchRecipes};
});

























// ****** from Firebase ******
