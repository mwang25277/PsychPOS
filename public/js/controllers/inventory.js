angular.module('inventoryCtrl', []).controller('inventoryController', function($rootScope, $scope, $http, $window, loginService) {
  $scope.userID = "";

  $scope.categoryName = "";

  $scope.categories = [];

  $rootScope.inventoryCategory = "";

  $scope.inventory = [];

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

  $scope.addCategory = function() {
  	console.log("here");
  	$http({
   		url: "/addInvCategory",
   		method: 'POST',
   		params: {
   			name: $scope.categoryName
   		}
   	}).then(function(response) {
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
   	});

  };

  $scope.deleteCategory = function() {
  	// var confirm = confirm("Deleting a category deletes all associated inventory items and ingredients. Press Ok to Confirm Deleting.");

  	// if(confirm == true) {
  	// 	$http({
	  //  		url: "/deleteInvCategory",
	  //  		method: 'POST',
	  //  		params: {
	  //  			name: $scope.categoryName
	  //  		}
	  //  	}).then(function(response) {
	  //  		$http({
			// 	url: "/getInvCategory",
			// 	method: 'get',
			// 	params: {}
		 //    }).then(function(response) {
			// 	if(response.data != null && response.data != "") {
			// 		console.log(response.data);
			// 		$scope.categories = response.data;
			// 	}
			// 	else {
			// 		console.log("Error");
			// 	}
		 //    });
	  //  	});
  	// }

  }

  $scope.selectCategory = function($event) {
  	$(".categoryButtons").removeClass('active');	
  	$($event.currentTarget).addClass('active');
  	console.log($event);
  	$rootScope.inventoryCategory = {id: $event.currentTarget.value, name: $event.currentTarget.innerHTML};

  	$http({
		url: "/getInvItem",
		method: 'get',
		params: { invCatID: $event.currentTarget.value }
	}).then(function(response) {
		if(response.data != null && response.data != "") {
			console.log(response.data);
			$scope.inventory = response.data;
		}
		else {
			$scope.inventory = [];
		}
	});

  }

  $scope.selectInvItem = function($event) {
  	console.log("Here");
  	$(".invItem").removeClass('table-active');
  	$($event.currentTarget).addClass('table-active');
  	console.log($event);
  	$scope.selectedItem = $scope.inventory[parseInt($event.currentTarget.title)];
  	console.log($scope.selectedItem);
  }

  $scope.addItem = function() {
  	$rootScope.inventoryItem = {
  		inventoryID: 0,
  		inventoryName: "",
  		inventoryCategory: $rootScope.inventoryCategory.id,
  		servingSize: "",
  		quantity_onhand: "",
  		quantity_needed: ""
  	};
  }

  $scope.editItem = function() {
  	$rootScope.inventoryItem = {
  		inventoryID: $scope.selectedItem.id,
  		inventoryName: $scope.selectedItem.name,
  		inventoryCategory: $rootScope.inventoryCategory.id,
  		servingSize: $scope.selectedItem.serving_size,
  		quantity_onhand: $scope.selectedItem.quantity_on_hand,
  		quantity_needed: $scope.selectedItem.quantity_needed
  	};
  }


});