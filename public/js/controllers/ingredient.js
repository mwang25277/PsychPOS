angular.module('ingredientCtrl', []).controller('ingredientController', function($rootScope, $scope, $http, $location, loginService) {
  $scope.userID = "";

  $scope.categoryName = "";

  $scope.categories = [];

  $rootScope.ingredientCategory = "";

  $scope.ingredients = [];

  $scope.selectedItem = "";

  $scope.itemSelected = false;
  $scope.categorySelected = false;

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

  $scope.deleteCategory = function() {
  	// var confirm = confirm("Deleting a category deletes all associated ingredient items and ingredients. Press Ok to Confirm Deleting.");

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
  	$rootScope.ingredientCategory = {id: $event.currentTarget.value, name: $event.currentTarget.innerHTML};
    $scope.itemSelected = false;
    $scope.categorySelected = true;
  	$http({
  		url: "/getIngItem",
  		method: 'get',
  		params: { invCatID: $event.currentTarget.value }
  	}).then(function(response) {
  		if(response.data != null && response.data != "") {
  			console.log(response.data);
  			$scope.ingredients = response.data;
  		}
  		else {
  			$scope.ingredients = [];
  		}
  	});

  }

  $scope.selectIngItem = function($event) {
  	console.log("Here");
  	$(".ingItem").removeClass('table-active');
  	$($event.currentTarget).addClass('table-active');
  	console.log($event);
  	$scope.selectedItem = $scope.ingredients[parseInt($event.currentTarget.title)];
  	console.log($scope.selectedItem);
    $scope.itemSelected = true;
  }

  $scope.addItem = function() {
  	$rootScope.ingredientItem = {
  		ingredientID: 0,
  		ingredientName: "",
  		ingredientCategory: $rootScope.ingredientCategory.id,
      inventoryItem: "",
  		servingSize: "",
      price: 0.00,
  		hasNo: false,
      noCost: 0.00,
      hasExtra: false,
      extraCost: 0.00,
      hasHalf: false,
      halfCost: 0.00

  	};

    $location.path("/modify_ingredient");
  }

  $scope.editItem = function() {
  	$rootScope.ingredientItem = {
  		ingredientID: $scope.selectedItem.id,
  		ingredientName: $scope.selectedItem.name,
  		ingredientCategory: $rootScope.ingredientCategory.id,
      inventoryItem: $scope.selectedItem.inventory_id,
  		servingSize: $scope.selectedItem.serving_size,
      price: $scope.selectedItem.price,
  		hasNo: $scope.selectedItem.hasNo,
  		noCost: $scope.selectedItem.noCost,
      hasExtra: $scope.selectedItem.hasExtra,
      extraCost: $scope.selectedItem.extraCost,
      hasHalf: $scope.selectedItem.hasHalf,
      halfCost: $scope.selectedItem.halfCost
  	};

    $location.path("/modify_ingredient");
  }

  $scope.deleteItem = function() {
    $http({
      url: "/deleteIngItem",
      method: 'get',
      params: { id: $scope.selectedItem.id }
    }).then(function(response) {
      $http({
        url: "/getIngItem",
        method: 'get',
        params: { invCatID: $rootScope.ingredientCategory.id }
      }).then(function(response) {
        if(response.data != null && response.data != "") {
          console.log(response.data);
          $scope.ingredients = response.data;
          $scope.itemSelected = false;
          $scope.categorySelected = true;
        }
        else {
          $scope.ingredients = [];
          $scope.itemSelected = false;
          $scope.categorySelected = true;
        }
      });
    });
  }

  $('#deleteIngModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('Delete ' + $scope.selectedItem.name)
  });


});