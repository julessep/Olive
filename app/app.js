'use strict';

let olive = angular.module("Olive", ["ngRoute"])
.constant('FirebaseUrl', 'https://olive-e9b6c.firebaseio.com/')
.constant("Food2ForkUrl", "http://food2fork.com/api/");

let isAuth = (UserFactory)  => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
      .then( (userBoolean) => {
        if (userBoolean) {
            resolve();
        } else {
            reject();
        }
    });
  });
};

olive.config(($routeProvider)=>{
  $routeProvider
  .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'UserController'
  })
  .when('/browse/all', {
      templateUrl: 'partials/home-browse.html',
      controller: 'HomeBrowseController',
      resolve: {isAuth}
  })
  .when('/browse/:recipe_id', {
    templateUrl: 'partials/single-recipe.html',
    controller: 'SingleRecipeController',
    resolve: {isAuth}
  })
  .when('/recipes/saved', {
    templateUrl: 'partials/saved-recipes.html',
    controller: 'SavedRecipesController',
    resolve: {isAuth}
  })
  .otherwise('/');
});