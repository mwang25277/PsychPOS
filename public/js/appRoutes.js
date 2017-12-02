angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })

        // nerds page that will use the NerdController
        .when('/employee_login', {
            templateUrl: 'views/employee_login.html',
            controller: 'employeeLoginController'
        })

        .when('/employee_home', {
            templateUrl: 'views/employee_home.html',
            controller: 'employeeHomeController'
        })

        .when('/edit_meal', {
            templateUrl: 'views/edit_meal.html',
            controller: 'editMealController'
        })

        .when('/main_order', {
            templateUrl: 'views/main_order.html',
            controller: 'mainOrderController'
        })

        .when('/modify_inventory', {
            templateUrl: 'views/modify_inventory.html',
            controller: 'modifyInventoryController'
        })

        .when('/modify_ingredient', {
            templateUrl: 'views/modify_ingredient.html',
            controller: 'modifyIngredientController'
        })

        .when('/ingredient', {
            templateUrl: 'views/ingredient.html',
            controller: 'ingredientController'
        })

        .when('/admin_home', {
            templateUrl: 'views/admin_home.html'
        })

        .when('/admin_login', {
            templateUrl: 'views/admin_login.html',
            controller: 'adminLoginController'
        })

        .when('/recall_order', {
            templateUrl: 'views/recall_order.html',
        })

        .when('/accounts', {
            templateUrl: 'views/accounts.html',
        })

        .when('/modify_account', {
            templateUrl: 'views/modify_account.html',
        })

        .when('/modifier_template', {
            templateUrl: 'views/modifier_template.html',
        })

        .when('/inventory', {
            templateUrl: 'views/inventory.html',
            controller: 'inventoryController'
        });

    $locationProvider.html5Mode(true);

}]);