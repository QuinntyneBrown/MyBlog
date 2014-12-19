(function () {
    "use strict";
    var serviceId = "homeRouteResolver";
    angular.module("app").service(serviceId, ["$q", "$route", "articleService", "articleStatuses", "configurationService", "identityService", service]);
    function service($q, $route, articleService, articleStatuses, configurationService, identityService) {
        var self = this;
        self.resolveRoute = function resolveRoute() {
            return configurationService.get().then(function () {
                return $q.all([
                    articleService.getAll({ status: articleStatuses().published }),
                    identityService.getCurrentUser()
                ]).then(function (results) {
                    console.log("");
                });
            });
        };
        return self;
    }
    ;
})();
//# sourceMappingURL=homeRouteResolver.js.map