angular.module('Substrate', ['ngRoute', 'ngResource', 'Substrate.controllers', 'Substrate.services','Substrate.factories', 'Substrate.directives'])


.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/events', { 
        templateUrl: 'views/calendar.html',
        controller: 'CalendarController'
    })
    .when('/composefeaturedevent', {
        templateUrl: 'views/composefeaturedevent.html',
        controller: 'ComposeFeaturedEventController'
    })
    .when('/featuredevents/:id/update',{
        templateUrl: 'views/editfeaturedevent.html',
        controller: 'EditFeaturedEventController'
    })
    .when('/magazine/:id/update',{
        templateUrl: 'views/editarticle.html',
        controller: 'EditArticleController'
    })
    .when('/magazine/:id', {
        templateUrl: 'views/article.html',
        controller: 'ArticleController'
    })
    .when('/magazine', {
        templateUrl: 'views/magazine.html',
        controller: 'MagazineController'
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
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/userprofile',{
        templateUrl: 'views/userprofile.html',
        controller: 'UserProfileController'
    })
    .when('/users/:id/update', {
        templateUrl: 'views/updateuser.html',
        controller: 'UpdateUserController'
    })
    .when('/users/create', {
        templateUrl: 'views/createuser.html',
        controller: 'CreateUserController'
    })
}]);