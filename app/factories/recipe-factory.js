'use strict';

olive.factory("RecipeFactory", function($q, $http, FirebaseUrl, Food2ForkUrl, APICreds) {

let currentSavedId = "";
let currentRecipe = {};
// ********** from API ***********

// just to get the single recipe after initial search
let getSingleRecipe = (recipe_id) => {
  return $q( ( resolve, reject) => {
    // do I need to put in the user search here or can I do it in a different function
    $http.get(`http://localhost:5000/api/get/${recipe_id}`)
      .then( (recipeData) => {
        // how do I get the recipe id?
        currentRecipe = recipeData.data.recipe;
        console.log("current recipe?", currentRecipe);
        resolve(recipeData);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
    });
  });
};

// user search by keyword 
let searchRecipes = (searchText) => {
  return $q( ( resolve, reject) => {
    // do I need to put in the user search here or can I do it in a different function
    $http.get(`http://localhost:5000/api/search/'${searchText}'`)
      .then( (recipeData) => {
        // console.log(recipeData.data.recipes);
        resolve(recipeData.data.recipes);
      })
      .catch( (err) => {
        console.log("oops", err);
        reject(err);
    });
  });
};

let getTrendingRecipes = () => {
  return $q( ( resolve, reject) => {
    // do I need to put in the user search here or can I do it in a different function
    $http.get(`http://localhost:5000/api/search/'taco'`)
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

let getCurrentRecipe = () => {
  return currentRecipe;
};

  // let setSavedId = (savedId) => {
  //   currentSavedId = savedId;
  //   console.log("?", currentSavedId);
  // };

  // let getSavedId = () => {
  //   return currentSavedId;
  // };
// ****** from Firebase ******

let getSavedList = (userId) => {
  console.log("userId", userId);
  return $q( (resolve, reject) => {
    $http.get(`${FirebaseUrl}favorites.json?orderBy="uid"&equalTo="${userId}"`)
    .then( (recipeData) => {
      resolve(recipeData);
    })
    .catch( (err) => {
      console.log("error saved list fb", err);
      reject(err);
    });
  });
};

let postSaveRecipe = (newSave) => {
  return $q( (resolve, reject) => {
    $http.post(`${FirebaseUrl}favorites.json`,
      angular.toJson(newSave))
    .then( (saveData) => {
      resolve(saveData);
    })
    .catch( (err) => {
      reject(err);
    });
  });
};

let deleteSavedRecipe = (savedId) => {
console.log("savedId", savedId);
return $q( (resolve, reject) => {
  if (savedId) {
    $http.delete(`${FirebaseUrl}favorites/${savedId}.json`)
    .then( (data) => {
      resolve(data);
    })
    .catch( (err) => {
      reject(err);
    });
  } else {
    console.log("No id passed in");
  }
});
};

  return {getTrendingRecipes, getSingleRecipe, searchRecipes, postSaveRecipe, getSavedList, deleteSavedRecipe};
});

