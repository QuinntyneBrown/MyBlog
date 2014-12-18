(function () {
    "use strict";

    var app = angular.module("blog", ["configuration", "core", "session", "ngRoute", "ngSanitize"]);

    app.config([
        "$routeProvider", function ($routeProvider) {
            $routeProvider.when("/article/:slug", {
                templateUrl: "/app/blog/views/article.html",
                resolve: [
                    "blogRouteResolver", function (blogRouteResolver) {
                        return blogRouteResolver.resolveRoute();
                    }],
                authorizationRequired: false
            }).when("/admin/article/create", {
                templateUrl: "/app/blog/views/edit.html",
                resolve: [
                    "blogRouteResolver", function (blogRouteResolver) {
                        return blogRouteResolver.resolveRoute();
                    }],
                authorizationRequired: true,
                adminRoute: true
            }).when("/admin/article/edit/:id", {
                templateUrl: "/app/blog/views/edit.html",
                resolve: [
                    "blogRouteResolver", function (blogRouteResolver) {
                        return blogRouteResolver.resolveRoute();
                    }],
                authorizationRequired: true,
                adminRoute: true
            }).when("/admin/articles", {
                templateUrl: "/app/blog/views/list.html",
                resolve: [
                    "blogRouteResolver", function (blogRouteResolver) {
                        return blogRouteResolver.resolveRoute();
                    }],
                authorizationRequired: true,
                adminRoute: true
            });
        }
    ]);
})();
//# sourceMappingURL=module.js.map
