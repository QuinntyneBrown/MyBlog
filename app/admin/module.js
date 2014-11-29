﻿(function () {

    "use strict";

    var app = angular.module("admin", ["blog", "configuration", "core", "session", "ngRoute", "ngSanitize"]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/admin", {
            templateUrl: "/app/admin/views/admin.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: true
        });
    }


    ]);


    app.run(["$rootScope", "$location", function ($rootScope, $location) {

        
        $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {

            $rootScope.isAdmin = $location.path().substring(0, 6) == '/admin';

        });

    }]);


})();