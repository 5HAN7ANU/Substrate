angular.module('Substrate.controllers', [])

    .controller('HomeController', ['$scope', '$location', 'SEOService', function ($scope, $location, SEOService) {
        console.log('Home Controller');

        SEOService.setSEO({
            title: 'Substrate Radio | Home',
            description: 'Welcome to Substrate Radio',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('CalendarController', ['$scope', '$location', 'SEOService', 'CalendarService', function ($scope, $location, SEOService, CalendarService) {

        CalendarService.getEvents(15)
            .then(function (events) {
                $scope.events = events;
            });
        console.log($scope.events);

        SEOService.setSEO({
            title: 'Substrate Radio | Events',
            description: 'Substrate Radio endorsed events',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('MagazineController', ['$scope', '$location', 'SEOService', 'Posts', 'Users', 'UserService', '$route', function ($scope, $location, SEOService, Posts, Users, UserService, $route) {
        console.log('Magazine Controller');

        UserService.isLoggedIn();
        $scope.loggedIn = false;
        UserService.me().then(function (me) {
            $scope.ME = me;
            $scope.loggedIn = true;
        });
        $scope.logout = function () {
            UserService.logout().then(function () {
                $route.reload();
            });
        }

        function getPosts() {
            $scope.posts = Posts.query();
            console.log($scope.posts)
        }
        getPosts();

        SEOService.setSEO({
            title: 'Substrate Radio | Magazine',
            description: 'Articles from our Substrate Radio contributors',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ManageMagazineController', ['$scope', '$http', '$routeParams', 'Posts', 'SEOService', '$location', function ($scope, $http, $routeParams, Posts, SEOService, $location) {
        SEOService.setSEO({
            title: 'Substrate Radio | Magazine Controller',
            description: 'Articles from our Substrate Radio contributors',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });

        $scope.publishedPosts = Posts.query();//posts that are published

        // function getUnpublishedPosts(){

        // }
        $http({
            method: 'GET',
            url: '/api/posts/unpublished'
        }).then(function (success) {
            $scope.unpublishedPosts = success.data;
            console.log($scope.unpublishedPosts);
        }, function (err) {
            console.log(err);
        });
    }])
    .controller('ArticleController', ['$scope', '$routeParams', 'Posts', 'Users', 'UserService', '$location', 'SEOService', function ($scope, $routeParams, Posts, Users, UserService, $location, SEOService) {
        console.log('Article Controller');

        // UserService.isLoggedIn();
        // $scope.loggedIn = false;
        // UserService.me().then(function(me){
        //     $scope.ME = me;
        //     $scope.loggedIn = true;
        // })
        // $scope.logout = function () {
        //     UserService.logout().then(function(){
        //     $route.reload();
        //     });
        // }

        var singleId = $routeParams.id;
        console.log(singleId);
        $scope.post = Posts.get({ id: singleId });

        // console.log($scope.post);

        $scope.goToUpdate = function () {
            $location.path('magazine/' + singleId + '/update');
        }


        // $scope.goHome = function() {
        //     $location.path('/posts');
        // }

        // }])

        SEOService.setSEO({
            title: 'Substrate Radio | Magazine',
            description: 'Articles from our Substrate Radio contributors',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('AboutController', ['$scope', '$location', 'SEOService', 'Users', function ($scope, $location, SEOService, Users) {
        console.log('About Controller');

        $scope.dj = Users.getDj();
        console.log($scope.dj);


        SEOService.setSEO({
            title: 'Substrate Radio | About Us',
            description: 'Get to know Substrate Radio',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ComposeController', ['$scope', '$location', 'UserService', 'SEOService', 'Posts', function ($scope, $location, UserService, SEOService, Posts) {
        console.log('Compose Controller');

        UserService.requireLogin();
        UserService.isLoggedIn();

        UserService.me().then(function (me) {
            $scope.ME = me;
        })

        $scope.logout = function () {
            UserService.logout()
            $location.path('/posts');
        }
        $scope.submitArticle = function () {
            UserService.me().then(function (me) {

                var data = {
                    title: $scope.post.title,
                    userid: me.id,
                    categoryid: $scope.post.categoryid,
                    content: $scope.post.content,
                }

                var articleToPost = new Posts(data);
                articleToPost.$save(function (success) {
                    console.log('Article submitted successfully')
                    $location.path('/userprofile');
                });

            });

        }
        $scope.goBack = function () {
            $location.path('/userprofile');
        }
        SEOService.setSEO({
            title: 'Substrate Radio | Compose',
            description: 'Compose an article for Substrate Magazine',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])

  .controller('EditArticleController',['$scope', 'UserService', 'Posts', '$routeParams', '$location', function($scope, UserService, Posts, $routeParams, $location){
     UserService.requireLogin();
     UserService.requiresAdmin();
     UserService.isLoggedIn();


//--------------------------------------NAV BAR
    $scope.loggedIn = false;
    $scope.ifAdmin = false;
    UserService.me().then(function(me){
        $scope.ME = me;
        $scope.loggedIn = true;
        if (me.role === 'admin') {
            $scope.ifAdmin = true;
        }
    });
    $scope.logout = function () {
        UserService.logout().then(function(){
        $route.reload();
        });
    }
//------------------------------------------

    var id = $routeParams.id;
    $scope.post = Posts.get({ id: id});


    $scope.update = function() {
        $scope.post.$update(function(success) {
            $location.path('/userprofile');
        });  
    }
    $scope.promptDelete = function() {
        var shouldDelete = confirm('Are you sure you want to delete this entry?');
        if (shouldDelete) {
            $scope.post.$delete(function(success) {
                $location.path('/posts');
            });
        }
    }
    $scope.cancelupdate = function() {
        $location.path('/' + id );
    }
}])



    .controller('AdminController', ['$scope', '$location', 'UserService', 'SEOService', function ($scope, $location, UserService, SEOService) {
        console.log('Admin Controller');

        UserService.isLoggedIn();
        $scope.loggedIn = false;
        UserService.me().then(function (me) {
            $scope.ME = me;
            $scope.loggedIn = true;
        });
        $scope.logout = function () {
            UserService.logout().then(function () {
                $route.reload();
            });
        }
        // $scope.logout = function () {
        //     UserService.logout()
        //         .then(function () {
        //             $location.path('/');
        //         })
        // }

        SEOService.setSEO({
            title: 'Substrate Radio | Admin',
            description: 'Do your thing boss-man',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ContactController', ['$scope', 'Contact', '$location', function ($scope, Contact, $location) {
        console.log("ContactController");
        $scope.sendMessage = function () {
            console.log('inside contact controller');
            var contactInfo = {
                fromEmail: $scope.fromEmail,
                subject: $scope.subject,
                content: $scope.content
            }
            var contact = new Contact(contactInfo);
            contact.$save(function () {
                console.log('Email send ok');
                $location.path('/');
            }, function (err) {
                console.log(err);
            });
        }
    }])
    .controller('LoginController', ['$scope', '$location', 'UserService', 'SEOService', function ($scope, $location, UserService, SEOService) {
        console.log("Login Controller");
        UserService.me().then(function (me) {
            redirect();
        });
        // SEOService.setSEO({
        //     title: 'Login',
        //     description: 'Login'
        // });
        $scope.login = function (user) {
            UserService.login($scope.email, $scope.password)
                .then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                    $scope.error = err.data.message;
                });
        }

        function redirect() {
            var dest = $location.search().p;
            if (!dest) {
                dest = '/userprofile';
            }
            $location.path(dest).search('p', null).replace();
        }

    }])
    .controller('UserProfileController', ['$scope', 'Posts', 'UserService', 'Users', '$location', '$http', function ($scope, Posts, UserService, Users, $location, $http) {
        UserService.requireLogin();
        UserService.isLoggedIn();
        UserService.isAdmin();

        $scope.loggedIn = false;
        UserService.me().then(function (me) {
            $scope.ME = me;
            $scope.loggedIn = true;

        });

        $scope.amAdmin = false;
        if (UserService.isAdmin()) {
            $scope.amAdmin = true;
        }

        $scope.logout = function () {
            UserService.logout().then(function () {
                $location.path('/magazine');
            });
        }

        function getUsers() {
            $scope.users = Users.query();
            console.log($scope.users);
        }
        getUsers();

        UserService.me().then(function (me) {  // TO GET POSTS BY LOGGED IN USER
            var ME = me;
            var myUserId = ME.id;
            console.log("this is my user id: " + myUserId);
            $http({
                method: 'GET',
                url: '/api/posts/user/' + myUserId
            }).then(function (success) {
                $scope.myPosts = success.data;
                console.log($scope.myPosts);
            }, function (err) {
                console.log(err);
            });
        })
    }])
    .controller('CreateUserController', ['$scope', 'Users', 'UserService', '$location', function ($scope, Users, UserService, $location) {
        $scope.create = function () {
            var data = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                password: $scope.password,
                role: $scope.role,
                dj: $scope.dj

            }

            var u = new Users(data);
            u.$save(function () {
                $location.path('/users');
            });
        };

        // $scope.loggedInUser = 'The logged in user is: ' + UserService.user.firstname + ' ' + UserService.user.lastname + ', who is a ' + UserService.user.role;

        $scope.roles = [
            { name: 'User', value: 'user' },
            { name: 'Admin', value: 'admin' }
        ];

        $scope.djValues = [
            { name: 'Yes', value: 1 },
            { name: 'No', value: 0 }
        ];

        $scope.role_default = 'user';
    }])
    .controller('UserListController', ['$scope', '$location', 'Users', 'UserService', function ($scope, $location, Users, UserService) {
        UserService.requireLogin();
        UserService.me();
        console.log('controllers.js/UserListController: The user is logged in');
        $scope.users = Users.query();
        console.log('controllers.js/UserListController: users acquired')
        console.log($scope.users);

        $scope.loggedInUser = 'The logged in user is: ' + UserService.user.firstName + ' ' + UserService.user.lastName + ', who is a ' + UserService.user.role;

        $scope.logout = function () {
            UserService.logout()
                .then(function () {
                    $location.path('/');
                })
        }

        $scope.deleteUser = function (user) {
            console.log('controllers.js/UserListController: The user to be deleted is: ');
            console.log(user);
            var shouldDelete = confirm('Are you sure you want to delete this user?');
            console.log(shouldDelete);
            if (shouldDelete) {
                console.log('user clicked OK');
                user.$delete(function () {
                    console.log('User Deleted!');
                    console.log(user);
                    $scope.users = Users.query();
                });
            }
        }

        $scope.logoutPage = function () {
            UserService.logout().then(function () {
                console.log('logged out!');
                $location.path('/login');
            });
            alert('You have been logged out!');
        };
    }])
    .controller('UpdateUserController', ['$scope', '$routeParams', 'Users', 'UserService', function ($scope, $routeParams, Users, UserService) {
        console.log('controllers.js/UpdateUserController: Entered the UpdateUserController');
        UserService.me();
        var userId = $routeParams.id;

        $scope.featuredUser = Users.get({ id: userId }, function () {
            console.log('The user is: ' + $scope.featuredUser.firstname);
            $scope.id = $scope.featuredUser.id;
            $scope.firstname = $scope.featuredUser.firstname;
            $scope.lastname = $scope.featuredUser.lastname;
            $scope.email = $scope.featuredUser.email;
            $scope.password = $scope.featuredUser.password;
            $scope.role = $scope.featuredUser.role;
            $scope.dj = $scope.featuredUser.dj;
            console.log('controllers.js/UpdateUserController: The user role is: ' + $scope.role);
        });

        $scope.updateUser = function () {
            console.log('Controllers.js/UpdateUserController: entered the updateUser function');

            $scope.featuredUser.id = $scope.id;
            $scope.featuredUser.firstname = $scope.firstname;
            $scope.featuredUser.lastname = $scope.lastname;
            $scope.featuredUser.email = $scope.email;
            $scope.featuredUser.password = $scope.password;
            $scope.featuredUser.role = $scope.role;
            $scope.featuredUser.dj = $scope.dj;

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.name' + $scope.featuredUser.firstname + ' ' + $scope.featuredUser.lastname);

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.email ' + $scope.featuredUser.email);

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.role ' + $scope.featuredUser.role);

            $scope.featuredUser.$update(function (success) {
                console.log('controllers.js/UpdateUserController: The user was updated!');
                location.pathname = '/users';
            });
        };

        // $scope.loggedInUser = 'The logged in user is: ' + UserService.user.firstname + ' ' + UserService.user.lastname + ', who is a ' + UserService.user.role;

        $scope.roles = [
            { name: 'User', value: 'user' },
            { name: 'Admin', value: 'admin' }
        ];

        $scope.djValues = [
            { name: 'Yes', value: 0 },
            { name: 'No', value: 1 }
        ];

        $scope.logoutPage = function () {
            UserService.logout().then(function () {
                console.log('logged out!');
                $location.path('/login');
            });
            alert('You have been logged out!');
        };
    }])
    .controller('UpdateUserController', ['$scope', '$routeParams', 'Users', 'UserService', function ($scope, $routeParams, Users, UserService) {
        console.log('controllers.js/UpdateUserController: Entered the UpdateUserController');
        UserService.me();
        var userId = $routeParams.id;


        $scope.featuredUser = Users.get({
            id: userId
        }, function () {

            console.log('The user is: ' + $scope.featuredUser.firstname);
            $scope.id = $scope.featuredUser.id;
            $scope.firstname = $scope.featuredUser.firstname;
            $scope.lastname = $scope.featuredUser.lastname;
            $scope.email = $scope.featuredUser.email;
            $scope.password = $scope.featuredUser.password;
            $scope.role = $scope.featuredUser.role;
            $scope.dj = $scope.featuredUser.dj;
            console.log('controllers.js/UpdateUserController: The user role is: ' + $scope.role);
        });

        $scope.updateUser = function () {
            console.log('Controllers.js/UpdateUserController: entered the updateUser function');

            $scope.featuredUser.id = $scope.id;
            $scope.featuredUser.firstname = $scope.firstname;
            $scope.featuredUser.lastname = $scope.lastname;
            $scope.featuredUser.email = $scope.email;
            $scope.featuredUser.password = $scope.password;
            $scope.featuredUser.role = $scope.role;
            $scope.featuredUser.dj = $scope.dj;

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.name' + $scope.featuredUser.firstname + ' ' + $scope.featuredUser.lastname);

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.email ' + $scope.featuredUser.email);

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.role ' + $scope.featuredUser.role);

            $scope.featuredUser.$update(function (success) {
                console.log('controllers.js/UpdateUserController: The user was updated!');
                location.pathname = '/users';
            });
        };

        // $scope.loggedInUser = 'The logged in user is: ' + UserService.user.firstname + ' ' + UserService.user.lastname + ', who is a ' + UserService.user.role;

        $scope.roles = [{
            name: 'User',
            value: 'user'
        }, {
                name: 'Admin',
                value: 'admin'
            }];

        $scope.djValues = [{
            name: 'Yes',
            value: 0
        }, {
                name: 'No',
                value: 1
            }];
    }])