(function () {

    "use strict";

    var componentId = "adminFooter";

    angular.module("admin").directive(componentId, ["$location", "$routeParams", "articleService", component]);

    function component($location, $routeParams, articleService) {
        return {
            templateUrl: "/app/admin/components/adminFooter/adminFooter.html",
            restrict: "EA",
            replace: true,
            scope: {

            },
            link: function (scope, elem, attr) {



            }
        };
    }

})();