
angular.module('blogger.services', [])
.service('UserService', ['$http', '$location', function($http, $location) {
    var currentUser;
    this.isLoggedIn = function() { //true if logged in, false if not
        //return !!currentUser;
        if (currentUser) { //if currentUser is defined return true 
            return true;
        } else {
            return false;
        }
    }

    this.isAdmin = function() {
        if (currentUser && currentUser.role === 'admin') {
            return true;
        } else {
            return false;
        }
    }

    this.loginRedirect = function() {
            var current = $location.path();  //stores path to current view
            $location.replace().path('/login').search('dest', current);  //replaces in history so it goes to home page, not /users
    }
    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: { email: email, password: password } //one day soon can do { email, password }
        }).then(function(response) {  //add error handler to get rid of error
            currentUser = response.data;
            return currentUser;         //return promises when you chain
        })
    }
    this.logout = function() {
        return $http({
            method: 'GET',
            url: '/api/users/logout'
        }).then(function() {
            currentUser = undefined;  //reset it 
        });
    }
    this.me = function() {
        if (currentUser) { //if there is a user, it knows who we are
            return Promise.resolve(currentUser); //creates a Promise that immediately resolves can do .then where it returns
        } else {
            return $http({   //doens't know who we are, makes get req to try to get info on us 
                method: 'GET',
                url: '/api/users/me'
            }).then(function(response) {
                currentUser = response.data; //me returns the user's obj, store in current user
                return currentUser;  //this returns obj, cant .then, not a promise, object is wrapped in promise, can do .then on outside
            });
        }
    }
}])
.service('SEOService', ['$rootScope', function($rootScope) {
    this.setSEO = function(data) {   //need this on services
        $rootScope.seo = {};  //resent to be an empty obj
        for (var p in data) {  //p is property names
            $rootScope.seo[p] = data[p]; //copying properties from data into rootScope

        }
    }
}])