(function () {
    "use strict";

    var serviceId = "userRouteResolver";

    angular.module("user").service(serviceId, ["$q", "$route", "configurationService", service]);

    function service ($q, $route, configurationService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return configurationService.get().then(function () {

            });

        };

        return self;

    };

})();
