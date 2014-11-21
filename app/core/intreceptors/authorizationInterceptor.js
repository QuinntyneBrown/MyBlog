(function () {

    "use strict";

    var interceptorId = "authorizationInterceptor";

    angular.module("core").factory(interceptorId, ["$q", "$rootScope", "token", interceptor]);

    function interceptor($q, $rootScope, token) {

        var self = this;

        self.request = function (config) {

            if (token.get()) {

                config.headers["Authorization"] = "basic " + token.get();
            }

            return config;
        };

        return self;

    };

})();