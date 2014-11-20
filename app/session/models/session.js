(function () {
    
    "use strict";

    var serviceId = "session";

    angular.module("session").service(serviceId, [service]);

    function service() {

        var self = this;

        self.isLoggedIn = function isLoggedIn() {

            return true;

        };

        return self;

    };

})();