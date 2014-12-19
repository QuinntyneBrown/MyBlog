(function () {
    "use strict";
    var dataServiceId = "userService";
    angular.module("user").service(dataServiceId, ["$http", "$q", "$rootScope", dataService]);
    function dataService($http, $q, $rootScope) {
        var self = this;
        var baseUri = "api/user/";
        self.cache = {
            getAll: null,
            getById: null
        };
        $rootScope.$on("$locationChangeStart", function () {
            self.clearCache();
        });
        self.clearCache = function clearCache() {
            self.cache = {
                getAll: null,
                getById: null
            };
        };
        self.getAll = function getAll(params) {
            if (self.cache.getAll) {
                var deferred = $q.defer();
                deferred.resolve(self.cache.getAll);
                return deferred.promise;
            }
            ;
            return $http({ method: "GET", url: baseUri + "getAll", params: params }).then(function (results) {
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
            }
            ;
            return $http({ method: "GET", url: baseUri + "getbyid?id=" + params.id }).then(function (results) {
                self.cache.getById = results.data;
                return results.data;
            }).catch(function (error) {
            });
        };
        self.remove = function remove(params) {
            return $http({ method: "DELETE", url: baseUri + "delete?id=" + params.id }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        self.add = function add(params) {
            return $http({ method: "POST", url: baseUri + "add", data: JSON.stringify(params.model) }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        self.update = function update(params) {
            return $http({ method: "PUT", url: baseUri + "update", data: JSON.stringify(params.model) }).then(function (results) {
                self.clearCache();
                return results;
            }).catch(function (error) {
            });
        };
        return self;
    }
})();
//# sourceMappingURL=userService.js.map