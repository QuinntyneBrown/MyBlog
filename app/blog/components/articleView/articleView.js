(function () {

    "use strict";

    var componentId = "articleView";

    angular.module("blog").directive(componentId, ["$route", "$sce", "articleService", component]);

    function component($route, $sce, articleService) {
        return {
            templateUrl: "/app/blog/components/articleView/articleView.html",
            restrict: "EA",
            replace: true,
            scope: {
            },
            link: function (scope, elem, attr) {

                return articleService.getById({ id: $route.current.params.id }).then(function (results) {

                    scope.model = results;

                    $sce.trustAsHtml(scope.model.htmlBody);

                })

            }
        };
    }

})();