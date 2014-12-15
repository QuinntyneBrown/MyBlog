(function () {

    "use strict";

    var serviceId = "configurationService";

    angular.module("configuration").service(serviceId, ["$http","$rootScope",service]);

    function service($http, $rootScope) {

        var self = this;

        var baseUri = "api/configuration/"

        self.get = function get() {

            return $http({ method: "GET", url: baseUri + "get" }).then(function (results) {

                $rootScope.configuration = results.data;

            }).catch(function (error) {

            });
        }

        return self;

    };

})();