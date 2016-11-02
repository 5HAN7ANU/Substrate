<<<<<<< HEAD
angular.module('Substrate', ['ngRoute', 'ngResource', 'Substrate.controllers', 'Substrate.services','Substrate.factories', 'NavbarApp.directives'])
=======
angular.module('Substrate', ['ngRoute', 'ngResource', 'Substrate.controllers', 'Substrate.services', 'Substrate.factories', 'NavbarApp.directives'])
>>>>>>> bcb202f437d47282815173b6130dbcb3b82b7ab9
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/events', { 
        templateUrl: 'views/events.html',
        controller: 'EventController'
    })
    .when('/magazine', {
        templateUrl: 'views/magazine.html',
        controller: 'MagazineController'
    })
    .when('/magazine/:id', {
        templateUrl: 'views/article/html',
        controller: 'ArticleController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeController'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
    })
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
    })
    .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
    })
}]);