(function () {
    "use strict";

    var providerId = "authorizationService";

    angular.module("core").service(providerId, ["$rootScope", "$location", "storage", provider]);

    function provider($rootScope, $location, storage) {

        var self = {};

        self.token = null;

        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {

            if (newUrl.originalPath == "/login") {
                self.setToken({ token: null });
            }

            if (newUrl.$$route && newUrl.$$route.authorizationRequired) {

                var token = self.getToken();

                if (typeof token === "undefined" || token == null || token === "null" || token === "undefined") {

                    $rootScope.$evalAsync(function () {

                        $location.path('/login');

                    });

                }

            } else {


            };

        });

        self.getToken = function getToken() {

            var storageItem = storage.getByName({ name: "token" });

            if (storageItem != null) {

                return storageItem.value;

            };

            return null;
        };

        self.getHeader = function getHeader() {

            return "basic " + self.getToken();

        };

        self.hasHeader = function hasHeader() {

            return self.getToken() != null;

        };

        self.setToken = function setToken(params) {

            self.token = params.token;

            storage.put({ name: "token", value: self.token });

        };

        return self;
    };

})();