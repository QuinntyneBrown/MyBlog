(function () {
    "use strict";

    var serviceId = "homeRouteResolver";

    angular.module("app").service(serviceId, ["$q", "$route", "articleService", "configurationService", "identityService", service]);

    function service($q, $route, articleService, configurationService, identityService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return $q.all([
                configurationService.get(),
                articleService.getAll(),
                identityService.getCurrentUser()
            ]).then(function (results) {


            });

        };

        return self;

    };

})();