angular.module('adminOrderCtrl', []).controller('adminOrderController', function($rootScope, $scope, $http, $location, loginService) {
  $scope.userID = "";

  $scope.categoryName = "";
  $scope.editCatID = null;

  $scope.categories = [];

  $scope.menuItems = [];

  $rootScope.menuCategory = "";

  $scope.inventory = [];

  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

  $http({
		url: "/getMenuCategory",
		method: 'get',
		params: {}
  }).then(function(response) {
		if(response.data != null && response.data != "") {
			//console.log(response.data);
			$scope.categories = response.data;
		}
		else {
			console.log("Error");
		}
  });

  $scope.addCategory = function() {
  	console.log("here");
    $("#categoryModal").modal('hide');
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
				//console.log(response.data);
				$scope.categories = response.data;
			}
			else {
				console.log("Error");
			}
	    });
   	});

  };

  $scope.editCategory = function() {
    console.log("here");
    $("#categoryModal").modal('hide');
    $http({
      url: "/editMenuCategory",
      method: 'POST',
      params: {
        id: $scope.editCatID,
        name: $scope.categoryName
      }
    }).then(function(response) {
      $http({
      url: "/getMenuCategory",
      method: 'get',
      params: {}
      }).then(function(response) {
      if(response.data != null && response.data != "") {
        //console.log(response.data);
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
  	//console.log($event);
  	$rootScope.menuCategory = {id: $event.currentTarget.value, name: $event.currentTarget.innerHTML};

  	$http({
  		url: "/getMenuItems",
  		method: 'get',
  		params: { menu_cat_id: $event.currentTarget.value }
  	}).then(function(response) {
  		if(response.data != null && response.data != "") {
  			//console.log(response.data);
        //remove previous menu items
        for(var i = 0; i < $scope.menuItems.length; i++) {
          var menuItem = $scope.menuItems[i];
          console.log(menuItem);
          var button = "#row"+menuItem.row.toString()+"col"+menuItem.col.toString();
          $(button).removeAttr("value");
          $(button).html("");
          $(button).removeAttr("style");
        }

        //add new ones
  			$scope.menuItems = response.data;
        console.log($scope.menuItems);
        for(var i = 0; i < $scope.menuItems.length; i++) {
          var menuItem = $scope.menuItems[i];
          console.log(menuItem);
          var button = "#row"+menuItem.row.toString()+"col"+menuItem.col.toString();
          $(button).val(menuItem.id);
          $(button).html(menuItem.name);
          $(button).css("background-color", menuItem.color);
        }
  		}
  		else {
        for(var i = 0; i < $scope.menuItems.length; i++) {
          var menuItem = $scope.menuItems[i];
          console.log(menuItem);
          var button = "#row"+menuItem.row.toString()+"col"+menuItem.col.toString();
          $(button).removeAttr("value");
          $(button).html("");
          $(button).removeAttr("style");
        }

  		}
  	});

  };

  $scope.modifyMenuItem = function($event) {
    //console.log($event);

    if($($event.currentTarget).val() == "") {
      var butID = $event.currentTarget.id;
      var row = parseInt(butID.substr(3,4));
      var col = parseInt(butID.substr(7,8));
      $rootScope.menuItem = {
        id: 0,
        name: "",
        category: $rootScope.menuCategory.id,
        row: row,
        col: col,
        color: "",
        ingredients: [],
        modifier_template: "",
        editing: false
      }
      //console.log($rootScope.menuItem);
       $location.path("/modify_menu");
    }
    else {
      $http({
        url: "/getMenuItemByID",
        method: 'get',
        params: { id: $($event.currentTarget).val() }
      }).then(function(response) {
        if(response.data != null && response.data != "") {
          console.log(response.data);
          $rootScope.menuItem = response.data;
          $rootScope.menuItem.editing = true;
        }
        else {
          console.log("Error");
        }
      });

      $http({
        url: "/getMenuItemIngs",
        method: 'get',
        params: { id: $($event.currentTarget).val() }
      }).then(function(response) {
        if(response.data != null && response.data != "") {
          console.log(response.data);
          $rootScope.menuItem.ingredients = response.data;
          $location.path("/modify_menu");
        }
        else {
          console.log("Error");
          $rootScope.menuItem.ingredients = [];
          $location.path("/modify_menu");
        }
      });

    }
  };


  $scope.selectInvItem = function($event) {
  	console.log("Here");
  	$(".invItem").removeClass('table-active');
  	$($event.currentTarget).addClass('table-active');
  	//console.log($event);
  	$scope.selectedItem = $scope.inventory[parseInt($event.currentTarget.title)];
  	console.log($scope.selectedItem);
  };

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

});