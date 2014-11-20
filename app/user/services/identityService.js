(function () {

    "use strict";

    var serviceId = "identityService";

    angular.module("user").service(serviceId, ["$http",service]);

    function service($http) {

        var self = this;

        self.signIn = function signIn(params) {

        };

        self.register = function register(params) {

        };

        return self;

    }

})();