angular.module('Substrate.factories', [])
.factory('Posts', ['$resource', function($resource) {
    return $resource('/api/products/:id', { id: '@id' });
}])
.factory('Users', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@id' });
}]);