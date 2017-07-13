angular.module('blogger.factories', [])
.factory('Post', ['$resource', function($resource) {
    return $resource('/api/posts/:id', { id: '@id'}, {  //must always tell it where to find the one, the other is a if you don't fill in i put this
        update: {
            method: 'PUT'
        }
    });
}])
.factory('User', ['$resource', function($resource) {  //need a factory for every resource
    return $resource('/api/users/:id');  //must have the specific, not just users/ 
}]) 
.factory('Category', ['$resource', function($resource) {
    return $resource('/api/categories/:id', { id: '@id'}); 
}])
