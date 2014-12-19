(function () {
    "use strict";
    var app = angular.module("user", ["configuration", "common", "core", "session"]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/signin", {
            templateUrl: "/app/user/views/signin.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        }).when("/admin/user/create", {
            templateUrl: "/app/user/views/edit.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        }).when("/admin/user/edit/:id", {
            templateUrl: "/app/user/views/edit.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute({ route: "/admin/user/edit/:id" });
            }],
            authorizationRequired: true
        }).when("/admin/users", {
            templateUrl: "/app/user/views/list.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute({ route: "/admin/users" });
            }],
            authorizationRequired: true,
            adminRoute: true
        }).when("/register", {
            templateUrl: "/app/user/views/register.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        });
    }]);
})();
//# sourceMappingURL=module.js.map