(function () {

    "use strict";

    var componentId = "search";

    angular.module("search").directive(componentId, ["searchService", component]);

    function component(searchService) {

        return {
            templateUrl: "/app/search/components/search/search.html",
            replace: true,
            restrict: "EA",
            scope: {},
            link: function (scope, elem, attr) {

                scope.search = function search() {

                }
            }
        }
    }

})();