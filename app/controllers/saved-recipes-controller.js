'use strict';

olive.controller("SavedRecipesController", function($scope, $window, RecipeFactory, UserFactory) {

console.log("SavedRecipe ctrl loaded");

  let currentUser = null;

  UserFactory.isAuthenticated()
  .then( (user) => {
    console.log("user status", user);
    currentUser = UserFactory.getUser();
    fetchSaved();
    // $scope.deleteSaved();
  });

function fetchSaved() {
  let savedArr = [];
  console.log("Fetch");
  RecipeFactory.getSavedList(currentUser)
  .then( (savedList) => {
    // console.log("saved Data", savedList);
    let savedData = savedList.data;
    Object.keys(savedData).forEach( (key) => {
      savedData[key].id = key;
      savedArr.push(savedData[key]);
      console.log(key);
    });
    $scope.savedRecipes = savedArr;
    console.log($scope.savedRecipes);
  })
  .catch( (err) => {
    console.log("can't fetch saved recipes", err);
  });

}

$scope.deleteSaved = (savedId) => {
  console.log("delete called", savedId);
  RecipeFactory.deleteSavedRecipe(savedId)
    .then((data) => {
        console.log("removed", data);
        fetchSaved(currentUser);
    });
};

$scope.viewRecipe = (recipeId) => {
      console.log("viewRecipe clicked");
  $window.location.href = `#!/saved/${recipeId}`;
};
// $scope.saveRecipeBox = (savedId) => {
//     savedId.savedId = 
//         RecipeFactory.setSavedId(savedId);
//         console.log("savedId in saved controller", savedId);
//     };
});