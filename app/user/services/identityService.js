(function () {

    "use strict";

    var serviceId = "identityService";

    angular.module("user").service(serviceId, ["$http","currentUser",service]);

    function service($http, currentUser) {

        var self = this;

        self.signIn = function signIn(params) {

            return $http({ method: "POST", url: "api/identity/signin", data: JSON.stringify(params.model) }).then(function (results) {

                return results.data.token;

            }).catch(function (error) {

            });
        };

        self.register = function register(params) {
            return $http({ method: "POST", url: "api/identity/register", data: JSON.stringify(params.model) }).then(function (results) {

                return results.data.token;

            }).catch(function (error) {

            });
        };

        self.getCurrentUser = function getCurrentUser() {

            return $http({ method: "GET", url: "api/user/getCurrentUser" }).then(function (results) {

                currentUser.set({ data: results.data });

                return currentUser.get();

            }).catch(function (error) {


            });
        };

        return self;

    }

})();