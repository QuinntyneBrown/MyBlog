(function () {
    "use strict";

    var dataServiceId = "articleService";

    angular.module("blog").service(dataServiceId, ["$http", "$q", "$rootScope","articleStatuses", dataService]);

    function dataService($http, $q, $rootScope, articleStatuses) {
        var self = {};
        
        var baseUri = "api/article/";

        self.cache = {
            getAll: null,
            getById: null,
            getBySlug: null
        };

        $rootScope.$on("$locationChangeStart", function () {
            self.clearCache();
        });

        self.clearCache = function clearCache() {
            self.cache = {
                getAll: null,
                getById: null,
                getBySlug: null
            };
        };

        self.getAll = function getAll(params) {

            if (self.cache.getAll) {

                var deferred = $q.defer();

                deferred.resolve(self.cache.getAll);

                return deferred.promise;
            };

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
            };

            return $http({ method: "GET", url: baseUri + "getbyid?id=" + params.id }).then(function (results) {

                self.cache.getById = results.data;

                return results.data;

            }).catch(function (error) {

            });
        };

        self.getBySlug = function getBySlug(params) {

            if (self.cache.getBySlug && self.cache.getBySlug.slug == params.slug) {
                var deferred = $q.defer();

                deferred.resolve(self.cache.getBySlug);

                return deferred.promise;
            };

            return $http({ method: "GET", url: baseUri + "getbyslug?slug=" + params.slug }).then(function (results) {

                self.cache.getBySlug = results.data;

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

        self.publish = function publish(params) {

            params.model.pubDate = Date.now;

            params.model.status = articleStatuses().published;

            return self.update({ model: params.model });

        };

        self.approve = function approve(params) {

            params.model.status = articleStatuses().approved;

            return self.update({ model: params.model });

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




