angular.module('mainOrderCtrl', []).controller('mainOrderController', function($scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();
  $scope.activeCat = null;

  //categories
  var categoriesTbl = angular.element( document.querySelector("#categories"));
  for(var i = 1; i < 11; i++) {
  	categoriesTbl.append("<tr>")
  	for(var j = 1; j < 3; j++) {

  		$http({
	   		url: "/getCategory",
	   		method: 'POST',
	   		params: {
	   			row: i,
	   			col: j
	   		}
	   	}).then(function(response) {
	   		console.log(response);
	   		if(response.data == "Doesn't exist") {
	   			categoriesTbl.append('<td><button id="row'+i.toString()+'col'+i.toString()+'"" type="button" class="btn  btn-outline-dark category_b"></button></td>')
	   		}
	   	});
  		
  	}
  	categoriesTbl.append("</tr>");
  }

  var menuItemsTbl = angular.element( document.querySelector("#menuItems"));
  for(var i = 1; i < 11; i++) {
  	menuItemsTbl.append("<tr>")
  	for(var j = 1; j < 3; j++) {
  		menuItemsTbl.append('<td><button id="row'+i.toString()+'col'+i.toString()+'"" type="button" class="btn  btn-outline-dark category_b"></button></td>')
  	}
  	menuItemsTbl.append("</tr>");
  }


});