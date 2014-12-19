var app;
(function (app) {
    "use strict";
    app.admin = angular.module("admin", ["blog", "configuration", "common", "core", "session", "ngRoute", "ngSanitize"]);
    app.admin.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/admin", {
            redirectTo: function () {
                return "/admin/articles";
            }
        });
    }]);
    app.admin.run(["$rootScope", "$location", function ($rootScope, $location) {
        $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {
            $rootScope.isAdmin = $location.path().substring(0, 6) == '/admin';
        });
    }]);
})(app || (app = {}));
//# sourceMappingURL=module.js.map