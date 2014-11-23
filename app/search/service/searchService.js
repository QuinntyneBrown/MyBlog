(function () {

    "use strict";

    var serviceId = "searchService";

    angular.module("search").service(serviceId, ["$http", service]);

    function service($http) {
        var self = this;

        self.simpleSearch = function simpleSearch(params) {

            return $http({ method: "GET", url: "api/search/simple", params: params }).then(function (results) {

                return results.data;

            });
        }

        return self;
    }

})();