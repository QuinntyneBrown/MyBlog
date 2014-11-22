(function () {

    "use strict";

    var serviceId = "identityService";

    angular.module("identity").service(serviceId, ["$http", service]);

    function service($http) {

        var self = this;

        var baseUri = "api/identity";

        self.signIn = function signIn(params) {

            $http({ method: "POST", url: baseUri + "/signin", data: JSON.stringify(params) }).then(function (results) {

                return results;

            }).catch(function () {


            });
        };

        self.register = function register(params) {

            $http({ method: "POST", url: baseUri + "/register", data: JSON.stringify(params) }).then(function (results) {

                return results;

            }).catch(function () {


            });
        };

        return self;
    };

})();