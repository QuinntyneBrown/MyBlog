(function () {

    "use strict";

    var componentId = "search";

    angular.module("search").directive(componentId, ["$rootScope","searchService", component]);

    function component($rootScope, searchService) {

        return {
            templateUrl: "/app/search/components/search/search.html",
            replace: true,
            restrict: "EA",
            scope: {},
            link: function (scope, elem, attr) {

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
        }
    }

})();