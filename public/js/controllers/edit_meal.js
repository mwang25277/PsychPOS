angular.module('editMealCtrl', []).controller('editMealController', function($scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();


});