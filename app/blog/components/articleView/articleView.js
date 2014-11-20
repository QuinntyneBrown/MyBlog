(function () {

    "use strict";

    var componentId = "articleView";

    angular.module("blog").directive(componentId, ["$route", "articleService", component]);

    function component($route, articleService) {
        return {
            templateUrl: "/app/blog/components/articleView/articleView.html",
            restrict: "EA",
            replace: true,
            scope: {
            },
            link: function (scope, elem, attr) {

                articleService.getById({ id: $route.current.params.id }).then(function (results) {

                    scope.model = results;

                })

            }
        };
    }

})();