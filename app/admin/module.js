(function () {
    "use strict";

    var app = angular.module("admin", ["blog", "configuration", "core", "session", "ngRoute", "ngSanitize"]);

    app.config([
        "$routeProvider", function ($routeProvider) {
            $routeProvider.when("/admin", {
                redirectTo: function () {
                    return "/admin/articles";
                }
            });
        }]);

    app.run([
        "$rootScope", "$location", function ($rootScope, $location) {
            $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {
                $rootScope.isAdmin = $location.path().substring(0, 6) == '/admin';
            });
        }]);
})();
//# sourceMappingURL=module.js.map
