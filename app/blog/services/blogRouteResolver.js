(function () {
    "use strict";

    var serviceId = "blogRouteResolver";

    angular.module("blog").service(serviceId, ["$location", "$q", "$route", "articleService", "configurationService", "identityService",  service]);

    function service($location, $q, $route, articleService, configurationService, identityService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return configurationService.get().then(function () {

                return identityService.getCurrentUser().then(function () {

                    if ($route.current.params.id) {

                        return articleService.getById({ id: $route.current.params.id }).then(function () {

                        });

                    }
                    else {
                        return articleService.getAll().then(function () {

                        });
                    }

                });


            });

        };

        return self;

    };

})();
