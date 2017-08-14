'use strict';

olive.controller("HomeBrowseController", function($scope, $window, RecipeFactory, UserFactory) {

  console.log("Recipe ctrl loaded");
  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    console.log("user status", user);
    currentUser = UserFactory.getUser();
    $scope.fetchTrendingRecipes();
  });

  $scope.searchText = "";

  $scope.fetchTrendingRecipes = () => {
    console.log("trending recipes called");
    let trendsArr = [];
    RecipeFactory.getTrendingRecipes()
    .then( (recipes) => {
      angular.forEach(recipes, function (obj){
        trendsArr.push(obj);
      });
    console.log(trendsArr);
    $scope.recipes = trendsArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  };

// searchs API by keyword
  $scope.searchAllRecipes = () => {
    console.log("search all recipes called");
    let recipesArr = [];
    RecipeFactory.searchRecipes($scope.searchText)
    .then( (recipes) => {
      angular.forEach(recipes, function (obj){
        recipesArr.push(obj);
      });
    console.log(recipesArr);
    $scope.recipes = recipesArr;
    })
    .catch( (err) => {
      console.log("error!", err);
    });
  };

  $scope.setRecipeId = (id) => {
    RecipeFactory.getSingleRecipe(id)
    .then( (data) => {
    });
  };

  $scope.viewRecipe = (recipeId) => {
        console.log("viewRecipe clicked");
    $window.location.href = `#!/browse/${recipeId}`;
  };

  $scope.saveRecipe = (recipe) => {
    console.log("saveRecipe clicked");
    recipe.uid = currentUser;
    console.log("current user saved rec", currentUser);
    RecipeFactory.postSaveRecipe(recipe)
    .then( (data) => {
      console.log(data);
    });
  };
});
