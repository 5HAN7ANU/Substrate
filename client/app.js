angular.module('Substrate', ['ngRoute', 'ngResource', 'Substrate.controllers', 'Substrate.services', 'Substrate.factories', 'Substrate.directives'])


.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
        .when('/composead', {
            templateUrl: 'views/composead.html',
            controller: 'ComposeAdController'
        })
        .when('/composeMissionStatement', {
            templateUrl: 'views/composeMissionStatement.html',
            controller: 'ComposeMissionStatementController'
        })
        .when('/featuredevents/:id/update', {
            templateUrl: 'views/editfeaturedevent.html',
            controller: 'EditFeaturedEventController'
        })
        .when('/mission/:id/update', {
            templateUrl: 'views/editMissionStatement.html',
            controller: 'EditMissionStatementController'
        })
        .when('/ads/:id/update', {
            templateUrl: 'views/editad.html',
            controller: 'EditAdController'
        })
        .when('/magazine/:id/update', {
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
        .when('/podcasts',{
            templateUrl: 'views/podcasts.html',
            controller: 'PodcastController'
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
        .when('/userprofile', {
            templateUrl: 'views/userprofile.html',
            controller: 'UserProfileController'
        })
        .when('/weeklyschedule/:weekday/update', {
            templateUrl: 'views/weekdayupdate.html',
            controller: 'AdminController'
        })
        .when('/users/:id/update', {
            templateUrl: 'views/updateuser.html',
            controller: 'UpdateUserController'
        })
        .when('/users/create', {
            templateUrl: 'views/createuser.html',
            controller: 'CreateUserController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);