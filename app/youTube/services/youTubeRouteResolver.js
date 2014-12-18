(function () {
    "use strict";

    var serviceId = "youTubeRouteResolver";

    angular.module("youTube").service(serviceId, ["$location", "$q", "$route", "youTubeService", "configurationService", "identityService", service]);

    function service($location, $q, $route, youTubeService, configurationService, identityService) {
        var self = this;

        self.resolveRoute = function resolveRoute() {
            return configurationService.get().then(function () {
                return identityService.getCurrentUser().then(function () {
                });
            });
        };

        return self;
    }
    ;
})();
//# sourceMappingURL=youTubeRouteResolver.js.map
