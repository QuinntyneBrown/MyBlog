(function () {

    "use strict";

    var interceptorId = "authorizationInterceptor";

    angular.module("core").factory(interceptorId, ["$q", "$rootScope", "authorizationService", interceptor]);

    function interceptor($q, $rootScope, authorizationService) {

        var self = this;

        self.request = function (config) {

            if (authorizationService.hasHeader()) {

                config.headers["Authorization"] = authorizationService.getHeader();

            };

            return config;
        };

        return self;

    };

})();