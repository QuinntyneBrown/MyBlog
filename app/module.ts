(function () {

    "use strict";

    var app = angular.module("app", [
        "ngAnimate",
        "ngRoute",      
        "ui.tinymce",
        "infinite-scroll",
        "admin",
        "blog",
        "book",
        "common", 
        "configuration",
        "core",
        "search",
        "session",
        "trainingPlan",
        "user",
        "youTube"
    ]);

    app.config(["$httpProvider", "$locationProvider", "$routeProvider", "$rootScopeProvider", function ($httpProvider, $locationProvider, $routeProvider, $rootScopeProvider) {

        $rootScopeProvider.digestTtl(8);

        $httpProvider.interceptors.push("authorizationInterceptor");

        $httpProvider.useApplyAsync(true);

        $locationProvider.html5Mode(false);

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
        .when("/404",
        {
            templateUrl: 'app/home/views/404.html',
        })
        .otherwise("/404");

    }]);

    app.run(["$http", "$location", "$rootScope", "$route", "currentUser", "token", function ($http, $location, $rootScope, $route, currentUser, token) {

        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {

            $rootScope.inViewTransition = true;

            if (newUrl.originalPath == "/signin") {
                token.set({ data: null });
            };

            if (newUrl.$$route && newUrl.$$route.authorizationRequired) {
                if (token.get() == null) {
                    $rootScope.$evalAsync(function () {
                        $location.path("/signin");
                    });
                };
            };

        });

        $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {
            $rootScope.inViewTransition = false;
            if ($route.current.$$route.authorizationRequired && (currentUser.get() == null || currentUser.get() == "")) {
                $location.path("/signin");
            };
        });

    }]);

})();








