(function () {
    "use strict";

    var serviceId = "homeRouteResolver";

    angular.module("core").service(serviceId, ["$q", "$route", "articleService", "configurationService", service]);

    function service($q, $route, articleService, configurationService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return $q.all([
                configurationService.get(),
                articleService.getAll()
            ]).then(function (results) {


            });

        };

        return self;

    };

})();