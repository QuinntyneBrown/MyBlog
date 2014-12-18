(function () {
    "use strict";

    var componentId = "adminMenu";

    angular.module("admin").directive(componentId, ["$location", "$routeParams", "articleService", "session", component]);

    function component($location, $routeParams, articleService, session) {
        return {
            templateUrl: "/app/admin/components/adminMenu/adminMenu.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attr) {
                scope.isUserInRole = session.isUserInRole;

                scope.currentUser = session.getCurrentUser();
            }
        };
    }
})();
//# sourceMappingURL=adminMenu.js.map
