(function () {
    "use strict";

    var serviceId = "trainingPlanRouteResolver";

    angular.module("trainingPlan").service(serviceId, ["$location", "$q", "$route", "trainingPlanService", "configurationService", "identityService", service]);

    function service($location, $q, $route, trainingPlanService, configurationService, identityService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return configurationService.get().then(function () {

                return identityService.getCurrentUser().then(function () {

                    if ($route.current.params.id) {

                        return trainingPlanService.getById({ id: $route.current.params.id }).then(function () {

                        });

                    }
                    else if ($route.current.params.slug) {

                        return trainingPlanService.getBySlug({ slug: $route.current.params.slug }).then(function () {

                        });
                    }
                    else {
                        return trainingPlanService.getAll().then(function () {

                        });
                    }

                });


            });

        };

        return self;

    };

})();
