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
        getDj: {//custom api to get all dj
            method: 'GET',
            isArray: true,
            url: '/api/users/dj'
        }
    });
    return r;
}])
.factory('Contact', ['$resource', function ($resource) {
        return $resource('/api/contact/:id');
}]);