'use strict';

olive.controller('UserController', function($scope, $window, UserFactory) {
  $scope.login = () => {
      UserFactory.loginUser()
      .then( (data) => {
          let currentUser = data.user.uid;
          $window.location.href = '#!/browse/all';
      });
  };

});