(function () {
    "use strict";
    var app = angular.module("youTube", ["configuration", "common", "core", "session", "ngRoute"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/videoplayer/:videoid", {
            templateUrl: "/app/youTube/views/default.html",
            resolve: ["youTubeRouteResolver", function (youTubeRouteResolver) {
                return youTubeRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        });
    }]);
})();
//# sourceMappingURL=module.js.map