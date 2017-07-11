angular.module('blogger', ['ngRoute', 'ngResource', 'blogger.controllers', 'blogger.factories']) //names it chriper, pulls in route for whole app
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
    .when('/:id/update', {
        templateUrl: 'views/single_update.html',
        controller: 'UpdatePostController'
    })
    .when('/:id', {
        templateUrl: 'views/single_view.html',
        controller: 'SinglePostController'
    })
    .when('/users', {
        templateUrl: 'views/users',
        controllers: 'UsersController'
    })
    .when('/categories', {
        templateUrl: 'views/users',
        controllers: 'CategoriesController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);