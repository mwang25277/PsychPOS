angular.module('modifierTemplateCtrl', []).controller('modifierTemplateController', function($scope, $http, $window, loginService, $timeout) {
  
  $scope.templateChosen = false;
  $scope.creatingNewTemplate = false;

  $scope.templateName = "";

  $scope.templates = [];

  $scope.newTemplateName = "";

  $scope.availableCategories = [];

  $scope.categorySelected = "";
  $scope.ingredientSelected = "";

  $scope.currentCategory = "";

  $scope.selectedCategories = [];

  $scope.availableIngredients = [];
  $scope.selectedIngredients = [];

  $http({
	  url: "/getTemplateNames",
	  method: 'get',
	  params: { }
  }).then(function(response) {
	  if(response.data != null && response.data != "") {
		console.log(response.data);
		$scope.templates = response.data;
	  }
	  else {
		$scope.inventory = [];
	  }
  });

  $scope.createNewTemplate = function() {
  	$scope.creatingNewTemplate = true;

  	$http({
	    url: "/getInvCategory",
	    method: 'get',
	    params: { }
    }).then(function(response) {
	    if(response.data != null && response.data != "") {
		  console.log(response.data);
		  $scope.availableCategories = response.data;
		  $scope.selectedCategories = [];
	    }
	    else {
		  $scope.availableCategories = [];
	    }
    });
  };

  $("#selectCategoryModal").on("show.bs.modal", function(event) {
  	var button = $(event.relatedTarget);
  	console.log(button);
  	$("#whichButton").val(button[0].id.substr(4,8));
  	console.log(button[0].id);
  	console.log($("#whichButton").val());
  });

  $("#selectIngredientModal").on("show.bs.modal", function(event) {
  	var button = $(event.relatedTarget);
  	console.log(button);
  	$("#whichIngButton").val(button[0].id);
  	console.log(button[0].id);
  	console.log($("#whichIngButton").val());
  });

  $scope.selectCategory = function($event) {
  	console.log($event);
    console.log($event.currentTarget);
    console.log($scope.selectedIngredients);
    if($event.currentTarget.value != "" && $event.currentTarget.value != $scope.currentCategory.id) {
    	$(".catButton").removeClass("active");
    	$($event.currentTarget).addClass("active");

    	$(".ingButton").val("");
    	$(".ingButton").html("");
    	console.log($scope.selectedIngredients);
    	console.log($($event.currentTarget).val());
    	$timeout(function() {
    		for(var i = 0; i < $scope.selectedIngredients.length; i++) {
	    		if($scope.selectedIngredients[i].category_id == $($event.currentTarget).val()) {
	    			console.log($scope.selectedIngredients[i]);
	    			var buttonID = "#row" + $scope.selectedIngredients[i].row.toString() + "col" + $scope.selectedIngredients[i].col.toString();
	    			console.log(buttonID);
	    			$(buttonID).val($scope.selectedIngredients[i].ingredient_id);
	    			$(buttonID).html($scope.selectedIngredients[i].ingredient_name);
	    		}
	    	}
    	}, 100);

    	$scope.currentCategory = {id: $($event.currentTarget).val(), name: $($event.currentTarget).html()};

    	$http({
		    url: "/getRemainingIngredients",
		    method: 'get',
		    params: { selectedIngredients: $scope.selectedIngredients, category_id = $scope.currentCategory.id }
	    }).then(function(response) {
		    if(response.data != null && response.data != "") {
			  console.log(response.data);
			  $scope.availableIngredients = response.data;
		    }
		    else {
			  $scope.availableIngredients = [];
		    }
	    });
    }
  };

  $scope.modifyCategory = function() {
  	console.log($scope.categorySelected);
  	$(".catButton").removeClass("active");
  	var buttonSelected = "#" + $("#whichButton").val();
  	console.log(buttonSelected);
  	$(buttonSelected).addClass("active");
  	$(buttonSelected).html($scope.categorySelected.name);
  	$(buttonSelected).val($scope.categorySelected.id);
  	$scope.selectedCategories.push($scope.categorySelected);
  	console.log($scope.availableCategories);
  	for(var i = 0; i < $scope.availableCategories.length; i++) {
  		if($scope.availableCategories[i].id == $scope.categorySelected.id) {
  			$scope.availableCategories.splice(i, 1);
  			console.log($scope.availableCategories);
  			break;
  		}
  	}

  	$scope.currentCategory = $scope.categorySelected;
  	$(".ingButton").val("");
    $(".ingButton").html("");

  	$http({
  		url: "/getIngItem",
  		method: 'get',
  		params: { invCatID: $scope.categorySelected.id }
  	}).then(function(response) {
  		if(response.data != null && response.data != "") {
  			console.log(response.data);
  			$scope.availableIngredients = response.data;
  			console.log($scope.availableIngredients);
  		}
  		else {
  			$scope.availableIngredients = [];
  		}
  	});

  };

  $scope.selectIngredient = function() {
  	console.log($scope.ingredientSelected);
  	var buttonSelected = $("#whichIngButton").val();
  	var row = parseInt(buttonSelected.substr(3,4));
  	var col = parseInt(buttonSelected.substr(7,8));
  	$("#"+buttonSelected).html($scope.ingredientSelected.name);
  	$("#"+buttonSelected).val($scope.ingredientSelected.id);
  	$scope.selectedIngredients.push({
  		ingredient_id: $scope.ingredientSelected.id,
  		ingredient_name: $scope.ingredientSelected.name,
  		row: row,
  		col: col,
  		category_id: $scope.currentCategory.id 
  	});
  	console.log($scope.availableIngredients);
  	console.log($scope.selectedIngredients);
  	for(var i = 0; i < $scope.availableIngredients.length; i++) {
  		if($scope.availableIngredients[i].id == $scope.ingredientSelected.id) {
  			$scope.availableIngredients.splice(i, 1);
  			console.log($scope.availableIngredients);
  			break;
  		}
  	}

  };


});