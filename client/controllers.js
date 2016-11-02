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
    .controller('EventController', ['$scope', '$location', 'SEOService', function ($scope, $location, SEOService) {
        console.log('Event Controller');

        SEOService.setSEO({
            title: 'Substrate Radio | Events',
            description: 'Substrate Radio endorsed events',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('MagazineController', ['$scope', '$location', 'SEOService', function ($scope, $location, SEOService) {
        console.log('Magazine Controller');

        SEOService.setSEO({
            title: 'Substrate Radio | Magazine',
            description: 'Articles from our Substrate Radio contributors',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ArticleController', ['$scope', '$location', 'SEOService', function ($scope, $location, SEOService) {
        console.log('Article Controller');

        SEOService.setSEO({
            title: 'Substrate Radio | Magazine',
            description: 'Articles from our Substrate Radio contributors',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('AboutController', ['$scope', '$location', 'SEOService', function ($scope, $location, SEOService) {
        console.log('About Controller');

        SEOService.setSEO({
            title: 'Substrate Radio | About Us',
            description: 'Get to know Substrate Radio',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ComposeController', ['$scope', '$location', 'UserService', 'SEOService', function ($scope, $location, UserService, SEOService) {
        console.log('Compose Controller');

        SEOService.setSEO({
            title: 'Substrate Radio | Compose',
            description: 'Compose an article for Substrate Magazine',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('AdminController', ['$scope', '$location', 'UserService', 'SEOService', function ($scope, $location, UserService, SEOService) {
        console.log('Admin Controller');

        SEOService.setSEO({
            title: 'Substrate Radio | Admin',
            description: 'Do your thing boss-man',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ContactController', ['$scope', 'Contact', '$location', function ($scope, Contact, $location) {
        $scope.sendMessage = function () {
            console.log('inside contact controller');
            var contactInfo = {
                name: $scope.name,
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
        UserService.me().then(function (me) {
            redirect();
        });
        SEOService.setSEO({
            title: 'Login',
            description: 'Login'
        });
        $scope.login = function () {
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
                dest = '/';
            }
            $location.path(dest).search('p', null).replace();
        }

    }])