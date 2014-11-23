(function () {

    "use strict";

    var app = angular.module("app", [
        "ngRoute",
        "blog",
        "configuration",
        "core",
        "identity",
        "search",
        "session",
        "user"
    ]);

    app.config(["$httpProvider","$routeProvider", function ($httpProvider, $routeProvider) {

        $httpProvider.interceptors.push("authorizationInterceptor");

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

    app.run(["$location", "$rootScope", "$route", "currentUser", "token", function ($location, $rootScope, $route, currentUser, token) {

        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {

            if (newUrl.originalPath == "/signin") {
                token.set({ data: null });
            }

            if (newUrl.$$route && newUrl.$$route.authorizationRequired) {

                if (token.get() == null) {

                    $rootScope.$evalAsync(function () {

                        $location.path("/signin");

                    });

                }

            };

        });

        $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {

            if ($route.current.$$route.authorizationRequired && (currentUser.get() == null || currentUser.get() == "")) {

                $location.path("/signin");

            };

        });

    }]);

})();








