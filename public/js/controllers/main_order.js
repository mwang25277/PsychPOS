angular.module('mainOrderCtrl', []).controller('mainOrderController', function($scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();


});