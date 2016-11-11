angular.module('Substrate.factories', [])
.factory('Posts', ['$resource', function($resource) {
    return $resource('/api/posts/:id', { id: '@id' }, {
        update: { method: 'PUT' }
    });
}])
.factory('Users', ['$resource', function($resource){
    var r = $resource('/api/users/:id', { id: '@id'}, {
        update: {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        },
        getDj: {
            method: 'GET',
            isArray: true,
            url: '/api/users/dj'
        }
    });
    return r;
}])
.factory('Contact', ['$resource', function ($resource) {
        return $resource('/api/contact/:id');
}])
.factory('Ads', ['$resource', function($resource){
    return $resource('api/ads/:id', { id: '@id' }, {
        update: { method: 'PUT'}
    });
}])
.factory('WeeklySchedule', ['$resource', function($resource){
    return $resource('api/weeklyschedule', {
        update: { method: 'PUT'}
    });
}])
.factory('FeaturedEvents', ['$resource', function($resource){
    return $resource('api/featuredevents/:id', { id: '@id' }, {
        update: { method: 'PUT'}
    });
}])
.factory('Podcasts', ["$resource", function($resource){
    return $resource('/api/podcasts/:id');
}])
.factory('MissionStatements', ['$resource', function($resource){
    return $resource('/api/mission/:id', { id: '@id'}, {
        update: { method: 'PUT' }
    });
}])
.factory('Pods', ['$resource', function($resource){
    return $resource('/api/pods/:id');
}]);