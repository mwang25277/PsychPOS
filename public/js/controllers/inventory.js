angular.module('inventoryCtrl', []).controller('inventoryController', function($rootScope, $scope, $http, $location, loginService) {
  $scope.userID = "";

  $scope.categoryName = "";

  $scope.categories = [];

  $rootScope.inventoryCategory = "";

  $scope.inventory = [];

  $scope.itemSelected = false;
  $scope.categorySelected = false;

  $scope.editCatID = null;

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
        $scope.itemSelected = false;
        $scope.categorySelected = false;
        $scope.inventory = [];
			}
			else {
				console.log("Error");
			}
	    });
   	});

  };

   $scope.editCategory = function() {
    console.log("here");
    $http({
      url: "/editInvCategory",
      method: 'POST',
      params: {
        id: $scope.editCatID,
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
        $scope.itemSelected = false;
        $scope.categorySelected = false;
        $scope.inventory = [];
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
    $scope.categorySelected = true;
    $scope.itemSelected = false;
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
    $scope.itemSelected = true;
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
    $location.path("/modify_inventory");
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
    $location.path("/modify_inventory");
  }

  $scope.deleteItem = function() {
    $http({
      url: "/deleteInvItem",
      method: 'get',
      params: { id: $scope.selectedItem.id }
    }).then(function(response) {
      $http({
        url: "/getInvItem",
        method: 'get',
        params: { invCatID: $rootScope.inventoryCategory.id }
      }).then(function(response) {
        if(response.data != null && response.data != "") {
          console.log(response.data);
          $scope.inventory = response.data;
          $scope.categorySelected = true;
          $scope.itemSelected = false;
        }
        else {
          $scope.inventory = [];
          $scope.categorySelected = true;
          $scope.itemSelected = false;
        }
      });
    });
  }

  $('#categoryModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal

    if(button.data('whatever') == "edit") {
      var id = button.data('id');
      $scope.editCatID = id;
      var name = button.data('name');
      console.log(name);
      $scope.newCat = false;
      $scope.categoryName = name;
      $scope.$apply();
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this);
      modal.find('.modal-title').text('Edit Category');
    }
    else if(button.data('whatever') == "new") {
      $scope.categoryName = "";
      $scope.newCat = true;
      $scope.editCatID = null;

      var modal = $(this);
      modal.find('.modal-title').text('New Category');
    }

  });

  $('#deleteItemModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('Delete ' + $scope.selectedItem.name)
  });


});