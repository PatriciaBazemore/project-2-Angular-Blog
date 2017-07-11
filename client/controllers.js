angular.module('blogger.controllers', []) 
.controller('PostListController', ['$scope', 'Post', '$location', function($scope, Post, $location) {
    $scope.posts = Post.query();  //could do getPosts(); 
}])
.controller('ComposeController', ['$scope', 'Post', 'User', 'Category', '$location', function($scope, Post, User, Category, $location) {
    $scope.categories = Category.query();
    $scope.users = User.query();
    $scope.savePost = function() {
        var payload = {           //payload
            title: $scope.title, //gets whatever is typed in newTitle
            categoryid: $scope.category, // here, you would select the select box using JQuery and get its current value///value of select box
            userid: $scope.user,   //select box w/users
            content: $scope.content //text area
        }; 
        var p = new Post(payload);
        p.$save(function(success) {  //p.$save makes it do a post request to the collection
            $scope.title = '';
            $scope.category = '';
            $scope.user = '';
            $scope.content = '';
            $scope.posts = Post.query();
            $location.replace().path('/'); 
        }, function(err) {
            console.log(err);
        });
        
    }
}])
.controller('SinglePostController', ['$scope', 'Post', '$routeParams', '$location', function($scope, Post, $routeParams, $location) { 
    $scope.post = Post.get({ id: $routeParams.id });  //query gets all, get is for one..$scope.post is a resource
    //$scope.users = User.get({ userid = $routeParams.userid});

    $scope.editPost = function() {
        $location.path('/' + $routeParams.id + '/update');
        // console.log('/' + $routeParams.id + '/update');
        // window.location.pathname = '/posts/' + $routeParams.id + '/update';
    }    
    $scope.deletePost = function() {
        if (confirm('Are you sure you want to delete this post?')) {
            $scope.post.$delete(function() {  ///knows to mkae a get request to api/posts/ and to fill in id b/c we filled in from factory @id, that tells it to fill in own id
                $location.replace().path('/');
            });           
        } 
    }      
}])
    
.controller('UpdatePostController', [ '$scope', 'Post', 'Category', '$location', '$routeParams', function($scope, Post, Category, $location, $routeParams) { 
    $scope.categories = Category.query();
    $scope.post = Post.get({ id: $routeParams.id }, function() {  //get a specific post
        $scope.post.categoryid = String($scope.post.categoryid);
    });


    $scope.updatePost = function() {
        $scope.post.$update(function() {   //is modeled to post.content, take the data and send to server to update
            //$location.path('/posts/' + $routeParams.someId); //this would erase the history of it, no back to it
            //window.history.back();  //back to single post view
            $location.replace().path('/' + $routeParams.id);
        }, function(err) {
            console.log(err);
        });    
    }
}])

.controller('UsersController', ['$scope', 'User', function($scope, User) {
    $scope.users = User.query();
}])
.controller('CategoriesController', ['$scope', 'Categories',function($scope, Categories) {
    $scope.categories = Categories.query();
}])