(function () {

    "use strict";

    var componentId = "homeListView";

    angular.module("app").directive(componentId, ["articleService", component]);

    function component(articleService) {

        return {
            templateUrl: "/app/home/components/homeListView/homeListView.html",
            replace: true,
            restrict: "EA",
            scope: {},
            link: function ( scope, elem, attr ) {

                articleService.getAll().then(function (results) {

                    scope.articles = results;

                });
            }
        }
    }

})();