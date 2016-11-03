angular.module('NavbarApp.directives', [])
.directive('customNavbar', function() {
    return {
        templateUrl: 'views/directives/navbar.html',
        restrict: 'E',
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {
            $rootScope.showingDrawer = false;
            $scope.toggleDrawer = function() {
                $rootScope.showingDrawer = !$rootScope.showingDrawer;
            }
        }]
    }
})
.directive('customDrawer', ['$rootScope', function($rootScope) {
    return {
        templateUrl: 'views/directives/drawer.html',
        restrict: 'E',
        link: function(scope, elem, attrs) {
            elem.on('click', function() {
                $rootScope.showingDrawer = false;
            });
        }
    }
}]);

angular.module('Substrate.directives', [])
.directive('markdownRenderer',  function(){
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    return {
        template: '<div></div>',
        restrict: 'E',
        scope: {
            text: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('text', function(value) {
                if (value) {
                    marked(value, function(err, content) {
                        if (err) {
                            throw err;
                        } else {
                            element.html(content);
                        }
                    });
                }
            });
        }
    }


});