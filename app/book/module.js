(function () {

    "use strict";

    var app = angular.module("book", ["configuration", "core", "session", "ngRoute"]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/book/:slug", {
            templateUrl: "/app/book/views/default.html",
            resolve: ["bookRouteResolver", function (bookRouteResolver) {
                return bookRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        })
    }


    ]);

})();