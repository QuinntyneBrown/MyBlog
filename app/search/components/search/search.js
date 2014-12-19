(function () {
    "use strict";
    var componentId = "search";
    angular.module("search").directive(componentId, ["$rootScope", "searchService", component]);
    function component($rootScope, searchService) {
        return {
            templateUrl: "/app/search/components/search/search.html",
            replace: true,
            restrict: "EA",
            scope: {},
            link: function (scope, elem, attr) {
                var timeoutId = null;
                scope.$watch(function (scope) {
                    return scope.term;
                }, function (newValue) {
                    try {
                        clearTimeout(timeoutId);
                    }
                    catch (error) {
                    }
                    timeoutId = setTimeout(function () {
                        return scope.search();
                    }, 300);
                });
                scope.term = "";
                scope.results = [];
                scope.search = function search() {
                    return searchService.simpleSearch({ term: scope.term }).then(function (results) {
                        scope.results = results.data;
                    });
                };
                $rootScope.$on("$routeChangeStart", function () {
                    scope.results = [];
                    scope.term = "";
                });
            }
        };
    }
})();
//# sourceMappingURL=search.js.map