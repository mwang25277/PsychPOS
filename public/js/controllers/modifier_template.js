angular.module('modifierTemplateCtrl', []).controller('modifierTemplateController', function($scope, $http, $window, loginService, $timeout, $route) {
  
  $scope.templateChosen = false;
  $scope.creatingNewTemplate = false;

  $scope.selectedTemplate = "";

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
    $scope.selectedTemplate = "";
    $("#newTemplateModal").modal('hide');

    for(var i = 1; i < 9; i++) {
      $("#cat" + i.toString()).html("");
      $("#cat" + i.toString()).val("");
    } 

    $scope.availableIngredients = [];
    $scope.selectedIngredients = [];

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

  $scope.createDupeTemplate = function() {
    $scope.creatingNewTemplate = true;
    $scope.selectedTemplate = "";
    $("#dupeTemplateModal").modal('hide');
  };

  $scope.selectTemplate = function() {
    $scope.templateChosen = true;
    console.log($scope.selectedTemplate);
    if($scope.selectedTemplate != "") {
        $http({
        url: "/getModTemp",
        method: 'get',
        params: { id: $scope.selectedTemplate.id }
      }).then(function(response) {
        if(response.data != null && response.data != "") {
          console.log(response.data);
          $scope.selectedIngredients = response.data.ings;
          $scope.selectedCategories = response.data.categories;
          var selCatIDs = [];
          console.log($scope.selectedCategories);
          for(var i = 0; i < $scope.selectedCategories.length; i++) {
            $("#cat" + (i+1).toString()).html($scope.selectedCategories[i].name);
            $("#cat" + (i+1).toString()).val($scope.selectedCategories[i].id);
            selCatIDs.push($scope.selectedCategories[i].id);
          }

          $http({
            url: "/getRemainingInvCategory",
            method: 'post',
            params: { ids: JSON.stringify(selCatIDs) }
          }).then(function(response) {
            if(response.data != null && response.data != "") {
              console.log(response.data);
              $scope.availableCategories = response.data;
            }
            else {
              $scope.availableCategories = [];
            }
          });



        }
      });
    }
  };

  $("#selectCategoryModal").on("show.bs.modal", function(event) {
  	var button = $(event.relatedTarget);
  	//console.log(button);
  	$("#whichButton").val(button[0].id.substr(4,8));
  	//console.log(button[0].id);
  	//console.log($("#whichButton").val());
  });

  $("#selectIngredientModal").on("show.bs.modal", function(event) {
  	var button = $(event.relatedTarget);
  	//console.log(button);
  	$("#whichIngButton").val(button[0].id);
  	//console.log(button[0].id);
  	//console.log($("#whichIngButton").val());
  });

  $scope.selectCategory = function($event) {
  	// console.log($event);
   console.log($event.currentTarget);
   //  console.log($scope.selectedIngredients);
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

      var ingIDs = [];

      for(var j = 0; j < $scope.selectedIngredients.length; j++) {
        ingIDs.push($scope.selectedIngredients[j].ingredient_id);
      }
      //console.log(ingIDs);
    	$http({
		    url: "/getRemainingIngredients",
		    method: 'post',
		    params: { selectedIngredients: JSON.stringify(ingIDs), category_id: $scope.currentCategory.id }
	    }).then(function(response) {
		    if(response.data != null && response.data != "") {
			  //console.log(response.data);
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
    $("#selectCategoryModal").modal('hide');
  	$(".catButton").removeClass("active");
  	var buttonSelected = "#" + $("#whichButton").val();
  	console.log(buttonSelected);
  	$(buttonSelected).addClass("active");
    if($(buttonSelected).val() != undefined || $(buttonSelected).val() != null) {
      for(var x = 0; x < $scope.selectedCategories.length; x++) {
        // console.log($scope.selectedCategories[x].id);
        // console.log($(buttonSelected).val());
        if($scope.selectedCategories[x].id == $(buttonSelected).val()) {
          console.log("here");
          $scope.availableCategories.push($scope.selectedCategories[x]);
          $scope.selectedCategories.splice(x, 1);
          break;
        }
      }
    }
    console.log($scope.selectedCategories);
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
  			//console.log(response.data);
  			$scope.availableIngredients = response.data;
  			//console.log($scope.availableIngredients);
  		}
  		else {
  			$scope.availableIngredients = [];
  		}
  	});

  };

  $scope.selectIngredient = function() {
  	//console.log($scope.ingredientSelected);
    $("#selectIngredientModal").modal('hide');
  	var buttonSelected = $("#whichIngButton").val();
  	var row = parseInt(buttonSelected.substr(3,4));
  	var col = parseInt(buttonSelected.substr(7,8));
    if($("#"+buttonSelected).val() != undefined || $("#"+buttonSelected).val() != null) {
      for(var x = 0; x < $scope.selectedIngredients.length; x++) {
        if($scope.selectedIngredients[x].ingredient_id == $("#"+buttonSelected).val()) {
          $scope.selectedIngredients.splice(x, 1);
          break;
        }
      }
    }
  	$("#"+buttonSelected).html($scope.ingredientSelected.name);
  	$("#"+buttonSelected).val($scope.ingredientSelected.id);
  	$scope.selectedIngredients.push({
  		ingredient_id: $scope.ingredientSelected.id,
  		ingredient_name: $scope.ingredientSelected.name,
  		row: row,
  		col: col,
  		category_id: $scope.currentCategory.id 
  	});
  	var ingIDs = [];

    for(var j = 0; j < $scope.selectedIngredients.length; j++) {
      ingIDs.push($scope.selectedIngredients[j].ingredient_id);
    }
    //console.log(ingIDs);
    $http({
      url: "/getRemainingIngredients",
      method: 'post',
      params: { selectedIngredients: JSON.stringify(ingIDs), category_id: $scope.currentCategory.id }
    }).then(function(response) {
      if(response.data != null && response.data != "") {
      //console.log(response.data);
      $scope.availableIngredients = response.data;
      }
      else {
      $scope.availableIngredients = [];
      }
    });

  };


  $scope.saveTemplate = function() {
    if($scope.selectedTemplate == "") {
      $http({
        url: "/addModTemplate",
        method: 'post',
        params: { name: $scope.newTemplateName, ingredients: JSON.stringify($scope.selectedIngredients) }
      }).then(function(response) {
        console.log(response);
        if(response.data == "Success") {
          $route.reload();
        }
      });
    }
    else {
      $http({
        url: "/editModTemplate",
        method: 'post',
        params: { id: $scope.selectedTemplate.id, name: $scope.selectedTemplate.name, ingredients: JSON.stringify($scope.selectedIngredients) }
      }).then(function(response) {
        console.log(response);
        if(response.data == "Success") {
          $scope.templateChosen = false;
        }
      });
    }

  };

  $scope.deleteTemplate = function() {

    $("#deleteTemplateModal").modal('hide');

    $http({
      url: "/deleteModTemplate",
      method: 'get',
      params: { id: $scope.selectedTemplate.id }
    }).then(function(response) {
      console.log(response);
      if(response.data == "Success") {
        $route.reload();
      }
    });

  };


});