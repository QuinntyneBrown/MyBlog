(function () {

    "use strict";

    var app = angular.module("blog", ["configuration","core","session","ngRoute"]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/article/:id", {
            templateUrl: "/app/blog/views/article.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        })
        .when("/admin/article/edit/:id", {
            templateUrl: "/app/blog/views/edit.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        })
        .when("/admin/article", {
            templateUrl: "/app/blog/views/list.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        });
    }


    ]);

})();