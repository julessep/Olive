'use strict';

olive.controller("RecipeController", function($scope, $window, RecipeFactory, UserFactory) {

  console.log("Recipe ctrl loaded");
  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    console.log("user status", user);
    currentUser = UserFactory.getUser();
  });

  $scope.searchText = "";

// will need to move to the controller for viewing a single recipe 
// gets recipes by recipe ID
  function fetchRecipes() {
    console.log("Fetch");
    let recipeArr = [];
    RecipeFactory.getRecipe()
    .then( (recipes) => {
      angular.forEach(recipes, function (obj){
        recipeArr.push(obj);
      });
    console.log(recipeArr);
    $scope.recipes = recipeArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  }

// searchs API by keyword
  $scope.searchAllRecipes = () => {
    console.log("search all recipes called");
    let recipeArr = [];
    RecipeFactory.searchRecipes($scope.searchText)
    .then( (recipes) => {
      angular.forEach(recipes, function (obj){
        recipeArr.push(obj);
      });
    console.log(recipeArr);
    $scope.recipes = recipeArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  };

});
