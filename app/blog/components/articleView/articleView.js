(function () {
    "use strict";
    var componentId = "articleView";
    angular.module("blog").directive(componentId, ["$route", "$sce", "articleService", component]);
    function component($route, $sce, articleService) {
        return {
            templateUrl: "/app/blog/components/articleView/articleView.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attr) {
                scope.displayDate = function (date) {
                    return moment(scope.model.pubDate).format("MMMM Do YYYY");
                };
                return articleService.getBySlug({ slug: $route.current.params.slug }).then(function (results) {
                    scope.model = results;
                    $sce.trustAsHtml(scope.model.htmlBody);
                });
            }
        };
    }
})();
//# sourceMappingURL=articleView.js.map