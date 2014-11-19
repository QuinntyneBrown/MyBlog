(function () {

    "use strict";

    var serviceId = "articleService";

    angular.module("blog").service(serviceId, ["$http", "$q", service]);

    function service($http, $q) {

        var self = this;

        var baseUri = "api/article/";

        self.getAllArticles = function getAllArticles() {

            return $http({ method: "GET", url: baseUri + "getAll" }).then(function (results) {

                return results;

            });
        };

        return self;
    };

})();