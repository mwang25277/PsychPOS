angular.module('modifyIngredientCtrl', []).controller('modifyIngredientController', function($rootScope, $scope, $http, $window, loginService, $interval) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();

  $scope.ingredientID = $rootScope.ingredientItem.ingredientID;
  $scope.ingredientName = $rootScope.ingredientItem.ingredientName;
  $scope.ingredientCategory = $rootScope.ingredientCategory.name;
  //$scope.inventoryItem = $rootScope.ingredientItem.inventoryItem;
  $scope.inventoryItem = $rootScope.ingredientItem.inventoryItem;
  
  $scope.servingSize = $rootScope.ingredientItem.servingSize;
  $scope.costPerSvg = $rootScope.ingredientItem.costPerSvg;
  $scope.price = $rootScope.ingredientItem.price;
  $scope.hasNo = $rootScope.ingredientItem.hasNo;
  $scope.noCost = $rootScope.ingredientItem.noCost;
  $scope.hasExtra = $rootScope.ingredientItem.hasExtra;
  $scope.extraCost = $rootScope.ingredientItem.extraCost;
  $scope.hasHalf = $rootScope.ingredientItem.hasHalf;
  $scope.halfCost = $rootScope.ingredientItem.halfCost;

  $scope.inventory = [];

  $http({
	  url: "/getInvItem",
	  method: 'get',
	  params: { invCatID: $rootScope.ingredientCategory.id }
  }).then(function(response) {
	  if(response.data != null && response.data != "") {
		console.log(response.data);
		$scope.inventory = response.data;
		angular.forEach($scope.inventory, function(item, index) {
	  	  if(item.id == $rootScope.ingredientItem.inventoryItem) {
	  		$scope.inventoryItem = item;
	  	  }
	    });
	  }
	  else {
		$scope.inventory = [];
	  }
  });

  console.log($scope.inventoryCategory);

  $scope.addIngredient = function() {
  	var noCost = 0.0;
  	var extraCost = 0.0;
  	var halfCost = 0.0;

  	if($scope.hasNo) {
  		noCost = $scope.noCost;
  	}

  	if($scope.hasExtra) {
  		extraCost = $scope.extraCost;
  	}

  	if($scope.hasHalf) {
  		halfCost = $scope.halfCost;
  	}
  	$http({
		url: "/addIngredient",
		method: 'POST',
		params: {
			id: $scope.ingredientID,
	  		name: $scope.ingredientName,
	  		inventory_cat_id: $rootScope.ingredientCategory.id,
	        inventory_id: $scope.inventoryItem.id,
	  		serving_size: $scope.servingSize,
	  		cost_per_svg: $scope.costPerSvg,
	        price: parseFloat($scope.price),
	  		hasNo: $scope.hasNo,
	  		noCost: noCost,
	        hasExtra: $scope.hasExtra,
	        extraCost: extraCost,
	        hasHalf: $scope.hasHalf,
	        halfCost: halfCost
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