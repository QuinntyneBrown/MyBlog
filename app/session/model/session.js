(function () {
    
    "use strict";

    var serviceId = "session";

    angular.module("session").service(serviceId, ["$location", "$http","currentUser",service]);

    function service($location, $http, currentUser) {

        var self = this;

        self.isLoggedIn = function isLoggedIn() {

            return self.getCurrentUser() != null && self.getCurrentUser() != "";

        };

        self.isUserInRole = function isUserInRole(roleName) {
            if (self.isLoggedIn()) {

                var user = self.getCurrentUser();

                for (var i = 0; i < user.roles.length; i++) {
                    if (roleName == user.roles[i].name) {
                        return true;
                    }
                };
            }

            return false;
        };

        self.getCurrentUser = function getCurrentUser() {
            return currentUser.get();
        }

        self.signOut = function () {

            $http({ method: "GET", url: "api/identity/signout" }).then(function () {

            });

            $location.path("/signin");
        }

        return self;

    };

})();