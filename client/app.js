angular.module('blogger', ['ngRoute', 'ngResource', 'blogger.controllers', 'blogger.factories', 'blogger.services']) //names it chriper, pulls in route for whole app
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { //configs, calls for and receives it, must put in ng-route in html and above
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {                            //when this is asked for
        templateUrl: 'views/list.html',  //go here
        controller:  'PostListController'    //do this, dont' need on the welcome page
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeController'  //maybe need compose controller
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/users', {
        templateUrl: 'views/users',
        controllers: 'UsersController',
        requiresLogin: true, //made up requiresLogin
        requiresAdmin: true //made up requiresAdmin
    })
    .when('/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdatePostController'
    })
    .when('/:id', {
        templateUrl: 'views/single_view.html',
        controller: 'SinglePostController'
    })
    .when('/categories', {
        templateUrl: 'views/users',
        controllers: 'CategoriesController'
    })
    .when('/donations', {
        templateUrl: 'views/donate.html',
        controllers: 'DonationController'
    })
    .otherwise({
        redirectTo: '/'
    });
}])

.run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute) {
        if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) { //if route requires login and arent logged in
            event.preventDefault();
            UserService.loginRedirect();
        } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
            event.preventDefault();
            $location.replace().path('/');
        }
    });
}]);