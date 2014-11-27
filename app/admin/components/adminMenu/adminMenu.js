(function () {

    "use strict";

    var componentId = "adminMenu";

    angular.module("admin").directive(componentId, ["$location", "$routeParams", "articleService", component]);

    function component($location, $routeParams, articleService) {
        return {
            templateUrl: "/app/admin/components/adminMenu/adminMenu.html",
            restrict: "EA",
            replace: true,
            scope: {

            },
            link: function (scope, elem, attr) {



            }
        };
    }

})();