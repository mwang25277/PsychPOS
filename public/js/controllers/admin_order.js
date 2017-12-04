angular.module('adminOrderCtrl', []).controller('adminOrderController', function($rootScope, $scope, $http, $location, loginService) {
  $scope.userID = "";

  $scope.categoryName = "";

  $scope.categories = [];

  $rootScope.menuCategory = "";

  $scope.inventory = [];

  $http({
		url: "/getMenuCategory",
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
   		url: "/addMenuCategory",
   		method: 'POST',
   		params: {
   			name: $scope.categoryName
   		}
   	}).then(function(response) {
   		$http({
			url: "/getMenuCategory",
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
  	$rootScope.menuCategory = {id: $event.currentTarget.value, name: $event.currentTarget.innerHTML};

  	$http({
  		url: "/getMenuItem",
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

  $scope.modifyMenuItem = function($event) {
    //console.log($event);

    if($($event.currentTarget).val() == "") {
      $rootScope.menuItem = {
        id: 0,
        name: "",
        category: $rootScope.menuCategory.id,
        color: "",
        ingredients: [],
        modifier_template: ""
      }
    }
    else {

    }

    $location.path("/modify_menu");
  };


  $scope.selectInvItem = function($event) {
  	console.log("Here");
  	$(".invItem").removeClass('table-active');
  	$($event.currentTarget).addClass('table-active');
  	console.log($event);
  	$scope.selectedItem = $scope.inventory[parseInt($event.currentTarget.title)];
  	console.log($scope.selectedItem);
  }


});