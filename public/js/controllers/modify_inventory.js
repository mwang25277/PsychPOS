angular.module('modifyInventoryCtrl', []).controller('modifyInventoryController', function($scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();


});