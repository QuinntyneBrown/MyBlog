(function () {

    "use strict";

    var app = angular.module("app", [
        "ngRoute",
        "blog",
        "configuration",
        "core",
        "session",
        "user"
    ]);

    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/",
        {
            templateUrl: 'app/home/views/default.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        })
        .when("/about",
        {
            templateUrl: 'app/home/views/about.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        })
        .when("/settings",
        {
            templateUrl: 'app/home/views/settings.html',
            resolve: ["homeRouteResolver", function (homeRouteResolver) {
                return homeRouteResolver.resolveRoute();
            }]
        })
        .otherwise("/");

    }]);

    app.run(["$location", "$rootScope", "$route", "currentUser", "token", function ($location, $rootScope, $route, currentUser, token) {

        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {

            if (newUrl.originalPath == "/signin") {
                token.set({ data: null });
            }

            if (newUrl.$$route && newUrl.$$route.authorizationRequired) {

                if (token.get() == null) {

                    $rootScope.$evalAsync(function () {

                        $location.path('/signin');

                    });

                }

            };

        });

        $rootScope.$on("$viewContentLoaded", function routeChange(event, newUrl, oldUrl) {

            if ($route.current.$$route.authorizationRequired && currentUser.get() == null) {

                $location.path("/signin");

            }

        });

    }]);

})();








(function () {

    "use strict";

    var app = angular.module("blog", ["configuration","core","session","ngRoute"]);


    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/article/:id", {
            templateUrl: "/app/blog/views/article.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        })
        .when("/admin/article/edit/:id", {
            templateUrl: "/app/blog/views/edit.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        })
        .when("/admin/article", {
            templateUrl: "/app/blog/views/list.html",
            resolve: ["blogRouteResolver", function (blogRouteResolver) {
                return blogRouteResolver.resolveRoute();
            }],
            authorizationRequired: true,
            adminRoute: true
        });
    }


    ]);

})();
(function () {

    "use strict";

    var componentId = "articleBriefView";

    angular.module("blog").directive(componentId, ["$location",component]);

    function component($location) {
        return {
            templateUrl: "/app/blog/components/articleBriefView/articleBriefView.html",
            restrict: "EA",
            replace: true,
            scope: {
                model:"="
            },
            link: function (scope, elem, attr) {

                scope.goToFullView = function (model) {

                    $location.path("/article/" + model.id);

                }
            }
        };
    }

})();
(function () {

    "use strict";

    var componentId = "articleEditor";

    angular.module("blog").directive(componentId, ["$location", "$routeParams", "articleService", component]);

    function component($location, $routeParams, articleService) {
        return {
            templateUrl: "/app/blog/components/articleEditor/articleEditor.html",
            restrict: "EA",
            replace: true,
            scope: {

            },
            link: function (scope, elem, attr) {

                scope.model = {};

                articleService.getById({ id: $routeParams.id }).then(function (results) {

                    if (results) {
                        scope.model = results;
                    }

                });

            }
        };
    }

})();
(function () {

    "use strict";

    var componentId = "articleListView";

    angular.module("blog").directive(componentId, ["$location", "$route", "articleService", component]);

    function component($location, $route, articleService) {
        return {
            templateUrl: "/app/blog/components/articleListView/articleListView.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attr) {

                scope.remove = function (params) {

                    return articleService.remove({ id: params.id }).then(function () {

                        for (var i = 0; i < scope.models.length; i++) {

                            if (scope.models[i].id == params.id) {

                                scope.models.splice(i, 1);

                            }
                        }

                    }).catch(function (error) {

                    });
                };

                return articleService.getAll().then(function (results) {

                    scope.models = results;

                });
               
                
            }
        };
    }

})();
(function () {

    "use strict";

    var componentId = "articleView";

    angular.module("blog").directive(componentId, ["$route", "articleService", component]);

    function component($route, articleService) {
        return {
            templateUrl: "/app/blog/components/articleView/articleView.html",
            restrict: "EA",
            replace: true,
            scope: {
            },
            link: function (scope, elem, attr) {

                articleService.getById({ id: $route.current.params.id }).then(function (results) {

                    scope.model = results;

                })

            }
        };
    }

})();
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




(function () {
    "use strict";

    var serviceId = "blogRouteResolver";

    angular.module("blog").service(serviceId, ["$location", "$q", "$route", "articleService", "configurationService",  service]);

    function service($location, $q, $route, articleService, configurationService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return configurationService.get().then(function () {

                if ($route.current.params.id) {

                    return articleService.getById({ id: $route.current.params.id }).then(function () {

                    });

                }
                else {
                    return articleService.getAll().then(function () {

                    });
                }

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

    angular.module("configuration").service(serviceId, ["$http",service]);

    function service($http) {

        var self = this;

        var baseUri = "api/configuration/"

        self.get = function get() {

            return $http({ method: "GET", url: baseUri + "get" }).then(function (results) {


            }).catch(function (error) {

            });
        }

        return self;

    };

})();
(function () {

    "use strict";

    var app = angular.module("core", ["configuration","session"]);

})();
(function () {
    "use strict";

    var componentId = "coreAuthenticationHeader";

    angular.module("core").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/core/components/coreAuthenticationHeader/coreAuthenticationHeader.html",
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

    angular.module("core").factory(interceptorId, ["$q", "$rootScope", "token", interceptor]);

    function interceptor($q, $rootScope, token) {

        var self = this;

        self.request = function (config) {

            if (token.get()) {

                config.headers["Authorization"] = "basic " + token.get();
            }

            return config;
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

    var componentId = "homeListView";

    angular.module("app").directive(componentId, ["articleService", component]);

    function component(articleService) {

        return {
            templateUrl: "/app/home/components/homeListView/homeListView.html",
            replace: true,
            restrict: "EA",
            scope: {},
            link: function ( scope, elem, attr ) {

                articleService.getAll().then(function (results) {

                    scope.articles = results;

                });
            }
        }
    }

})();
(function () {
    "use strict";

    var serviceId = "homeRouteResolver";

    angular.module("core").service(serviceId, ["$q", "$route", "articleService", "configurationService", service]);

    function service($q, $route, articleService, configurationService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return $q.all([
                configurationService.get(),
                articleService.getAll()
            ]).then(function (results) {


            });

        };

        return self;

    };

})();
(function () {
    
    "use strict";

    var serviceId = "homeService";
    
    angular.module("app").service(serviceId, ["articleService", service]);

    function service(articleService) {

        var self = this;

        self.getAllArticles = function getAllArticles() {

            return articleService.getAll();

        };

        return self;
    }


})();
(function () {

    "use strict";

    var app = angular.module("session", ["configuration", "core"]);

})();
(function () {
    "use strict";

    var serviceId = "currentUser";

    angular.module("session").service(serviceId, ["$rootScope", "storage", service]);

    function service($rootScope, storage) {
        var self = this;
        var data = null;
        var name = "currentUser";

        self.get = function get() {
            if (data) {
                return data;
            };

            try {

                data = storage.getByName({ name: name }).value;

            } catch (error) {


            }

            return data;
        };

        self.set = function set(params) {
            data = params.data;
            storage.put({ name: name, value: params.data });
        };

        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {

            if (newUrl.originalPath == "/signin") {

                data = null;

                self.set({ data: null });
            }

        });

        return self;
    };

})();
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
(function () {
    "use strict";

    var serviceId = "token";

    angular.module("session").service(serviceId, ["$rootScope", "storage", service]);

    function service($rootScope, storage) {
        var self = this;
        var data = null;
        var name = "token";

        self.get = function get() {
            if (data) {
                return data;
            };

            try {

                data = storage.getByName({ name: name }).value;

            } catch (error) {


            }

            return data;
        };

        self.set = function set(params) {
            data = params.data;
            storage.put({ name: name, value: params.data });
        };

        $rootScope.$on("$routeChangeStart", function routeChange(event, newUrl, oldUrl) {

            if (newUrl.originalPath == "/signin") {

                data = null;

                self.set({ data: null });
            }

        });

        return self;
    };

})();
(function () {

    "use strict";

    var app = angular.module("user", ["configuration", "core", "session"]);

    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider

        .when("/signin", {
            templateUrl: "/app/user/views/signin.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        })
        .when("/register", {
            templateUrl: "/app/user/views/register.html",
            resolve: ["userRouteResolver", function (userRouteResolver) {
                return userRouteResolver.resolveRoute();
            }],
            authorizationRequired: false
        });

    }]);

})();
(function () {
    "use strict";

    var componentId = "registrationForm";

    angular.module("user").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/user/components/registrationForm/registrationForm.html",
            restrict: "EA",
            replace: true,
            scope: {},
            link: function (scope, elem, attrs) {

                scope.submit = function () {

                }
            }
        };
    }
})();
(function () {
    "use strict";

    var componentId = "signInForm";

    angular.module("user").directive(componentId, [component]);

    function component() {

        return {
            templateUrl: "/app/user/components/signInForm/signInForm.html",
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

    var serviceId = "identityService";

    angular.module("user").service(serviceId, ["$http",service]);

    function service($http) {

        var self = this;

        self.signIn = function signIn(params) {

        };

        self.register = function register(params) {

        };

        return self;

    }

})();
(function () {
    "use strict";

    var serviceId = "userRouteResolver";

    angular.module("user").service(serviceId, ["$q", "$route", "configurationService", service]);

    function service ($q, $route, configurationService) {

        var self = this;

        self.resolveRoute = function resolveRoute() {

            return configurationService.get().then(function () {

            });

        };

        return self;

    };

})();
