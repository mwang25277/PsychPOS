angular.module('modifyMenuCtrl', []).controller('modifyMenuController', function($rootScope, $scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();

  $scope.menu_id = $rootScope.menuItem.id;
  $scope.item_name = $rootScope.menuItem.name;
  $scope.menuCategory = $rootScope.menuCategory.name;
  $scope.color = $rootScope.menuItem.color;
  $scope.ingredients = $rootScope.menuItem.ingredients;
  console.log($scope.ingredients);
  $scope.categories = [];

  $scope.availableIngredients = [];

  $scope.ingredientCat = "";
  $scope.selectedIng = "";

  $http({
		url: "/getInvCategory",
		method: 'get',
		params: {}
  }).then(function(response) {
		if(response.data != null && response.data != "") {
			console.log(response.data);
			$scope.categories = response.data;
		}
		else {
			console.log("Error");
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

  $scope.selectedclients = [];                                

    $scope.availableclients = [
      {
        id: 1, 
        name: 'foo'
      }, 
      {
        id: 2, 
        name: 'bar'
      },
      {
        id: 3,
        name: 'baz'
      }
    ];

  $scope.addInventory = function() {

  	$http({
		url: "/addInventory",
		method: 'POST',
		params: {
			id: parseInt($scope.inventoryID),
			name: $scope.inventoryName,
			inventory_cat_id: parseInt($rootScope.inventoryCategory.id),
			serving_size: $scope.servingSize,
			quantity_on_hand: parseFloat($scope.quantity_onhand),
			quantity_needed: parseFloat($scope.quantity_needed)
		}
	 }).then(function(response) {
		if(response.data != null && response.data != "") {
			console.log(response);
			$scope.categories = response.data;
		}
		else {
			console.log("Error");
		}
	});
  }

});