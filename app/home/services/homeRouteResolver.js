(function () {
    "use strict";

    var serviceId = "homeRouteResolver";

    angular.module("app").service(serviceId, ["$q", "$route", "articleService", "articleStatuses", "configurationService", "identityService", service]);

    function service($q, $route, articleService, articleStatuses, configurationService, identityService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return $q.all([
                configurationService.get(),
                articleService.getAll({ status: articleStatuses().published }),
                identityService.getCurrentUser()
            ]).then(function (results) {

            });

        };

        return self;

    };

})();