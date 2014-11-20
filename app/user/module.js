(function () {

    "use strict";

    var app = angular.module("user", ["configuration", "core", "session"]);

    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/signin", {
            templateUrl: "/app/user/views/signin.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        })
        .when("/register", {
            templateUrl: "/app/user/views/register.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        });

    }]);

})();