angular.module('modifyInventoryCtrl', []).controller('modifyInventoryController', function($rootScope, $scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.employeeName = loginService.getName();

  $scope.inventoryID = $rootScope.inventoryItem.inventoryID;
  $scope.inventoryName = $rootScope.inventoryItem.inventoryName;
  $scope.inventoryCategory = $rootScope.inventoryCategory.name;
  $scope.servingSize = $rootScope.inventoryItem.servingSize;
  $scope.quantity_onhand = $rootScope.inventoryItem.quantity_onhand;
  $scope.quantity_needed = $rootScope.inventoryItem.quantity_needed;

  console.log($scope.inventoryCategory);

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