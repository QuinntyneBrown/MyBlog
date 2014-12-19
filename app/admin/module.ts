declare var angular: ng.IAngularStatic;

module app {

    "use strict";

    export var admin: ng.IModule =
        angular.module("admin", ["blog", "configuration", "common", "core", "session", "ngRoute", "ngSanitize"]);

    admin.config(["$routeProvider", function ($routeProvider) {

        $routeProvider
            .when("/admin", {
                redirectTo: function () { return "/admin/articles"; }
            });
    }]);


    admin.run(["$rootScope", "$location", function ($rootScope, $location) {

        $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {
            $rootScope.isAdmin = $location.path().substring(0, 6) == '/admin';
        });

    }]);

}