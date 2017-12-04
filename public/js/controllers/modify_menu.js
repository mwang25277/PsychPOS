angular.module('modifyMenuCtrl', []).controller('modifyMenuController', function($rootScope, $scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();
  console.log($rootScope.menuItem);
  $scope.menu_id = $rootScope.menuItem.id;
  $scope.item_name = $rootScope.menuItem.name;
  $scope.menuItemCategory = $rootScope.menuCategory.name;
  $scope.price = $rootScope.menuItem.price;
  $scope.buttonColor = $rootScope.menuItem.color;
  $scope.ingredients = $rootScope.menuItem.ingredients;
  console.log($scope.ingredients);
  $scope.modifierTemp = $rootScope.menuItem.modifier_template;
  $scope.categories = [];
  $scope.modTemps = [];

  $scope.availableIngredients = [];

  $scope.ingredientCat = "";
  $scope.selectedIng = "";

  $http({
		url: "/getInvCategory",
		method: 'get',
		params: {}
  }).then(function(response) {
		if(response.data != null && response.data != "") {
			//console.log(response.data);
			$scope.categories = response.data;
		}
		else {
			console.log("Error1");
		}
  });

  $http({
		url: "/getModTemps",
		method: 'get',
		params: {}
  }).then(function(response) {
  		console.log(response);
		if(response.data != null && response.data != "") {
			//console.log(response.data);
			$scope.modTemps = response.data;
		}
		else {
			console.log("Error2");
		}
  });

  $scope.moveItem = function(item, from, to) {

    	console.log('Move item   Item: '+item+' From:: '+from+' To:: '+to);
    	//Here from is returned as blank and to as undefined

    	var idx=from.indexOf(item);
    	if (idx != -1) {
        	from.splice(idx, 1);
        	to.push(item);      
    	}
  }
  $scope.moveAll = function(from, to) {

    	console.log('Move all  From:: '+from+' To:: '+to);
    	//Here from is returned as blank and to as undefined

    	angular.forEach(from, function(item) {
        	to.push(item);
    	});
    	from.length = 0;
  };

  $scope.ingSelected = function(item) {
  	console.log(item);
  	var ingIDList = [];
  	var i = 0;
  	for(i = 0; i < ($scope.ingredients).length; i++) {
  		ingIDList.push($scope.ingredients[i].id);
  	}

  	if(i == $scope.ingredients.length) {
	  	$http({
			url: "/getRemainingIngredients",
			method: 'POST',
			params: { 
				category: item.id, 
			}
	    }).then(function(response) {
			if(response.data != null && response.data != "") {
				console.log(response.data);
				$scope.availableIngredients = response.data;
			}
			else {
				console.log("Error");
			}
	    });
	}
  };

  $scope.addItem = function(item) {
  	console.log(item);
  	if($scope.ingredients.indexOf(item) == -1) {
  		$scope.ingredients.push(item);
  	}
  }


  $scope.addMenuItem = function() {

  	$http({
		url: "/addMenuItem",
		method: 'POST',
		params: {
			id: parseInt($scope.menu_id),
			name: $scope.item_name,
			price: $scope.price,
			row: $rootScope.menuItem.row,
			col: $rootScope.menuItem.col,
			category_id: parseInt($rootScope.menuCategory.id),
			modifier_template_id: "",
			color: ""
		}
	 }).then(function(response) {
		if(response.data != null && response.data != "") {
			//console.log(response);
			$location.path("/admin_order")
		}
		else {
			console.log("Error");
		}
	});
  }

});