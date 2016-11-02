angular.module('Substrate.factories', [])
.factory('Posts', ['$resource', function($resource) {
    return $resource('/api/posts/:id', { id: '@id' }, {
        update: { method: 'PUT' }
    });
}])
.factory('Users', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@id' });
}])
.factory('Contact', ['$resource', function ($resource) {
        return $resource('/api/contact/:id');
}]);