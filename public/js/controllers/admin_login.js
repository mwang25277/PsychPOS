angular.module('adminLoginCtrl', []).controller('adminLoginController', function($scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();


});