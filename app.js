(function () {

    "use strict";

    var app = angular.module("app", [
        "ngRoute",
        "blog",
        "configuration",
        "core",
        "session"
    ]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/",
        {
            templateUrl: 'app/home/views/default.html'
        })
        .otherwise("/");

    }]);

})();








(function () {

    "use strict";

    var app = angular.module("blog", ["configuration","core","session","ngRoute"]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/article/:id", {
            templateUrl: "/app/blog/views/article.html"
        });

    }


    ]);

})();
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
(function () {

    "use strict";

    var app = angular.module("configuration", []);

})();
(function () {

    "use strict";

    var serviceId = "configurationService";

    angular.module("configuration").service(serviceId, [service]);

    function service() {

        var self = this;


        return self;

    };

})();
(function () {

    "use strict";

    var app = angular.module("core", []);

})();
(function () {
    "use strict";

    var componentId = "coreHeader";

    angular.module("core").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/core/components/coreHeader/coreHeader.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {


            }
        };
    }
})();
(function () {

    "use strict";

    var interceptorId = "authorizationInterceptor";

    angular.module("core").factory(interceptorId, ["$q", "$rootScope", "authorizationService", interceptor]);

    function interceptor($q, $rootScope, authorizationService) {

        var self = this;

        self.request = function (config) {

            if (authorizationService.hasHeader()) {

                config.headers["Authorization"] = authorizationService.getHeader();

            };

            return config;
        };

        return self;

    };

})();
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
(function () {
    "use strict";

    var factoryId = "storage";

    angular.module("core").factory(factoryId, [factory]);

    function factory() {

        var STORAGE_ID = 'myBlogStorage';

        return {
            get: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            getByName: function (params) {
                var items = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');

                for (var i = 0; i < items.length; i++) {
                    if (params.name === items[i].name) {
                        return items[i];
                    };
                };

                return null;
            },

            put: function (params) {

                var items = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');

                for (var i = 0; i < items.length; i++) {
                    if (params.name === items[i].name) {
                        items[i].value = params.value;
                        localStorage.setItem(STORAGE_ID, JSON.stringify(items));
                        return;
                    };
                };

                items.push(params);
                localStorage.setItem(STORAGE_ID, JSON.stringify(items));

            }
        };

    };

})();

(function () {
    
    "use strict";

    var serviceId = "homeService";
    
    angular.module("app").service(serviceId, ["blogService", service]);


    function service() {

        var self = this;

        self.getAllArticles = function getAllArticles() {

            return blogService.getAllArticles();

        };

        return self;
    }


})();
(function () {

    "use strict";

    var app = angular.module("session", ["core"]);

})();
