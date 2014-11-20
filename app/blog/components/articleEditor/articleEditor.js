(function () {

    "use strict";

    var componentId = "articleEditor";

    angular.module("blog").directive(componentId, ["$location", "$routeParams", "articleService", component]);

    function component($location, $routeParams, articleService) {
        return {
            templateUrl: "/app/blog/components/articleEditor/articleEditor.html",
            restrict: "EA",
            replace: true,
            scope: {

            },
            link: function (scope, elem, attr) {

                scope.model = {};

                articleService.getById({ id: $routeParams.id }).then(function (results) {

                    if (results) {
                        scope.model = results;
                    }

                });

            }
        };
    }

})();