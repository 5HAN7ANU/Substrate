angular.module('Substrate.services', [])
.service('UserService', ['$http', '$location', function($http, $location){
    var user;

    this.isLoggedIn = function(){
        if(user){
            console.log('services.js/UserService/this.isLoggedIn: The logged in user is ' + user.firstname);
            this.user = user;
            return true;
        }else{
            return false;
        }
    }

    this.requireLogin = function(){
        if(!this.isLoggedIn()){
            var current = $location.path();
            $location.path('/login').search('p', current);
        }else{
            this.user = user;
            console.log('services.js/this.requireLogin(): The user is logged in');
        }
    }

    this.isAdmin = function(){
        if(user && user.role === 'admin'){
            return true;
        }else{
            return false;
        }
    }

    this.isPostOwner = function(userid){
        if(user && user.id === userid){
            return true;
        }else{
            return false;
        }    
    }

    this.requiresAdmin = function(){
        if(!this.isAdmin()){
            return true;
        }else{
            return false;
        }
    }

    this.login = function(email, password){
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: {
                email: email,
                password: password
            }
        }).then(function(success){
            console.log('logged in!');
            user = success.data;
            console.log(user);
            return success.data;
        }, function(err){
            alert('Incorrect Login!')
        })
    }

    this.logout = function(){
        return $http({
            method: 'GET',
            url: '/api/users/logout'
        }).then(function(success){
            user = undefined;
        });
    }

    this.me = function(){
        if(user){
            console.log('services.js/this.me: the user is: ' + user.firstname);
            return Promise.resolve(user);
        }else{
            return $http({
                method: 'GET',
                url: '/api/users/me'
            }).then(function(success){
                user = success.data;
                return success.data;
            })
        }
    }
}])
.service('SEOService', ['$rootScope', function($rootScope){//new code in class 10/14
    this.setSEO = function(seoObj){
        $rootScope.seo = {};
        for(var prop in seoObj){
            $rootScope.seo[prop] = seoObj[prop];//copying properties of seoObj to $rootScope.seo
        }
    }
}])
.service('CalendarService', ['$http', '$location', function($http, $location) {
    this.getEvents = function(eventCount, timeMin, timeMax) {
        console.log(timeMin)
        var data = {
            eventCount: eventCount,
            timeMin: timeMin,
            timeMax: timeMax
        }
        return $http({
            method: 'POST',
            data: data,
            url: '/api/calendar/events/' + eventCount
        }).then(function(response) {
            // console.log(response.data);
            return response.data;
        })
    }
}])