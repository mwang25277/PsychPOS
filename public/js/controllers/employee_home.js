angular.module('employeeHomeCtrl', []).controller('employeeHomeController', function($scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();


});