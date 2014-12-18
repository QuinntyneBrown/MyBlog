(function () {
    "use strict";

    var serviceId = "userRouteResolver";

    angular.module("user").service(serviceId, ["$q", "$route", "configurationService", "userService", service]);

    function service($q, $route, configurationService, userService) {
        var self = this;

        self.resolveRoute = function resolveRoute(params) {
            return configurationService.get().then(function () {
                if (params) {
                    switch (params.route) {
                        case "/admin/users":
                            return userService.getAll().then(function () {
                            });
                            break;

                        case "/admin/user/edit/:id":
                            return userService.getById({ id: $route.params.id }).then(function () {
                            });
                            break;
                    }
                }
            });
        };

        return self;
    }
    ;
})();
//# sourceMappingURL=userRouteResolver.js.map
