angular.module('employeeLoginCtrl', []).controller('employeeLoginController', function($scope, $http, $location, loginService) {
   $scope.userID = "";

   $("#userID").numpad();

   $scope.login = function() {

   	$http({
   		url: "/employeeLogin",
   		method: 'POST',
   		params: {
   			userID: $scope.userID
   		}
   	}).then(function(response) {
   		if(response.data != null && response.data != "") {
   			console.log("here");
   			$location.path("/employee_home");
   			loginService.login(1, "Max");
   			console.log(response);
   		}
   		else {
   			console.log(response);
   		}
   	});
   };


});