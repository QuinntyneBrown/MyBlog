(function () {

    "use strict";

    var app = angular.module("app", [
        "ngRoute",
        "blog",
        "configuration",
        "core",
        "session",
        "user"
    ]);

    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/",
        {
            templateUrl: 'app/home/views/default.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        })
        .when("/about",
        {
            templateUrl: 'app/home/views/about.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        })
        .when("/settings",
        {
            templateUrl: 'app/home/views/settings.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        })
        .otherwise("/");

    }]);

})();








