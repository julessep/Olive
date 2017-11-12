'use strict';

olive.controller("SingleRecipeController", function($scope, $window, $routeParams, RecipeFactory, UserFactory) {

  console.log("Single recipe ctrl loaded");
  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    console.log("user status", user);
    currentUser = UserFactory.getUser();
  });
  RecipeFactory.getSingleRecipe($routeParams.recipe_id)
  .then( (recipeData) => {
    console.log("recipe ctrl", recipeData.data.recipe);
    $scope.recipe = recipeData.data.recipe;
    $scope.ingredients = recipeData.data.recipe.ingredients;
  });

$scope.saveRecipe = (recipe) => {
  console.log("saveRecipe clicked");
  recipe.uid = currentUser;
  console.log("current user saved rec", currentUser);
  RecipeFactory.postSaveRecipe(recipe)
    .then( (data) => {
      console.log(data);
    });
  };

  $scope.recipe = () => {
    console.log("recipe");
    RecipeFactory.getCurrentRecipe();
  };

  
});
