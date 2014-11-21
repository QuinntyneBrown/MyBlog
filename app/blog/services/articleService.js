(function () {
    "use strict";

    var dataServiceId = "articleService";

    angular.module("blog").service(dataServiceId, ["$http", "$q", "$rootScope", dataService]);

    function dataService($http, $q, $rootScope) {
        var self = {};
        
        var baseUri = "api/article/";

        self.cache = {
            getAll: null,
            getById: null
        };

        self.getAll = function getAll() {

            if (self.cache.getAll) {

                var deferred = $q.defer();

                deferred.resolve(self.cache.getAll);

                return deferred.promise;
            };

            return $http({ method: "GET", url: baseUri + "getAll" }).then(function (results) {

                self.cache.getAll = results.data;

                return results.data;

            }).catch(function (error) {

            });
        };

        self.getById = function getById(params) {

            if (self.cache.getById && self.cache.getById.id == params.id) {
                var deferred = $q.defer();

                deferred.resolve(self.cache.getById);

                return deferred.promise;
            };

            return $http({ method: "GET", url: baseUri + "getbyid?id=" + params.id }).then(function (results) {


                self.cache.getById = results.data;

                return results.data;

            }).catch(function (error) {

            });
        };

        self.remove = function remove(params) {

            return $http({ method: "GET", url: baseUri + "delete?id=" + params.id }).then(function (results) {

                return results;

            }).catch(function (error) {

            });
        };

        return self;
    }

})();




