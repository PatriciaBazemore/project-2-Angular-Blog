angular.module('blogger.controllers', []) 
.controller('WelcomeController', ['SEOService', '$location', function(SEOService, $location) {
    SEOService.setSEO({
        title: 'Welcome',
        //image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
        url: $location.url(),
        description: 'Welcome to my website'
    });
}])
.controller('PostListController', ['$scope', 'Post', '$location', function($scope, Post, $location) {
    $scope.posts = Post.query();  //could do getPosts(); 
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
    $scope.returnHome = function()  {
        $location.replace().path('/');
    }     
}])
.controller('ComposeController', ['$scope', 'Post', 'User', 'Category', '$location', function($scope, Post, User, Category, $location) {
    $scope.categories = Category.query();
    $scope.users = User.query();
    $scope.save = function() {
         var p = new Post($scope.post);
         p.$save(function(success) {  //p.$save makes it do a post request to the collection
            $location.path('/'); 
        }, function(err) {
            console.log(err);
        }); 
    }
}]) 
.controller('UpdatePostController', [ '$scope', 'Post', 'Category', '$location', '$routeParams', function($scope, Post, Category, $location, $routeParams) { 
    $scope.categories = Category.query();
    $scope.post = Post.get({ id: $routeParams.id }, function() {  //get a specific post
        $scope.post.categoryid = String($scope.post.categoryid);
    });

    $scope.save = function() {
        $scope.post.$update(function() {   //is modeled to post.content, take the data and send to server to update
            //$location.path('/posts/' + $routeParams.someId); //this would erase the history of it, no back to it
            //window.history.back();  //back to single post view
            $location.replace().path('/' + $routeParams.id);
        });    
    }
}])
.controller('CategoriesController', ['$scope', 'Categories',function($scope, Categories) {
    $scope.categories = Categories.query();
}])
.controller('LoginController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {
    UserService.me().then(function() { //auto log in, if serv respond successfully, rememebers then from current session, etc
        redirect(); //send them where they were trying to get
    });
    $scope.login = function() { //not currently logged in, send them to log in 
        UserService.login($scope.email, $scope.password)  //getting what they type in boxes
        .then(function() {
            redirect();  //if successful, go to where they were trying
        }, function(err) {
            console.log(err);
        });
    }
    function redirect() {
        // var dest = $location.search().dest; //uses location to where trying to go 
        // if (!dest) { dest = '/'; } //default to home page
        // $location.replace().path(dest).search('dest', null); //send them back to where they were trying to get and clear out dest param
        $location.path('/');
    }
}])
.controller('UsersController', ['$scope', 'User','UserService', function($scope, User, UserService) {
    $scope.users = User.query(); //gets all the users and stores it in scope.users
    
    
    $scope.createUser = function() {
        var u = new User($scope.newUser);
        u.$save(function(){
            $scope.newUser = {};
            $scope.users = User.query();
        });
    }
}])
.controller('DonationController',['$scope', 'Donation', function($scope, Donation){
   var elements = stripe.elements();
   var card = elements.create('card');

   card.mount('#card-field');

   $scope.processDonation = function() {
       stripe.createToken(card, {
           name: $scope.name,
           address_line1: $scope.line1,
           address_line2: $scope.line2,
           address_city: $scope.city,
           address_state: $scope.state
       }).then(function(result){
           if(result.error){  //result has property error and message
               $scope.errorMessage = result.error.message;
           }else{
               //result.token is the card token
               var d = new Donation({
                   token: result.token.id,  //tok...really long string...card token
                   amount: $scope.amount  //typed from field we created
               });
               d.$save(function() {  //it's a resoures, just save it
                   alert('Thank you for the donation');
                   $location.path('/'); 
               }, function(err) {   //card declined
                   console.log(err);
               });
           }
       });
   }
}]);

